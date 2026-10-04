---
description: "My editor in the terminal, built on LazyVim."
url: "https://neovim.io/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: neovim.png
sidebar_position: 2
---

# Neovim

Neovim is the modern take on Vim: the same keyboard-driven editing, with a Lua configuration, a real plugin ecosystem
and built-in support for language servers (completion, definitions, errors). It is my editor in the terminal, to change
a file quickly without leaving the shell, or to work for hours without a mouse.

## How I use it

I do not start from scratch: my configuration is built on **LazyVim**, a distribution that provides good defaults and
"extras" to turn on per language. I open it with `vim` (an alias), start [lazygit](/tools/dev/cli/lazygit) from it with
`<leader>gz`, and its themes match [VS Code](/tools/dev/editors/vscode)'s (Rosé Pine).

How my configuration is organised, what I adjusted and the two settings Windows needs are described in the
**[Neovim and LazyVim](/setup/neovim)** guide.

## Installing it

```powershell
scoop install neovim llvm      # llvm provides clang, which Treesitter needs on Windows
```
