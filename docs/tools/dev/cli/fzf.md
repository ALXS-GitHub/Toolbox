---
description: "Turn any list into an interactive picker, with fuzzy search."
url: "https://github.com/junegunn/fzf"
status: active
kind: cli
platforms: [windows, macos, linux]
image: fzf.png
---

# fzf

fzf takes a list on its input — files, branches, commits, anything — and turns it into an interactive picker with
fuzzy search: type a few letters, the list narrows, Enter returns the choice. It does nothing else, and that is what
makes it so useful: it is a building block you plug in everywhere.

## Where I use it

Mostly through other tools:

- **`zi`** from [zoxide](/tools/dev/cli/zoxide) to pick among similar folders;
- **`omp-theme` and `omp-color`**, my commands to switch the prompt's theme
  ([Oh My Posh](/tools/dev/terminal/oh-my-posh));
- in my scripts, whenever they need to ask "which one?".

And directly, for one-off choices:

```powershell
git branch | fzf                        # pick a branch
fd -e md | fzf --preview "bat {}"       # pick a file, with a preview
code (fzf)                              # open the chosen file in VS Code
```

In the search, `'word` requires an exact match, `^start` and `end$` anchor, and `!word` excludes.

## What I no longer use

The PSFzf module added shortcuts such as `Ctrl+R` to PowerShell to search history with fzf. I no longer load it:
PSReadLine's suggestions and [CortX](/projects/cortx)'s terminal cover that need.
