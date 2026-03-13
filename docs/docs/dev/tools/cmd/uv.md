---
origin: installed
category: dev
url: https://github.com/astral-sh/uv
description: Extremely fast Python package and project manager
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/uv.png
---

# uv

**[uv](https://github.com/astral-sh/uv)** is an extremely fast Python package and project manager, written in Rust by [Astral](https://astral.sh/) -- the same team behind the Ruff linter. It is 10--100x faster than pip for most operations, thanks to parallel downloads, aggressive caching, and a Rust-native resolver.

## The problem uv solves

Python's tooling ecosystem has historically been fragmented. To manage a real project, you needed `pyenv` to install Python versions, `venv` or `virtualenv` to create environments, `pip` and `pip-tools` to manage dependencies, `poetry` or `pdm` for project workflows, and `pipx` to install standalone CLI tools. Each tool had its own configuration, its own quirks, and its own update cycle. uv replaces all of them with a single binary.

## Installation

```powershell
irm https://astral.sh/uv/install.ps1 | iex
```

## Step 1: Install Python itself

No need for pyenv or downloading installers from python.org. uv manages Python versions directly:

```powershell
uv python install 3.12
uv python list
uv python pin 3.12
```

`pin` writes a `.python-version` file so that anyone cloning the project gets the same interpreter.

## Step 2: Create a project

`uv init` scaffolds a new project with a `pyproject.toml` and sets up the virtual environment automatically. You never have to think about `venv` again -- uv creates and activates it behind the scenes whenever needed:

```powershell
uv init myproject
cd myproject
```

## Step 3: Manage dependencies

Adding and removing packages updates both `pyproject.toml` and the lockfile (`uv.lock`) in one step. `uv sync` then installs exactly what the lockfile specifies, ensuring reproducible builds across machines:

```powershell
uv add requests flask
uv remove flask
uv sync
```

uv uses a global cache for downloaded packages, so shared dependencies across projects don't waste disk space. A fresh `uv sync` on a project whose packages are already cached completes in milliseconds.

## Step 4: Run your code

`uv run` executes a script inside the project's virtual environment. You don't need to activate anything first -- uv resolves the environment, installs missing dependencies if needed, and runs the command:

```powershell
uv run main.py
uv run pytest
uv run python -c "import flask; print(flask.__version__)"
```

## Step 5: Share tools with others

`uvx` is uv's answer to `npx` -- it runs a Python CLI tool without installing it permanently. Need to format some code but don't want black in your global PATH? Just run it:

```powershell
uvx ruff check .
uvx black .
uvx httpie GET https://api.example.com
```

For tools you do want permanently available, `uv tool install` puts them in an isolated environment on your PATH:

```powershell
uv tool install ruff
uv tool install jupyter
```

## The pip compatibility layer

If you're working with legacy projects that use `requirements.txt`, uv has a pip-compatible interface that acts as a drop-in replacement:

```powershell
uv venv
uv pip install requests
uv pip compile requirements.in -o requirements.txt
uv pip sync requirements.txt
```

This makes migration gradual. You can start using uv for speed alone, even before adopting `pyproject.toml` and the full project workflow.
