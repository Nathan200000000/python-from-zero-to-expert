# Unit 00: Setup and your first program

## Goals

By the end of this unit, you can distinguish the Python interpreter from a program, run code in an interactive prompt and from a file, and recognize syntax errors versus errors that happen while a program runs.

## The basic loop

Python reads instructions and executes them. The interactive prompt lets you try one expression at a time. A script stores a sequence of instructions in a `.py` file so it can be rerun. A code editor helps you change files; a terminal runs commands. These tools have different jobs.

Create `hello.py`:

```python
print("Hello, Python!")
print("I can run a program.")
```

Run it with `python hello.py` (some systems use `python3 hello.py` or `py hello.py`). The exact command depends on how Python is installed. If the command is not found, check the installation and PATH setup rather than changing the program.

## Errors are clues

- A **syntax error** means Python could not parse the program. Check the indicated line and the line just before it.
- A **runtime exception** means execution began, then an operation failed. Read the exception type and traceback from the bottom upward.
- A **logic error** means the program ran but produced the wrong result. Reproduce it with a small input, inspect intermediate values, and state what result you expected.

Try these deliberately, one at a time, and explain each message:

```python
print("missing quote)
```

```python
print(10 / 0)
```

## Practice

1. Print your name and one thing you want to build.
2. Change the program, save it, and run it again. What happens if you forget to save?
3. Open the interactive prompt and evaluate `2 + 3`. Then evaluate `"py" + "thon"`.
4. Make one syntax error and one runtime exception. Record how their tracebacks differ.
5. Explain in your own words the roles of the interpreter, editor, terminal, and script.

## Checkpoint

You are ready to continue when you can create, save, run, and edit a script without an editor-specific run button, and can use an error message to locate the next thing to inspect.

