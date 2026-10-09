const units = [
  ["Beginner", "Setup and first programs", "Run code in the interactive prompt and from a file. Learn what the interpreter, editor, and terminal each do.", "You can run a saved Python script and use an error message to find what to inspect."],
  ["Beginner", "Values and expressions", "Give information a name, work with numbers and text, and turn a formula into a useful program.", "Write a small converter and explain the type of each input and result."],
  ["Beginner", "Decisions and repetition", "Use conditions to choose what happens next, then repeat work with for and while loops.", "Build a guessing game that responds to a player's choices."],
  ["Beginner", "Collections", "Keep related values in lists, tuples, sets, and dictionaries. Pick the structure that fits the job.", "Count words in a passage and report the most common ones."],
  ["Beginner", "Functions", "Break a problem into named pieces with parameters, return values, and clear responsibilities.", "Turn a long script into small functions you can test independently."],
  ["Beginner", "Text, files, and errors", "Read and write text, JSON, and CSV. Handle exceptions and close resources safely.", "Make a program that imports and exports an address book."],
  ["Beginner", "Modules and your workflow", "Organize files into modules. Use a virtual environment, Git, a debugger, and your first automated tests.", "Ship a small command-line quiz with repeatable setup instructions."],
  ["Intermediate", "Object-oriented Python", "Model related state and behavior with classes, dataclasses, composition, and protocols.", "Represent a small real-world domain and explain your abstractions."],
  ["Intermediate", "Python's data model", "Understand identity, mutability, iteration, generators, context managers, and special methods.", "Stream a large text file without holding the whole file in memory."],
  ["Intermediate", "Algorithms and complexity", "Use Big-O, invariants, recursion, searching, sorting, and profiling to reason about programs.", "Compare two solutions with both complexity analysis and measurements."],
  ["Intermediate", "Core data structures", "Understand stacks, queues, maps, trees, heaps, and graphs and their tradeoffs.", "Implement and test selected data structures from scratch."],
  ["Intermediate", "Testing and design", "Build confidence with unit and integration tests, type hints, refactoring, and deliberate APIs.", "Create a small package with a useful test suite and clean public interface."],
  ["Intermediate", "Databases and persistence", "Model relational data, write SQL, and understand transactions, indexes, and migrations.", "Build a persistent contact manager with safe queries."],
  ["Intermediate", "Networking and web programming", "Work with HTTP, REST APIs, validation, serialization, and service boundaries.", "Create a small API and a client that consumes it."],
  ["Intermediate", "Concurrency and async", "Choose between processes, threads, and asyncio. Avoid races and handle cancellation.", "Speed up an I/O-heavy task and explain why your concurrency model fits."],
  ["Advanced", "Advanced algorithms", "Use graph search, dynamic programming, greedy methods, backtracking, and amortized analysis.", "Solve a problem with two different strategies and compare them."],
  ["Advanced", "Memory and runtime", "Reason about references, garbage collection, closures, descriptors, decorators, and profiling.", "Find and explain a memory or performance bottleneck."],
  ["Advanced", "Operating systems and filesystems", "Work with processes, signals, permissions, subprocesses, and pipes.", "Build a resilient cross-platform automation tool."],
  ["Advanced", "Networks and distributed systems", "Understand DNS, TCP/TLS, timeouts, retries, idempotency, caching, and partial failure.", "Make a client that recovers safely from unreliable services."],
  ["Advanced", "Security", "Use threat models to defend against injection, mishandled secrets, and unsafe dependencies.", "Review a flawed app and fix its highest-risk issues."],
  ["Advanced", "Architecture and design", "Use cohesion, coupling, boundaries, design patterns, and architecture decisions thoughtfully.", "Write an architecture note explaining the important tradeoffs in your design."],
  ["Advanced", "Packaging and deployment", "Package Python projects and prepare them for configuration, logging, CI, and release.", "Deliver an installable application with clear setup instructions."],
  ["Advanced", "Data and scientific Python", "Explore numerical precision, arrays, tables, plotting, and reproducible analysis.", "Publish a small data analysis that another person can reproduce."],
  ["Advanced", "Capstone", "Combine software design, algorithms, testing, security, and delivery in one substantial project.", "Present a working capstone and explain its design, limits, and next steps."]
];

const unitList = document.querySelector("#unit-list");
const lesson = document.querySelector("#lesson-panel");
let selected = 0;
let filter = "all";
let done = new Set(JSON.parse(localStorage.getItem("python-course-done") || "[]"));

function updateProgress() {
  document.querySelector("#progress-label").textContent = `${done.size} / ${units.length} done`;
}

