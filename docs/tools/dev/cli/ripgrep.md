---
description: "Search text across a whole project, instantly."
url: "https://github.com/BurntSushi/ripgrep"
status: active
kind: cli
platforms: [windows, macos, linux]
image: ripgrep.png
---

# ripgrep

ripgrep (`rg`) searches file contents for a pattern, recursively. It is extremely fast, respects `.gitignore` and skips
binary and hidden files: in a project, `rg pattern` answers almost instantly and only shows what matters. It is written
in Rust by Andrew Gallant; VS Code actually uses it for its search.

## How I use it

```powershell
rg "TODO"                        # across the whole project
rg -i "error" src/               # case-insensitive, in a folder
rg -F "console.log("             # literal string, no regex
rg -t ts "import"                # TypeScript files only
rg "panic!" -C 3                 # with 3 lines of context
rg -l "deprecated"               # file names only
```

It is also the AI agents' search tool: when Claude Code looks for where a function is used, ripgrep does the work.
With [fd](/tools/dev/cli/fd) for file names and [fzf](/tools/dev/cli/fzf) to pick among results, it replaces `grep`
and PowerShell's `Select-String` on its own.
