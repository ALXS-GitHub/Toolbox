---
description: "All of Python in one very fast tool: versions, environments, dependencies, scripts."
url: "https://docs.astral.sh/uv/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: uv.png
sidebar_position: 4
---

# uv

uv replaces pip, venv, pipx and pyenv with a single tool, written in Rust and extremely fast. Everything I do in
[Python](/tools/dev/languages/python) goes through it.

## How I use it

Its best feature for me is **standalone scripts**: a Python script declares its dependencies in a comment at the top of
the file, and `uv run` installs them in a throwaway environment before running it. My [CortX](/projects/cortx) global
scripts all work that way: no environment to create, nothing to install beforehand.

```python
# /// script
# dependencies = ["pillow"]
# ///
```

```bash
uv run script.py               # run a script with its dependencies
uv init && uv add requests     # a project, with its environment and lock file
uvx ruff check .               # run a tool without installing it
```
