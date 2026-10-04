---
description: "Find files by name, fast and without complicated options."
url: "https://github.com/sharkdp/fd"
status: active
kind: cli
platforms: [windows, macos, linux]
image: fd.png
---

# fd

fd finds files by name. It is a modern take on `find`, with good defaults: it searches recursively, takes a regular
expression, skips hidden files and everything listed in `.gitignore`, and colours the results. In a project, it
therefore only returns what matters.

## How I use it

```powershell
fd readme                  # anything containing "readme"
fd -e png                  # by extension
fd -t d src                # folders only
fd -HI .env                # including hidden (-H) and ignored (-I) files
fd -e log -X rm            # act on all results at once
```

`-x` runs a command for each result, `-X` once with all of them; `{}` stands for the path, `{.}` for the path without
its extension. It is often simpler than a PowerShell loop.

fd also feeds [fzf](/tools/dev/cli/fzf) (`fd | fzf`) to pick a file from a list, and complements
[ripgrep](/tools/dev/cli/ripgrep), which searches file contents.