function renderList() {
  unitList.replaceChildren();
  let stage = "";
  units.forEach(([level, title], index) => {
    if (filter !== "all" && level !== filter) return;
    if (stage !== level) {
      stage = level;
      const label = document.createElement("div");
      label.className = "stage-label";
      label.textContent = level.toUpperCase();
      unitList.append(label);
    }
    const row = document.createElement("button");
    row.className = `unit-row${index === selected ? " selected" : ""}`;
    row.type = "button";
    row.setAttribute("aria-current", index === selected ? "true" : "false");
    row.innerHTML = `<span class="unit-num">${String(index + 1).padStart(2, "0")}</span><span class="unit-title">${title}</span><span class="${done.has(index) ? "unit-done" : "unit-level"}">${done.has(index) ? "✓" : "›"}</span>`;
    row.addEventListener("click", () => selectUnit(index, innerWidth < 650));
    unitList.append(row);
  });
}

function renderLesson() {
  const [level, title, intro, checkpoint] = units[selected];
  const first = selected === 0;
  lesson.innerHTML = `
    <div class="lesson-topline"><span class="lesson-breadcrumb">THE COURSE <span>/</span> UNIT ${String(selected + 1).padStart(2, "0")}</span><span class="level-badge">${level.toUpperCase()}</span></div>
    <h2>${title}</h2>
    <p class="lesson-intro">${intro}</p>
    <div class="lesson-callout"><strong>${first ? "Welcome — you belong here." : "Your next step."}</strong> ${first ? "No experience needed. Follow the ideas, try the examples, and let curiosity do the rest." : "Go at your own pace. The concepts build on each other, so take time to practice before moving on."}</div>
    ${first ? `
      <h3>Meet Python</h3>
      <p>Python reads your instructions and executes them. Try one idea at a time in the interactive prompt, or save a sequence of instructions in a <code>.py</code> file and run it whenever you like.</p>
      <div class="code-example"><button class="copy-code" type="button">Copy</button><code>print("Hello, Python!")
print("I can run a program.")</code></div>
      <p>Save this as <code>hello.py</code>. In your terminal, run <code>python hello.py</code>. Some computers use <code>python3</code> or <code>py</code> instead.</p>
      <h3>Errors are part of learning</h3>
      <p>A syntax error means Python could not read your instructions. A runtime exception means the program started but hit a problem. A logic error means it ran but gave the wrong answer. Each kind gives you a different clue.</p>
      <div class="code-example"><button class="copy-code" type="button">Copy</button><code>print(10 / 0)</code></div>
      <p>This raises <code>ZeroDivisionError</code>. Read the last line of the traceback first: it tells you the kind of problem.</p>
      <h3>Try it yourself</h3>
      <ul><li>Print your name and something you want to build.</li><li>Open the Python prompt and try <code>2 + 3</code>.</li><li>Make one syntax error and one runtime exception. What changed?</li><li>Explain what the editor, terminal, interpreter, and script each do.</li></ul>
    ` : `
      <h3>What you'll explore</h3>
      <p>${intro} Learn the central ideas, then use them in a compact build that makes the concepts practical.</p>
      <div class="code-example"><code># Learning by building
# Read the guide, try the exercises,
# then explain your choices.</code></div>
      <h3>Build checkpoint</h3>
      <p>Apply this unit's concepts to a small program. Include normal cases, edge cases, and a short explanation of your design choices.</p>
      <h3>Practice habit</h3>
      <ul><li>Write down what you expect your code to do before you run it.</li><li>Change one thing at a time and observe the result.</li><li>Explain the result in your own words before moving on.</li></ul>
    `}
    <div class="checkpoint"><div><strong>Ready to move on?</strong>${checkpoint}</div><button class="complete-button ${done.has(selected) ? "done" : ""}" id="complete-button" type="button">${done.has(selected) ? "✓ Completed" : "Mark complete"}</button></div>
    <div class="lesson-nav"><button id="previous-button" type="button" ${selected === 0 ? "disabled" : ""}>← Previous unit</button><button id="next-button" type="button" ${selected === units.length - 1 ? "disabled" : ""}>Next unit →</button></div>`;

  lesson.querySelectorAll(".copy-code").forEach(button => button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.nextElementSibling.textContent);
      button.textContent = "Copied!";
      setTimeout(() => { button.textContent = "Copy"; }, 1200);
    } catch {
      button.textContent = "Select code";
    }
  }));
  document.querySelector("#complete-button").addEventListener("click", () => {
    done.has(selected) ? done.delete(selected) : done.add(selected);
    localStorage.setItem("python-course-done", JSON.stringify([...done]));
    updateProgress();
    renderList();
    renderLesson();
  });
  document.querySelector("#previous-button").addEventListener("click", () => selectUnit(selected - 1, true));
  document.querySelector("#next-button").addEventListener("click", () => selectUnit(selected + 1, true));
}

