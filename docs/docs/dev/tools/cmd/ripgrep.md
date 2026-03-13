---
origin: installed
category: dev
url: https://github.com/BurntSushi/ripgrep
description: Fast recursive search tool, grep alternative
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/ripgrep.png
---

# ripgrep

**[ripgrep](https://github.com/BurntSushi/ripgrep)** (`rg`) is a line-oriented search tool that recursively searches directories for regex patterns. It was written in Rust by Andrew Galloway, and it is almost certainly the fastest grep tool you will ever use.

## Why it's so fast

ripgrep's speed comes from three design decisions working together. First, it uses SIMD vector instructions to scan through bytes in parallel at the CPU level, meaning the regex engine processes multiple characters per clock cycle. Second, it walks directories in parallel threads, so on modern SSDs with deep directory trees, it saturates I/O rather than waiting on it. Third, it respects `.gitignore` rules by default, which means in a typical project it skips `node_modules/`, `target/`, `.git/`, and every other directory you don't care about -- without you asking. The result is that on real-world codebases, ripgrep often finishes before traditional grep has even finished traversing.

VS Code uses ripgrep as its built-in search engine. That should tell you something about its reliability and performance at scale.

## Installation

```powershell
scoop install ripgrep
```

## From simple to advanced

The most basic search is just `rg` followed by a pattern. It searches the current directory recursively, highlights matches in color, and prints line numbers:

```powershell
rg "TODO"
rg "function.*async" src/
```

Add `-i` for case-insensitive matching, or `-w` to restrict to whole-word matches. For literal strings with special characters (brackets, dots, etc.), use `-F` to disable regex interpretation entirely:

```powershell
rg -i "error"
rg -w "main"
rg -F "console.log()"
```

ripgrep knows about over 100 file types. Use `-t` to search only files of a given type, or `-T` to exclude them. Run `rg --type-list` to see all recognized types:

```powershell
rg "import" -t ts
rg "SELECT" -t sql
rg "TODO" -T test
```

When you need surrounding context to understand a match, `-C` adds lines above and below. You can also control them independently with `-B` (before) and `-A` (after):

```powershell
rg "panic!" -C 3
rg "error" -B 2 -A 5
```

## Beyond searching

Sometimes you don't want to see the matches themselves. Use `-l` to get just the list of filenames that contain a match, or `-c` to get a per-file count. These modes are ideal for scripting or for feeding results into other tools:

```powershell
rg "pattern" -l
rg "TODO" -c
rg "pattern" --files-without-match
```

ripgrep can also preview replacements with `-r`. This does not modify any files -- it simply shows you what the output would look like with the substitution applied, making it safe to experiment:

```powershell
rg "old_name" -r "new_name"
```

## Searching everything

By default, ripgrep skips hidden files and anything in `.gitignore`. You can peel back these layers one at a time with `--hidden` and `--no-ignore`, or use `-uu` to go fully unrestricted (hidden files, ignored files, and binary files all included):

```powershell
rg "secret" --hidden
rg "secret" --no-ignore
rg "secret" -uu
```

For glob-based file filtering when file types don't quite fit, use `-g`:

```powershell
rg "config" -g "*.toml"
rg "TODO" -g "!*.test.*"
```

ripgrep pairs naturally with [fzf](/docs/dev/tools/cmd/fzf) for interactive search (`rg --files | fzf`) and with [fd](/docs/dev/tools/cmd/fd) for finding files by name rather than content.
