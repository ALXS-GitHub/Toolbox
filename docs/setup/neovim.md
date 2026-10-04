---
sidebar_position: 4
description: My Neovim configuration, built on LazyVim, and what you need to know to run it on Windows.
image: lazyvim.png
---

# Neovim and LazyVim

[Neovim](/tools/dev/editors/neovim) is my editor in the terminal, next to [VS Code](/tools/dev/editors/vscode).
Rather than configuring everything by hand, I start from **LazyVim**, a distribution that provides polished defaults,
a plugin manager and "extras" to turn on per language or need. My configuration only adds what I miss and removes what
gets in the way. It lives in a private repository, cloned into `~\AppData\Local\nvim`.

Current versions: Neovim 0.12, LazyVim 15.

## Layout

```text
nvim/
├── init.lua              # one line: loads config.lazy
├── lua/config/
│   ├── lazy.lua          # lazy.nvim, LazyVim and the extras
│   ├── options.lua       # editor options
│   ├── keymaps.lua       # shortcuts
│   └── autocmds.lua      # automatic actions
└── lua/plugins/          # one file per topic: coding, colours, Copilot, editing, Treesitter, UI
```

LazyVim extras are not picked in the interface (`:LazyExtras`) but imported straight in `lazy.lua`: that way they are
versioned with the rest.

| Extras | For |
|---|---|
| TypeScript, JSON, Tailwind, Rust, Python, Go | support for my languages (language servers, formatting) |
| ESLint, Prettier | web linting and formatting |
| Copilot, Copilot Chat | [GitHub Copilot](/tools/ai/coding/github-copilot) suggestions and chat |
| yanky, dial, harpoon2, inc-rename | better clipboard, smart increment, file bookmarks, live rename |
| mini-hipatterns, treesitter-context | highlighted colours, current function context at the top of the screen |

## What I adjusted

- **Completion and Copilot.** Completion (blink.cmp) inserts nothing without me and shows documentation after a short
  delay; its ghost text is turned off, since Copilot provides the inline suggestions. `Ctrl+J` accepts a suggestion,
  `Ctrl+]` and `Ctrl+[` cycle through them, and the suggestion hides as soon as the completion menu opens, so two
  proposals never overlap.
- **Colours.** Rosé Pine by default, with transparency and a few tweaks for diffs and Markdown headings. Other themes
  (Catppuccin, Tokyo Night, Kanagawa, Nightfox) load on demand from LazyVim's picker.
- **Editing.** nvim-surround to wrap a selection, Markdown rendered right in the editor, automatic closing of HTML
  tags.
- **Interface.** The start screen has a home-made ASCII header; shortcuts open lazygit (`<leader>gz`), the file's
  GitHub page (`<leader>gB`), a zen mode (`<leader>z`) and a scratch buffer (`<leader>.`).
- **Options.** Relative line numbers, mouse off, splits below and to the right, and spell checking in French and
  English that understands camelCase.

Shortcuts mostly come from my habits: `ss` and `sv` to split the window, `sh`, `sj`, `sk`, `sl` to move between splits,
`+` and `-` to increment a number, `Tab` to switch tabs.

## On Windows

Two settings only exist to make LazyVim work on Windows:

- **Compile Treesitter with clang.** Treesitter compiles its syntax parsers on install. With the MinGW compiler, the
  linker fails on Windows' long paths. I therefore force `clang`, installed with [Scoop](/tools/dev/terminal/scoop)'s
  `llvm` package, with one line in `options.lua`: `vim.env.CC = "clang"`.
- **Drop codelldb from Mason.** The codelldb debugger, which LazyVim installs for Rust, fails to install on Windows and
  blocks start-up: I remove it from the list of automatically installed tools.

## Installing it

```powershell
scoop install neovim llvm
git clone <config repository> $env:LOCALAPPDATA\nvim
nvim     # on first start, lazy.nvim installs every plugin
```

In the terminal, `vim` is an alias for `nvim` (see [The terminal on Windows](/setup/windows)).
