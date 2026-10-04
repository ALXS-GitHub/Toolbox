---
description: A cd that learns where I go, and takes me there in two keystrokes.
url: "https://github.com/ajeetdsouza/zoxide"
status: active
kind: cli
platforms: [windows, macos, linux]
image: zoxide.png
---

# zoxide

zoxide replaces `cd` with a command that remembers the folders I visit. It records every folder I enter and ranks it
by how often and how recently I went there; from then on, `z toolbox` takes me to the best-ranked folder whose path
contains "toolbox", wherever I start from. It is the terminal tool I use the most without even thinking about it.

## Why zoxide

For a long time I used `z`, a PowerShell module that did the same thing. It worked well, but only in PowerShell, and
it had to be loaded every time the shell started. zoxide is a small binary written in Rust: it behaves the same in
PowerShell, bash, zsh and fish, answers instantly even with thousands of folders in its database, and can import the
`z` database so nothing is lost when switching. The old [z](/archive/dev/z) page is in the archive.

## My setup

zoxide is installed with [Scoop](/tools/dev/terminal/scoop) (`scoop install zoxide`) and then has to be initialised in each
shell: that is what creates the `z` and `zi` commands and hooks the folder tracking. On my machine this line is not
written by hand in the profile. It is one of the aliases that [CortX](/projects/cortx) generates for all my
shells with `cortx init`, which keeps PowerShell, bash and the others in sync. On a machine without CortX, add this to
the PowerShell profile:

```powershell
Invoke-Expression (& { (zoxide init powershell | Out-String) })
```

For bash or zsh, the equivalent is `eval "$(zoxide init bash)"` (or `zsh`) in the shell's startup file.

## Day to day

Two commands are enough: `z` jumps straight to the best match, and `zi` opens an interactive list, with
[fzf](/tools/dev/cli/fzf), when several folders look alike.

```powershell
z toolbox        # the most visited folder whose path contains "toolbox"
z perso tool     # several words: they must appear in this order in the path
zi doc           # pick among the candidates, with fzf
z -              # back to the previous folder
```

During the first days zoxide knows nothing: you have to visit a folder once for it to be remembered. After a week it
is rarely wrong. When a folder is gone or no longer useful, `zoxide remove <path>` drops it from the database, and
`zoxide query --list --score` prints the ranking to understand an unexpected choice.

## What it replaces

First of all `z`, with the same idea but without being tied to PowerShell. It also made most of the navigation aliases
I used to write by hand for my project folders unnecessary: I only keep one or two out of habit.
