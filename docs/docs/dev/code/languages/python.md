---
origin: installed
category: dev
url: https://www.python.org/
description: Versatile high-level programming language
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/python.png
---

# Python

**[Python](https://www.python.org/)** is a high-level, interpreted programming language known for its readable syntax and versatility. It's used across web development, data science, machine learning, automation, scripting, and more. Python emphasizes code readability and allows you to express concepts in fewer lines than languages like C++ or Java.

## Why Python

- **Readable syntax**: Code looks almost like pseudocode
- **Batteries included**: Rich standard library for common tasks
- **Massive ecosystem**: pip gives access to 500,000+ packages
- **Versatile**: Web, data science, ML, automation, scripting
- **Great for learning**: Low barrier to entry, immediate feedback

## Installation (Windows)

### Option 1: Winget (Recommended)

```powershell
winget install Python.Python.3.13
```

### Option 2: Scoop

```powershell
scoop install python
```

### Option 3: Official installer

Download from [python.org/downloads](https://www.python.org/downloads/). Check "Add Python to PATH" during installation.

### Verify installation

```powershell
python --version
pip --version
```

### Managing multiple versions

For multiple Python versions, use [pyenv-win](https://github.com/pyenv-win/pyenv-win):

```powershell
scoop install pyenv
pyenv install 3.13.0
pyenv global 3.13.0
```

## Hello World

```python
print("Hello, World!")
```

Run:
```powershell
python hello.py
```

Or interactively:
```powershell
python
>>> print("Hello!")
```

## Core concepts

### Variables and types

```python
name = "Alice"       # str
age = 30             # int
price = 19.99        # float
active = True        # bool
items = [1, 2, 3]    # list
data = {"key": "value"}  # dict
```

Python is dynamically typed—no type declarations required.

### Control flow

```python
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

for item in items:
    print(item)

while count > 0:
    count -= 1
```

### Functions

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")              # "Hello, Alice!"
greet("Bob", "Hi")          # "Hi, Bob!"
greet(greeting="Hey", name="Carol")  # Keyword arguments
```

### Classes

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says woof!"

dog = Dog("Rex", "German Shepherd")
print(dog.bark())
```

### List comprehensions

```python
squares = [x**2 for x in range(10)]
evens = [x for x in numbers if x % 2 == 0]
pairs = [(x, y) for x in range(3) for y in range(3)]
```

### Error handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("Cleanup here")
```

### Context managers

```python
with open("file.txt", "r") as f:
    content = f.read()
# File automatically closed
```

## Package management

### pip

```powershell
pip install requests          # Install package
pip install -r requirements.txt  # Install from file
pip list                      # List installed
pip freeze > requirements.txt # Export dependencies
```

### Virtual environments

Isolate project dependencies:

```powershell
python -m venv venv           # Create
.\venv\Scripts\activate       # Activate (Windows)
pip install requests          # Install in venv
deactivate                    # Exit venv
```

### Modern alternatives

- **[uv](https://github.com/astral-sh/uv)**: Fast Rust-based pip replacement
- **Poetry**: Dependency management + packaging
- **PDM**: PEP 582 support, modern workflow

## Python 3.14 features

Python 3.14 (October 2025) brings:

- **Template string literals**: `t"Hello {name}"` syntax for deferred string formatting
- **Deferred annotation evaluation**: Improved type hint handling
- **Remote debugging**: Attach debugger to running processes with `pdb -p PID`
- **Zstandard compression**: New `compression.zstd` module
- **REPL syntax highlighting**: Colors in the interactive interpreter
- **Free-threading improvements**: Better GIL-free mode from 3.13

### Python 3.13 features

- **New REPL**: Multi-line editing, color support (from PyPy)
- **Experimental free-threading**: Run without GIL (opt-in)
- **Experimental JIT**: Just-in-time compilation foundation

## Type hints

Optional static typing for better tooling:

```python
def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}! " * times).strip()

from typing import Optional, List

def process(items: List[int]) -> Optional[int]:
    return sum(items) if items else None
```

Use `mypy` for type checking:
```powershell
pip install mypy
mypy script.py
```

## Common patterns

### Reading/writing files

```python
# Read
with open("data.txt") as f:
    content = f.read()

# Write
with open("output.txt", "w") as f:
    f.write("Hello!")

# JSON
import json
data = json.loads('{"key": "value"}')
json_str = json.dumps(data, indent=2)
```

### HTTP requests

```python
import requests

response = requests.get("https://api.example.com/data")
data = response.json()
```

### Command line scripts

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("name")
parser.add_argument("--count", type=int, default=1)
args = parser.parse_args()
```

## When to use Python

**Good fit:**
- Data science and machine learning (pandas, numpy, scikit-learn, PyTorch)
- Web backends (Django, FastAPI, Flask)
- Scripting and automation
- Rapid prototyping
- Teaching programming

**Consider alternatives when:**
- Raw performance is critical (consider [Rust](/docs/dev/code/languages/rust), C++)
- Mobile app development
- Browser frontend (use [JavaScript](/docs/dev/code/languages/javascript))

## Summary

Python is a readable, versatile language with a vast ecosystem. Install via winget or scoop, manage dependencies with pip and virtual environments. Python 3.13 introduced free-threading and JIT foundations; 3.14 adds template strings and remote debugging. Type hints improve code quality, and the language excels at data science, web development, and automation.
