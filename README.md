# Python from Zero to Expert

A project-based, self-paced course for learning Python from first principles through advanced software engineering. It connects Python fluency to the core ideas practiced in a computer science degree: algorithms, data structures, operating systems, databases, networks, security, and software design.

## Who this is for

No programming experience is required. The course is designed for a learner who can spend about 8–12 hours per week. Each unit combines explanation, small drills, a larger build, and a review checkpoint. Read units in order; revisit the reference notes as needed.

## Learning outcomes

By the end, you should be able to:

- Write, debug, test, document, and package idiomatic Python programs.
- Select and implement data structures and algorithms, explain their complexity, and measure real performance.
- Build command-line tools, web services, database-backed applications, and concurrent programs.
- Reason about memory, processes, filesystems, networking, security, and reliability using Python examples.
- Work effectively with Git, a shell, virtual environments, dependency management, code review, and CI.
- Read unfamiliar code and official documentation, design maintainable systems, and communicate technical tradeoffs.

## Course map

### Beginner — Python foundations

1. **Setup and first programs** — interpreter, editor, shell, REPL, scripts, `print`, comments, errors, and running files.
2. **Values and expressions** — names, numbers, strings, booleans, `None`, operators, conversions, input, and formatted strings.
3. **Decisions and repetition** — comparisons, boolean logic, `if`, `for`, `while`, `range`, loop control, and tracing.
4. **Collections** — lists, tuples, dictionaries, sets, indexing, slicing, mutation, copying, and nested data.
5. **Functions** — parameters, return values, scope, defaults, keyword arguments, decomposition, docstrings, and recursion basics.
6. **Text, files, and errors** — string operations, paths, reading/writing text and CSV/JSON, exceptions, and resource-safe `with` blocks.
7. **Modules and the developer workflow** — imports, project layout, `venv`, `pip`, Git basics, formatting, debugging, and `pytest` fundamentals.

**Beginner builds:** number guessing game, text adventure, gradebook, file organizer, and a tested command-line quiz.

### Intermediate — building reliable programs

8. **Object-oriented Python** — classes, instances, methods, dataclasses, composition, inheritance, protocols, and when not to use a class.
9. **Python's data model** — identity vs equality, mutability, hashability, iteration, generators, context managers, and dunder methods.
10. **Algorithms and complexity** — Big-O, searching, sorting, recursion, divide and conquer, invariants, and empirical profiling.
11. **Core data structures** — stacks, queues, linked structures, hash tables, trees, heaps, graphs, and tradeoffs among built-ins.
12. **Testing and design** — unit/integration tests, fixtures, mocks, property-based thinking, type hints, static checks, refactoring, and API design.
13. **Databases and persistence** — relational modeling, SQL, SQLite, transactions, indexes, migrations, and safe query parameterization.
14. **Networking and web programming** — HTTP, sockets concepts, clients, REST APIs, validation, web frameworks, serialization, and service boundaries.
15. **Concurrency and async** — processes, threads, locks, queues, `asyncio`, I/O-bound vs CPU-bound work, cancellation, and race conditions.

**Intermediate builds:** searchable contacts database, URL checker, REST service, and a concurrent log analyzer.

### Advanced — computer science and professional practice

16. **Advanced algorithms** — graph traversal, shortest paths, dynamic programming, greedy methods, backtracking, amortized analysis, and randomized algorithms.
17. **Memory and runtime** — references, object layout, garbage collection, recursion limits, descriptors, decorators, closures, and profiling memory/CPU.
18. **Operating systems and filesystems** — processes, signals, environment, permissions, paths, subprocesses, pipes, and robust automation.
19. **Computer networks and distributed systems** — DNS, TCP/TLS concepts, retries, timeouts, idempotency, caching, consistency, and failure modes.
20. **Security** — threat modeling, secrets, input handling, injection, authentication basics, authorization, cryptography concepts, and dependency risk.
21. **Architecture and design** — cohesion/coupling, SOLID as heuristics, layered design, event-driven systems, design patterns, and architecture decisions.
22. **Packaging and deployment** — package metadata, build/install, virtual environments, containers concepts, configuration, logging, CI, and release discipline.
23. **Data and scientific Python** — numerical precision, arrays, vectorization, dataframes, visualization, reproducibility, and responsible data handling.
24. **Capstone and interview readiness** — requirements, design proposal, implementation, testing, review, documentation, performance report, and presentation.

**Advanced builds:** miniature search engine, task queue, networked service with persistence, and a final capstone selected by the learner.

## How to study each unit

1. Read the unit guide and type the examples yourself.
2. Complete every exercise without looking at the reference solution first.
3. Add tests for normal cases, boundary cases, and invalid input.
4. Write a short explanation of your design and its time/space costs.
5. Finish the build, run the review checklist, and record what you would improve next.

Aim to explain each idea in your own words and modify your solution when requirements change. Memorizing syntax alone is not the goal.

## Recommended tools

Use a supported Python 3 release, a terminal, a code editor, Git, and a virtual environment per project. The course avoids depending on a particular editor or operating system. Each project should record its Python version and dependencies. Use official Python documentation as the source of truth when behavior is unclear.

## Assessment checkpoints

- **Beginner checkpoint:** build a tested CLI app that reads structured data and handles malformed input.
- **Intermediate checkpoint:** build a database-backed service with an intentional API, test suite, and clear complexity notes.
- **Advanced checkpoint:** design and deliver a capstone with threat considerations, failure handling, performance evidence, and user documentation.

The detailed unit checklist is in [`SYLLABUS.md`](SYLLABUS.md). Start with [`units/00-setup/README.md`](units/00-setup/README.md).

## Scope and expectations

This course aims for the breadth expected of a strong CS undergraduate who uses Python, while recognizing that a degree also includes substantial mathematics, theory, hardware, and other languages. It teaches the practical concepts through Python and flags where Python is a model or tool rather than the whole subject.

