import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

let pyodidePromise;

async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = loadPyodide();
    pyodidePromise.then(
      () => self.postMessage({ type: "ready" }),
      error => self.postMessage({ type: "fatal", text: error?.message || String(error) })
    );
  }
  return pyodidePromise;
}

self.onmessage = async ({ data }) => {
  const { id, code } = data;

  try {
    const pyodide = await getPyodide();
    pyodide.setStdout({ batched: text => self.postMessage({ type: "output", id, stream: "stdout", text }) });
    pyodide.setStderr({ batched: text => self.postMessage({ type: "output", id, stream: "stderr", text }) });
    await pyodide.loadPackagesFromImports(code);
    const result = await pyodide.runPythonAsync(code, { filename: "playground.py" });

    if (result !== undefined && result !== null) {
      self.postMessage({ type: "result", id, text: result.toString() });
      result.destroy?.();
    }
    self.postMessage({ type: "done", id });
  } catch (error) {
    self.postMessage({ type: "error", id, text: error?.message || String(error) });
  }
};

