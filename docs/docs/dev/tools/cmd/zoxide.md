---
origin: installed
category: dev
url: https://github.com/ajeetdsouza/zoxide
description: Smarter cd command that tracks directory frecency
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/zoxide.png
---

# zoxide

There is a particular kind of friction in terminal work that you stop noticing after a while: typing out directory paths. You know where you want to go, your fingers know roughly what it is called, but you still end up tabbing through three levels of nesting or pulling up a recent command from history. The original [z](/docs/dev/tools/cmd/z) PowerShell module solved this problem well enough: it watched where you `cd` and let you jump back with a fuzzy match. zoxide solves it better.

## What changed

zoxide is a ground-up rewrite of the directory-jumping concept in Rust. Where the `z` PowerShell module (v1.1.13) was confined to a single shell and carried the overhead of PowerShell scripting, zoxide is a compiled binary that works identically across bash, zsh, fish, PowerShell, and nushell. The frecency algorithm (the same frequency-plus-recency ranking that made the original `z` useful) is still at the core, but the implementation is fast enough that you never notice it running. On a cold database with thousands of entries, lookups complete in single-digit milliseconds.

## Installation

```powershell
scoop install zoxide
```

After installing, zoxide needs a single initialization line in your PowerShell profile to hook into `cd` and start tracking directories:

```powershell
Invoke-Expression (& { (zoxide init powershell | Out-String) })
```

That one-liner registers the `z` and `zi` functions and begins recording every directory change in a lightweight SQLite database. There is no import step, no module to load, no configuration file to create. If you were previously using the `z` PowerShell module, you can remove its `Import-Module z` line and zoxide will start building its own database from scratch as you work.

## Daily usage

The command you will reach for most often is simply `z` followed by a fragment of the directory name. zoxide matches against all recorded paths and jumps to the one with the highest frecency score:

```powershell
z projects       # jumps to your most-used "projects" directory
z desk prog      # matches something like Desktop/Programmes
z src             # wherever "src" lives that you visit most
```

When the top match is not what you wanted (maybe you have two directories with similar names), `zi` opens an interactive picker powered by [fzf](/docs/dev/tools/cmd/fzf). You get a ranked list of every matching path and can arrow through them or refine the search in real time. It is the difference between "I trust the algorithm" and "let me see the options," and having both available under two-character commands means you never need to type a full path again.
