---
description: "My graphical editor: an extension per language, Vim in my fingers, Claude Code in the side panel."
url: "https://code.visualstudio.com/"
status: active
kind: app
platforms: [windows, macos, linux]
image: vscode.png
sidebar_position: 1
---

# Visual Studio Code

VS Code is my graphical editor, next to [Neovim](/tools/dev/editors/neovim) in the terminal. Light, fast, and above all
extensible: every language and tool in my projects has its extension, which makes it the editor that covers
everything, from a Rocket League mod in Rust to a Roblox game in Luau.

## How I use it

I open it from the terminal with the `c` alias (current folder). The settings that matter:

- **Vim** everywhere, with the VSCodeVim extension: `Space` as leader, system clipboard, the same reflexes as in Neovim.
- **Look**: the Rosé Pine Moon theme (the same as in Neovim), Material icons, the Hack Nerd Font in the integrated
  terminal.
- **One formatter per language**: Prettier for the web, Black for Python, rust-analyzer for
  Rust, StyLua for Luau, tinymist for [Typst](/tools/creation/documents/typst).
- **[Claude Code](/tools/ai/coding/claude-code)** in the side panel, to see its changes as diffs right in the editor.

## The extensions that matter

| For | Extensions |
|---|---|
| Reading code | Error Lens (errors on the line), Todo Tree, Better Comments, Code Spell Checker (+ French) |
| Git | GitLens, Git Graph, GitHub Pull Requests, GitHub Actions |
| Web | ESLint, Prettier, Deno |
| Rust | rust-analyzer, Dependi (crate versions), CodeLLDB for debugging |
| Python | Python, Pylance, Black, Jupyter |
| Roblox | Rojo, Luau LSP, Selene, StyLua (see [Developing on Roblox](/setup/roblox)) |
| Misc | Excalidraw and Draw.io (diagrams in the editor), Rainbow CSV, Hex Editor, Live Server |

Extensions get installed as projects need them; the full list comes out of `code --list-extensions`.