function selectUnit(index, scroll = false) {
  if (index < 0 || index >= units.length) return;
  selected = index;
  renderList();
  renderLesson();
  if (scroll) lesson.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".stage-tab").forEach(tab => tab.addEventListener("click", () => {
  filter = tab.dataset.filter;
  document.querySelectorAll(".stage-tab").forEach(item => {
    item.classList.toggle("selected", item === tab);
    item.setAttribute("aria-selected", item === tab ? "true" : "false");
  });
  renderList();
}));
document.querySelector("#start-button").addEventListener("click", () => {
  document.querySelector("#roadmap").scrollIntoView({ behavior: "smooth" });
  selectUnit(0);
});
document.querySelector("#progress-pill").addEventListener("click", () => document.querySelector("#roadmap").scrollIntoView({ behavior: "smooth" }));
renderList();
renderLesson();
updateProgress();

const codeEditor = document.querySelector("#code-editor");
if (codeEditor) {
  const output = document.querySelector("#playground-output");
  const runButton = document.querySelector("#run-code");
  const stopButton = document.querySelector("#stop-code");
  const resetButton = document.querySelector("#reset-code");
  const clearButton = document.querySelector("#clear-output");
  const runtimeBadge = document.querySelector(".runtime-badge");
  const runtimeStatus = document.querySelector("#runtime-status");
  const starterCode = codeEditor.value;
  let pythonWorker = null;
  let activeRunId = null;
  let runSequence = 0;

  function setRuntimeStatus(message, state = "") {
    runtimeStatus.textContent = message;
    runtimeBadge.className = `runtime-badge${state ? ` ${state}` : ""}`;
  }

  function appendOutput(text, isError = false) {
    if (output.textContent === "Your program's output will appear here.") output.textContent = "";
    output.textContent += text;
    output.classList.toggle("has-error", isError || output.classList.contains("has-error"));
    if (output.textContent.length > 12000) output.textContent = `… output shortened …\n${output.textContent.slice(-11500)}`;
    output.scrollTop = output.scrollHeight;
  }

  function finishRun() {
    activeRunId = null;
    runButton.disabled = false;
    stopButton.disabled = true;
    runButton.innerHTML = '<span aria-hidden="true">▶</span> Run code';
  }

  function startWorker() {
    if (pythonWorker) return pythonWorker;
    if (!("Worker" in window)) throw new Error("This browser does not support Python workers.");
    pythonWorker = new Worker("python-worker.js", { type: "module" });
    pythonWorker.addEventListener("message", ({ data }) => {
      if (data.type === "ready") {
        setRuntimeStatus(activeRunId === null ? "Python ready" : "Running code…", activeRunId === null ? "" : "running");
        return;
      }
      if (data.type === "fatal") {
        appendOutput(`Could not start Python: ${data.text}\n`, true);
        setRuntimeStatus("Could not load Python", "error");
        pythonWorker?.terminate();
        pythonWorker = null;
        finishRun();
        return;
      }
      if (data.id !== activeRunId) return;
      if (data.type === "output") appendOutput(data.text, data.stream === "stderr");
      if (data.type === "result") appendOutput(`${data.text}\n`);
      if (data.type === "error") {
        appendOutput(`${data.text}\n`, true);
        setRuntimeStatus("Run finished with an error", "error");
        finishRun();
      }
      if (data.type === "done") {
        if (output.textContent === "") output.textContent = "Program finished without printing anything.";
        setRuntimeStatus("Python ready");
        finishRun();
      }
    });
    pythonWorker.addEventListener("error", event => {
      event.preventDefault();
      appendOutput(`Could not start Python: ${event.message || "the worker failed to load."}\n`, true);
      setRuntimeStatus("Could not load Python", "error");
      pythonWorker?.terminate();
      pythonWorker = null;
      finishRun();
    });
    return pythonWorker;
  }

  runButton.addEventListener("click", () => {
    if (activeRunId !== null) return;
    const code = codeEditor.value;
    const id = ++runSequence;
    activeRunId = id;
    output.textContent = "";
    output.classList.remove("has-error");
    runButton.disabled = true;
    stopButton.disabled = false;
    runButton.textContent = "Running…";
    setRuntimeStatus(pythonWorker ? "Running code…" : "Starting Python…", "loading");
    try {
      startWorker().postMessage({ id, code });
    } catch (error) {
      appendOutput(`${error.message}\n`, true);
      setRuntimeStatus("Could not load Python", "error");
      finishRun();
    }
  });

  stopButton.addEventListener("click", () => {
    if (activeRunId === null) return;
    pythonWorker?.terminate();
    pythonWorker = null;
    activeRunId = null;
    appendOutput("\nExecution stopped. The Python worker was reset.\n");
    setRuntimeStatus("Stopped");
    finishRun();
  });

  resetButton.addEventListener("click", () => {
    codeEditor.value = starterCode;
    codeEditor.focus();
  });

  clearButton.addEventListener("click", () => {
    output.textContent = "";
    output.classList.remove("has-error");
  });

  codeEditor.addEventListener("keydown", event => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      runButton.click();
    }
  });
}

