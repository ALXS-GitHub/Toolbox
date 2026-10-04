---
description: "Git from the keyboard, in a text UI: stage, commit, rewrite history."
url: "https://github.com/jesseduffield/lazygit"
status: active
kind: cli
platforms: [windows, macos, linux]
image: lazygit.png
---

# lazygit

lazygit is a text UI for [Git](/tools/dev/version-control/git). Everything painful on the command line — staging part
of a file, rewriting the last commits, resolving a conflict — is done from the keyboard while seeing what you do. It is
how I do most of my git day to day.

## How I use it

I open it with the `lg` alias in the terminal, or with `<leader>gz` from [Neovim](/setup/neovim). It keeps its default
configuration.

| Key | Action |
|---|---|
| `Space` | stage / unstage the file (or the line, in the detail view) |
| `a` | stage everything |
| `c` | commit |
| `P` / `p` | push / pull |
| `e` (on a commit) | interactive rebase from that commit |
| `s`, `r`, `d` | squash into the previous one, reword, drop a commit |
| `z` | undo the last action |
| `?` | every key of the current panel |

The main benefit is the preview: while going through changed files, you see each one's diff before deciding to stage
it, and you can stage only some lines. Interactive rebase, which on the command line means editing a text file,
becomes a series of reversible keystrokes.

Commits are signed as usual: lazygit calls Git, which goes through 1Password (see [Git and GitHub](/setup/git)).
