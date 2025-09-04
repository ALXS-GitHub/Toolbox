---
origin: installed
category: dev
url: https://neovim.io/
location: ~/AppData/Local/nvim
description: Hyperextensible text editor and IDE
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/neovim.png
---

# Neovim

**[Neovim](https://neovim.io/)** is a hyper‑extensible, modernized fork of Vim that keeps the modal editing model (normal/insert/visual modes) while adding first‑class Lua scripting, asynchronous jobs, embedded language servers (LSP), Treesitter parsing, and cleaner APIs for plugins. The goal: a fast, minimal core where everything else (UI elements, language features, tooling) can be composed through plugins.

## Why use it

Modal editing lets you navigate and manipulate text with high precision and low finger travel once the motions become muscle memory. Neovim strengthens that paradigm with:
- Performance: lean core, responsive even in large files.
- Extensibility: configure in Lua; rich plugin ecosystem (LSP, completion, formatting, debugging, Git integration, fuzzy finding, status lines, etc.).
- Consistency & portability: same editor inside terminals, SSH sessions, or integrated shells on Windows + WSL.
- IDE features without the heavy footprint—LSP gives jump‑to‑definition, diagnostics, code actions; Treesitter gives semantic highlighting and structural selections.

## Installation (Windows)

Official, always current instructions: https://github.com/neovim/neovim/blob/master/INSTALL.md

Common Windows options:
- Scoop (my choice): `scoop install neovim` (requires Scoop setup).
- Winget: `winget install Neovim.Neovim`.
- Chocolatey: `choco install neovim`.
- Manual: download the latest release zip, extract, and add the `bin` directory to PATH.

I personally install via [Scoop](/docs/dev/tools/cmd/scoop) for easy upgrades (`scoop update neovim`). After installation verify:
```powershell
nvim --version
```

User configuration lives at `%LOCALAPPDATA%/nvim` (i.e. `~/AppData/Local/nvim`). The primary entry file is `init.lua` (or legacy `init.vim`). Lua enables faster startup and richer plugin setup compared to Vimscript.

## Configuration (my setup)

I use a LazyVim based configuration (plugin manager + curated defaults + lazy‑loading) documented here: [Lazyvim Config](/docs/dev/configs/lazyvim_config). Refer there instead of duplicating details.

## Basic usage

Commands and keybindings are extensively cataloged in the quick reference: https://neovim.io/doc/user/quickref.html
Representative essentials (muscle‑memory starters):
- `:w` write file, `:q` quit, `:wq` write & quit, `:q!` force quit.
- Insert mode with `i`, append with `a`, line start insert `I`, line end append `A`.
- Motions: `w` word forward, `b` word back, `0` line start, `$` line end, `gg` top, `G` bottom.
- Editing: `dw` delete word, `dd` delete line, `x` delete char, `ciw` change inner word, `yy` yank line, `p` paste.
- Search: `/pattern` forward, `n` next, `N` previous; `%` jump matching bracket.
- Splits & buffers: `:vsplit`, `:split`, move with `<C-w> h/j/k/l`, list buffers `:ls`, switch `:b <number>`.

These are examples only—full breadth (registers, macros, visual modes, text objects) is in the quickref and `:help` system. Neovim’s built‑in help is exhaustive: try `:help motion.txt` or `:help lua-guide` for deeper dives.

## Summary

Neovim combines efficient modal editing with a programmable Lua core and modern developer tooling. Install via Scoop (or another package manager), add your `init.lua`, and leverage the plugin ecosystem (LazyVim in my case) for language support and UI polish. The quick reference and `:help` provide everything else as you extend your workflow.