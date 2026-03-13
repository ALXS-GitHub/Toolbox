---
origin: installed
category: dev
url: https://github.com/junegunn/fzf
description: General-purpose command-line fuzzy finder
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/fzf.png
---

# fzf

**[fzf](https://github.com/junegunn/fzf)** is an interactive fuzzy finder for the command line. The idea is simple: pipe any list into it, and you get an instant search interface with fuzzy matching. Files, command history, git branches, processes, environment variables — anything that can be printed line-by-line becomes interactively searchable.

This makes fzf a powerful "glue" tool. It doesn't do much by itself, but it turns any output into a selectable, filterable list. That composability is what makes it indispensable.

## Installation

```powershell
scoop install fzf
```

## Basics

Run `fzf` alone and it lists files in the current directory. Start typing to filter. Press Enter to select, Esc to cancel. Inside fzf, `Ctrl+J`/`Ctrl+K` move up and down, and `Tab` toggles multi-select (with `-m`).

```powershell
fzf                              # Browse files
fd | fzf                          # Use fd as a faster file source
code $(fzf)                       # Open fuzzy-selected file in VS Code
```

## The power of piping

fzf works with any list:
```powershell
git branch | fzf                  # Pick a branch
git log --oneline | fzf           # Pick a commit
docker ps | fzf                   # Pick a container
```

The `--preview` flag shows a live preview of the highlighted item, which is extremely useful for browsing files or commits:
```powershell
fzf --preview "cat {}"
git log --oneline | fzf --preview "git show {1}"
```

## Search syntax

fzf supports several match operators: `'term` for exact match, `^prefix` for prefix, `suffix$` for suffix, and `!term` to exclude. These can be combined for precise filtering.

## PowerShell integration

With the [PSFzf](https://github.com/kelleyma49/PSFzf) module, fzf plugs into PowerShell: `Ctrl+R` fuzzy-searches command history, `Ctrl+T` finds files, and `Alt+C` jumps to directories. This alone makes it worth installing — command history search becomes instant and effortless.

fzf is a single binary with no dependencies. It handles millions of items with no perceptible delay and pairs well with [fd](/docs/dev/tools/cmd/fd) and [ripgrep](/docs/dev/tools/cmd/ripgrep) as input sources.
