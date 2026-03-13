---
origin: installed
category: dev
url: https://github.com/sharkdp/fd
description: Simple, fast alternative to the find command
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/fd.png
---

# fd

**[fd](https://github.com/sharkdp/fd)** is a modern replacement for the Unix `find` command, written in Rust. Where `find` requires verbose flags and searches everything indiscriminately, fd uses sensible defaults out of the box: it ignores hidden files and `.gitignore` entries, searches with regex, is case-insensitive by default (smart-case), and parallelizes directory traversal for 5–10x faster results on large trees.

## Installation

```powershell
scoop install fd
```

## How it works

The simplest call is just `fd pattern` — it searches the current directory recursively for anything matching the regex. No flags needed for the common case:

```powershell
fd readme                    # Finds README.md, readme.txt, etc.
fd "\.md$"                   # All Markdown files
fd -e png                    # All .png files (extension filter)
fd -t d src                  # Directories matching "src"
fd -t f config               # Files matching "config"
```

By default, fd skips hidden files (dotfiles) and anything listed in `.gitignore`. Override this with `-H` (hidden) and `-I` (ignored), or `-HI` for both.

## Executing commands on results

fd can run a command for each match, with placeholders for the path:

```powershell
fd -e jpg -x magick {} {.}.png    # Convert each JPG to PNG (ImageMagick)
fd -e tmp -X rm                    # Delete all .tmp files in one call
```

Placeholders: `{}` full path, `{.}` without extension, `{/}` basename, `{//}` parent directory.

## Useful flags

`-d N` limits search depth. `-s` forces case-sensitive matching. `--size +100m` filters by file size. `-g` switches from regex to glob patterns. `-a` shows absolute paths. `-l` gives a long listing with metadata.

fd pairs naturally with [fzf](/docs/dev/tools/cmd/fzf) for interactive selection (`fd | fzf`) and with [ripgrep](/docs/dev/tools/cmd/ripgrep) for searching file contents.
