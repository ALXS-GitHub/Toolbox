---
description: "My everyday scripts, and the tooling behind my Claude skills."
url: "https://www.python.org/"
status: active
kind: language
image: python.png
sidebar_position: 4
---

# Python

Python is my scripting language: anything that transforms files, automates a task or glues two tools together. I rarely
use it for a whole application, but very often for the small programs that help.

## Where I use it

- **My global scripts**, declared in [CortX](/projects/cortx): converting an image, removing a background, zipping a
  folder without its dependencies… Each one declares its own dependencies at the top of the file, and
  [uv](/tools/dev/runtimes/uv) installs them on the fly: no environment to prepare.
- **My Claude skills' scripts**: rendering [diagrams](/setup/claude-code/skills) and documents to PNG or PDF goes
  through Python scripts.
- **Jupyter notebooks**, in [VS Code](/tools/dev/editors/vscode), to explore data.

Python is installed with [Scoop](/tools/dev/terminal/scoop), and everything else (environments, dependencies, tools)
goes through uv.
