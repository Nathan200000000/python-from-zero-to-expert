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

const lessonDetails = [["Setup and first programs","Python runs source code through an interpreter. A script is a saved sequence of instructions; the terminal starts it, while the editor helps you write it. Learn the edit–run–read–change loop and use tracebacks as clues.","print(\"Hello, world!\")\nprint(2 + 3)","What does the interpreter do?","Executes Python instructions","Styles the code editor","Stores files permanently","Executes Python instructions","Python reads and executes your source. The editor and terminal help you work with it, but do not execute Python themselves.","Create a script that prints your name, a goal, and the result of 12 * 12."],["Values and expressions","A value has a type: int for whole numbers, float for decimals, str for text, bool for truth, and None for absence. Variables are names bound to values. Operators form expressions; input() returns text, so convert it before arithmetic.","price = float(\"19.99\")\ntax = 0.08\ntotal = price * (1 + tax)\nprint(f\"Total: ${total:.2f}\")","What type does input() return?","str","int","float","str","input() returns text even when the person types digits. Convert it explicitly with int() or float() before calculations.","Build a Celsius-to-Fahrenheit converter. Convert input to float and format the result to one decimal place."],["Decisions and repetition","if/elif/else choose a path using a condition. Comparisons produce booleans; and, or, and not combine them. for visits each item in an iterable; while repeats while a condition remains true. Change loop state so while loops can finish.","score = 82\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelse:\n    grade = \"Keep practicing\"\nprint(grade)","Which loop is a natural fit for visiting every item in a list?","for","while only","Neither","for","for iterates over items directly. Use while when repetition depends on a condition that changes during execution.","Make a guessing game that gives higher/lower hints, counts attempts, and stops when the answer is found."],["Collections","Lists keep ordered, changeable items; tuples are ordered and usually fixed; sets hold unique values; dictionaries map keys to values. Indexing starts at zero. Slices select ranges. Choose structures based on required operations, and remember that assignment can share a mutable object.","scores = [8, 10, 8, 7]\ncounts = {}\nfor score in scores:\n    counts[score] = counts.get(score, 0) + 1\nprint(counts)","What does a set do with duplicate values?","Keeps one copy","Keeps every copy","Sorts them automatically","Keeps one copy","A set stores unique hashable values and is useful for membership checks and removing duplicates.","Count word frequencies in a paragraph using a dictionary. Normalize case and punctuation; report the three most common words."],["Functions","Functions package behavior behind a name. Parameters receive arguments, return sends a result back, and local variables stay inside the function. Prefer explicit inputs and outputs. Default arguments are evaluated once, so avoid mutable defaults such as [].","def clamp(value, low=0, high=100):\n    return max(low, min(value, high))\n\nprint(clamp(135))","What does return do?","Sends a result to the caller","Prints the result","Repeats the function","Sends a result to the caller","return gives a value back. print displays a value; a function can return without printing anything.","Refactor a unit converter into small functions for input validation, conversion, and display. Test the conversion function with several values."],["Text, files, and errors","Strings are immutable sequences of Unicode text. pathlib provides path-aware file handling; json and csv read common data formats. Use with to close files reliably. Catch a specific exception at a boundary where you can respond usefully; do not hide errors with a bare except.","from pathlib import Path\nimport json\n\nprofile = {\"name\": \"Ada\", \"level\": 1}\nPath(\"profile.json\").write_text(json.dumps(profile), encoding=\"utf-8\")\nloaded = json.loads(Path(\"profile.json\").read_text(encoding=\"utf-8\"))\nprint(loaded[\"name\"])","Why use a with block when opening a file?","It closes the file reliably","It encrypts the file","It makes the file read-only","It closes the file reliably","The context manager releases the file even if an exception occurs inside the block.","Create a contact book that reads and writes JSON, validates required fields, and reports malformed files clearly."],["Modules and your workflow","A module is a Python file; a package groups modules. Keep reusable logic separate from the command-line entry point. Use a virtual environment to isolate dependencies, Git to record changes, a formatter/linter to catch issues, and pytest for automated checks.","# math_tools.py\ndef area_of_circle(radius):\n    return 3.14159 * radius ** 2\n\n# app.py\nfrom math_tools import area_of_circle\nprint(area_of_circle(2))","What is a virtual environment for?","Isolating project dependencies","Making Python code faster","Backing up Git history","Isolating project dependencies","A virtual environment keeps one project's installed packages separate from other projects and the system Python.","Package your quiz as a small CLI with separate modules, a README, a virtual environment, and tests for scoring."],["Object-oriented Python","Objects combine identity, state, and behavior. Classes define a kind of object; instances hold their own state. Prefer composition when one object uses another. Dataclasses remove repetitive initialization for data-focused objects. Inheritance is useful for real substitutability, not just code reuse.","from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int\n\nbook = Book(\"Python Basics\", 240)\nprint(book.title)","What does a dataclass generate by default?","Useful methods such as __init__ and __repr__","A database table","A web server","Useful methods such as __init__ and __repr__","@dataclass generates common data-container methods from annotated fields.","Model a library checkout with Book and Library objects. Define invariants and test unavailable-book behavior."],["Python's data model","Python syntax often delegates to protocols: iteration uses __iter__/__next__, length uses __len__, and context management uses __enter__/__exit__. Generators yield values lazily. Equality is about value; identity is about whether two names reference the same object. Mutable objects should not be hash keys.","def squares(limit):\n    for number in range(limit):\n        yield number ** 2\n\nprint(list(squares(5)))","Why use a generator for a large sequence?","It produces values lazily","It stores every value twice","It sorts automatically","It produces values lazily","yield creates an iterator that can produce values as needed, reducing memory use for streams.","Write an iterator or generator that reads a large log line by line and yields only error records."],["Algorithms and complexity","Big-O describes how resource use grows as input grows, not exact runtime. A loop over n items is often O(n); nested loops may be O(n²). State assumptions, analyze worst cases, and measure real programs with timeit or profiling. Correctness comes before optimization.","def contains_duplicate(values):\n    seen = set()\n    for value in values:\n        if value in seen:\n            return True\n        seen.add(value)\n    return False\n\nprint(contains_duplicate([1, 2, 1]))","Expected lookup time in a Python set is usually:","O(1)","O(n log n)","O(n²)","O(1)","Hash-based membership is average-case constant time, though pathological collisions can worsen it.","Compare duplicate detection using nested loops and a set. Explain time and space costs, then benchmark multiple input sizes."],["Core data structures","Stacks are last-in-first-out; queues are first-in-first-out. Use collections.deque for efficient ends, dict for key lookup, heapq for priority queues, and adjacency lists for graphs. Trees and linked lists teach tradeoffs even when built-ins are the better production choice.","from collections import deque\n\nqueue = deque([\"job A\", \"job B\"])\nqueue.append(\"job C\")\nprint(queue.popleft())","Which built-in module provides an efficient double-ended queue?","collections.deque","heapq.stack","list.queue","collections.deque","deque supports efficient append and pop operations at both ends, making it useful for queues and breadth-first search.","Implement a breadth-first traversal over an adjacency-list graph. Test empty, disconnected, and cyclic graphs."],["Testing and design","Tests make expected behavior executable. Unit tests isolate small functions; integration tests exercise boundaries between components. Test normal, boundary, and invalid inputs. Type hints document intent and enable static checking but do not validate values at runtime. Refactor in small steps while tests stay green.","def is_even(number: int) -> bool:\n    return number % 2 == 0\n\n# pytest test\n# assert is_even(4) is True\n# assert is_even(3) is False","What is a useful test case beyond the typical input?","A boundary or invalid input","Only a second typical input","No input at all, always","A boundary or invalid input","Edge cases reveal assumptions: empty collections, limits, missing fields, and invalid types often expose bugs.","Create a tested package with clear public functions, type hints, and tests for expected, boundary, and invalid behavior."],["Databases and persistence","Relational databases store related records in tables. Primary keys identify rows; foreign keys express relationships. SQL selects and changes data. Always parameterize values to prevent injection. Transactions group changes atomically; indexes speed reads but add storage and write costs. Migrations evolve schemas safely.","import sqlite3\n\nwith sqlite3.connect(\":memory:\") as db:\n    db.execute(\"CREATE TABLE person (name TEXT)\")\n    db.execute(\"INSERT INTO person VALUES (?)\", (\"Ada\",))\n    print(db.execute(\"SELECT name FROM person\").fetchone())","Why use a ? placeholder in a SQL query?","To bind data safely","To make SQL run asynchronously","To create an index","To bind data safely","Parameterized queries keep values separate from SQL syntax and prevent input from changing the query structure.","Build a contact database with create/read/update/delete operations, a schema migration, and tests for transaction rollback."],["Networking and web programming","HTTP is a request/response protocol. Methods communicate intent; status codes report outcomes. JSON is a common serialization format. Validate untrusted input at the boundary, use timeouts for network calls, and design APIs around resources and clear error responses. A client and server can fail independently.","from urllib.request import urlopen\n\n# Network access is required for this example.\n# response = urlopen(\"https://example.com\", timeout=5)\n# print(response.status)","Why should an HTTP client set a timeout?","To avoid waiting forever","To encrypt the request","To guarantee a successful response","To avoid waiting forever","A timeout bounds how long a program waits for an unavailable or slow peer; it cannot guarantee success.","Design a small REST API and client. Document routes, validation, status codes, timeouts, and error handling."],["Concurrency and async","Concurrency overlaps work; parallelism runs work at the same time. Threads and asyncio suit many I/O waits; processes can use multiple CPU cores for CPU-bound work. Shared mutable state creates races. Use locks, queues, structured cancellation, and bounded work to keep systems predictable.","import asyncio\n\nasync def fetch_label():\n    await asyncio.sleep(0.1)\n    return \"done\"\n\nprint(asyncio.run(fetch_label()))","Which approach is often a good fit for many network waits?","asyncio","A busy infinite loop","One process per byte","asyncio","Asyncio can coordinate many I/O waits in one event loop without blocking a thread for each wait.","Build an async URL checker with concurrency limits, timeouts, cancellation, and a comparison to a sequential version."],["Advanced algorithms","Choose algorithms from problem structure. Graph traversal explores relationships; dynamic programming reuses overlapping subproblem results; greedy methods make locally optimal choices when a proof supports them; backtracking explores choices and prunes impossible paths. Prove correctness and analyze time/space costs.","def fibonacci(n):\n    values = [0, 1]\n    for _ in range(2, n + 1):\n        values.append(values[-1] + values[-2])\n    return values[n] if n else 0\n\nprint(fibonacci(10))","Dynamic programming is especially useful when subproblems:","Overlap and have reusable results","Never repeat","Require sorting only","Overlap and have reusable results","Memoization or tabulation avoids solving the same subproblem repeatedly.","Solve a coin-change or pathfinding problem using a simple approach and dynamic programming. Compare complexity and prove key invariants."],["Memory and runtime","Names refer to objects; assignment usually binds another name rather than copying data. Reference counts and cyclic garbage collection reclaim many objects, but references can keep data alive. Closures retain enclosing variables. Decorators wrap callables; descriptors power features such as properties. Profile before optimizing.","import sys\n\nitems = [0] * 100\nalias = items\nalias.append(1)\nprint(len(items), sys.getsizeof(items))","After alias = items, what does alias refer to?","The same list object","An automatic deep copy","A frozen version","The same list object","Assignment binds a second name to the same object. Mutating through either name affects that object.","Use tracemalloc and cProfile on a program with growing memory or slow work. Identify the cause and verify an improvement."],["Operating systems and filesystems","Processes have separate memory and operating-system resources; threads share a process's memory. Filesystems expose paths, permissions, and metadata. Use pathlib for portable paths, subprocess with argument lists instead of shell strings, and environment variables for configuration. Handle signals and cleanup when processes stop.","from pathlib import Path\n\nfor path in Path(\".\").glob(\"*.py\"):\n    print(path.name, path.stat().st_size)","Why pass subprocess arguments as a list?","Avoid shell parsing and injection risks","Make the process use more memory","Force the command to succeed","Avoid shell parsing and injection risks","A list passes executable arguments directly and avoids many quoting and shell-injection problems.","Build a cross-platform file organizer with dry-run mode, safe path handling, logging, and recovery from partial failures."],["Networks and distributed systems","Networks add latency, packet loss, and partial failure. DNS maps names to addresses; TCP provides an ordered byte stream; TLS protects transport when configured correctly. Retries need limits, backoff, and idempotency so repeated requests do not duplicate effects. Caches need explicit freshness and invalidation rules.","# Retry policy sketch\nfor attempt in range(3):\n    try:\n        result = request_with_timeout()\n        break\n    except TemporaryError:\n        if attempt == 2:\n            raise\n        wait_with_backoff(attempt)","What makes retrying a request safer?","Idempotency","Removing all timeouts","Retrying forever","Idempotency","An idempotent operation can be repeated without changing the final effect beyond the first successful execution.","Build a resilient service client with timeouts, bounded exponential backoff, idempotency keys, and tests simulating failures."],["Security","Start with assets, trust boundaries, and likely threats. Validate and encode data for its context; parameterize SQL; store secrets outside source control; apply least privilege; update dependencies; and use established cryptographic libraries. Authentication identifies users; authorization decides what they may do. Never invent cryptography.","import hashlib\n\n# Hashes are useful for integrity, not password storage.\nprint(hashlib.sha256(b\"example\").hexdigest()[:12])","For storing passwords, prefer:","A dedicated password-hashing function","Plain SHA-256","Base64 encoding","A dedicated password-hashing function","Password hashing needs a slow, salted algorithm such as Argon2, scrypt, or bcrypt; a fast general hash is not enough.","Threat-model a deliberately unsafe app, fix its top risks, and explain secrets management, authorization, and dependency checks."],["Architecture and design","Good architecture keeps related behavior together and makes change local. Cohesion means a module has a focused purpose; coupling describes dependencies between parts. Use layers and patterns when they clarify boundaries, not by default. Record consequential choices and revisit assumptions as requirements change.","class EmailService:\n    def send(self, message):\n        raise NotImplementedError\n\nclass Notifier:\n    def __init__(self, service):\n        self.service = service\n\n    def notify(self, message):\n        self.service.send(message)","Why inject EmailService into Notifier?","To make the dependency replaceable","To prevent all testing","To hide every function","To make the dependency replaceable","Dependency injection allows another implementation, such as a test double, without changing Notifier.","Write an architecture decision record for a real app. Define module boundaries, dependencies, alternatives, and tradeoffs."],["Packaging and deployment","A distributable project needs metadata, a clear package layout, versioning, and declared dependencies. Build and install it in a clean environment. Configuration belongs outside code; logs should support diagnosis without leaking secrets. CI repeats checks, and releases should be reproducible and documented.","# pyproject.toml excerpt\n[project]\nname = \"hello-course\"\nversion = \"0.1.0\"\nrequires-python = \">=3.11\"\n\n[project.scripts]\nhello-course = \"hello_course.cli:main\"","What does a console-script entry point provide?","An installed command that calls your function","A database migration","A Python interpreter","An installed command that calls your function","Packaging metadata can expose a Python function as a command-line executable after installation.","Package a CLI app. Build and install it in a clean virtual environment, configure logging, and add CI for tests and lint."],["Data and scientific Python","Floating-point numbers approximate many real values; compare with tolerances when appropriate. Arrays enable vectorized numerical work; dataframes organize labeled tables. Good analysis records data sources, cleaning choices, units, random seeds, and limitations so others can reproduce and critique it.","values = [1.2, 2.4, 3.6]\nmean = sum(values) / len(values)\nprint(f\"Mean: {mean:.2f}\")","Why document data cleaning decisions?","So results can be reproduced and interpreted","To make the dataset larger","To avoid checking units","So results can be reproduced and interpreted","Cleaning decisions can change conclusions; documenting them makes analysis inspectable and repeatable.","Analyze an open dataset with a reproducible script or notebook. Explain missing values, units, uncertainty, and limitations."],["Capstone","A capstone demonstrates end-to-end practice: define a user need, write requirements, design boundaries, implement incrementally, test risks, review security, measure performance, document setup, and present tradeoffs. Strong work explains what is complete, what remains limited, and how to reproduce results.","def main():\n    print(\"Replace this with your project entry point.\")\n\nif __name__ == \"__main__\":\n    main()","What makes a capstone convincing?","A working, tested project with clear tradeoffs","The most lines of code","Using every library","A working, tested project with clear tradeoffs","Evidence, reproducibility, and thoughtful explanation matter more than code volume or novelty.","Deliver a project of your choice with requirements, architecture note, automated tests, security review, performance evidence, setup guide, and demo."]];
const quizDone = new Set(JSON.parse(localStorage.getItem("python-course-quiz") || "[]"));
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function renderLesson() {
  const [level, title, intro, checkpoint] = units[selected];
  const [heading, explanation, sample, question, correct, wrong1, wrong2, answer, why, challenge] = lessonDetails[selected];
  const first = selected === 0;
  const choices = [correct, wrong1, wrong2].sort(() => 0.5 - Math.random());
  lesson.innerHTML = `
    <div class="lesson-topline"><span class="lesson-breadcrumb">THE COURSE <span>/</span> UNIT ${String(selected + 1).padStart(2, "0")}</span><span class="level-badge">${level.toUpperCase()}</span></div>
    <h2>${escapeHTML(title)}</h2><p class="lesson-intro">${escapeHTML(intro)}</p>
    <div class="lesson-callout"><strong>${first ? "Welcome — you belong here." : "Lesson goal."}</strong> ${escapeHTML(checkpoint)}</div>
    <h3>${escapeHTML(heading)}</h3><p>${escapeHTML(explanation)}</p>
    <div class="code-example"><button class="copy-code" type="button">Copy</button><code>${escapeHTML(sample)}</code></div>
    <button class="text-link lesson-try" type="button">Try this in the playground ↓</button>
    <h3>Quick check</h3><p>${escapeHTML(question)}</p>
    <div class="quiz-options">${choices.map(choice => `<button class="quiz-option" type="button" data-answer="${escapeHTML(choice)}">${escapeHTML(choice)}</button>`).join("")}</div>
    <p class="quiz-feedback" aria-live="polite">${quizDone.has(selected) ? "✓ Correct — " + escapeHTML(why) : "Choose an answer to check your understanding."}</p>
    <h3>Practice challenge</h3><p>${escapeHTML(challenge)}</p>
    <div class="checkpoint"><div><strong>Build checkpoint</strong>${escapeHTML(checkpoint)}</div><button class="complete-button ${done.has(selected) ? "done" : ""}" id="complete-button" type="button">${done.has(selected) ? "✓ Completed" : "Mark complete"}</button></div>
    <div class="lesson-nav"><button id="previous-button" type="button" ${selected === 0 ? "disabled" : ""}>← Previous unit</button><button id="next-button" type="button" ${selected === units.length - 1 ? "disabled" : ""}>Next unit →</button></div>`;
  lesson.querySelector(".copy-code").addEventListener("click", async event => {
    try { await navigator.clipboard.writeText(sample); event.currentTarget.textContent = "Copied!"; setTimeout(() => { event.currentTarget.textContent = "Copy"; }, 1200); }
    catch { event.currentTarget.textContent = "Select code"; }
  });
  lesson.querySelector(".lesson-try").addEventListener("click", () => {
    const editor = document.querySelector("#code-editor");
    editor.value = sample; document.querySelector("#playground").scrollIntoView({ behavior: "smooth" }); editor.focus();
  });
  lesson.querySelectorAll(".quiz-option").forEach(button => {
    button.addEventListener("click", () => {
      const feedback = lesson.querySelector(".quiz-feedback");
      if (button.dataset.answer === correct) {
        quizDone.add(selected); localStorage.setItem("python-course-quiz", JSON.stringify([...quizDone]));
        feedback.textContent = "✓ Correct! " + why;
        lesson.querySelectorAll(".quiz-option").forEach(option => { option.disabled = true; if (option.dataset.answer === correct) option.classList.add("correct"); });
      } else {
        feedback.textContent = "Not quite. Review the lesson and try again.";
        button.classList.add("incorrect"); button.disabled = true;
      }
    });
  });
  if (quizDone.has(selected)) {
    lesson.querySelectorAll(".quiz-option").forEach(option => { option.disabled = true; if (option.dataset.answer === correct) option.classList.add("correct"); });
  }
  lesson.querySelector("#complete-button").addEventListener("click", () => {
    done.has(selected) ? done.delete(selected) : done.add(selected);
    localStorage.setItem("python-course-done", JSON.stringify([...done]));
    updateProgress(); renderList(); renderLesson();
  });
  lesson.querySelector("#previous-button").addEventListener("click", () => selectUnit(selected - 1, true));
  lesson.querySelector("#next-button").addEventListener("click", () => selectUnit(selected + 1, true));
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

