---
origin: installed
category: dev
url: https://eza.rocks/
description: Modern ls replacement with icons, colors, and git integration
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/eza.png
---

# eza

PowerShell's default `Get-ChildItem` does its job, but it was never designed to be pleasant to look at. Even with the Terminal-Icons module adding file-type glyphs, the output remains a dense table of modes, dates, and lengths that buries the information you actually care about,what files are here and what has changed. eza replaces all of that with a listing that you can parse at a glance.

## A fork that outlived the original

eza is the community-maintained successor to exa, which was a widely loved `ls` replacement that eventually stopped receiving updates. The eza project picked up where exa left off, inheriting its design philosophy,colorized output, Git awareness, and sensible defaults,while continuing to fix bugs and add features. If you see old blog posts recommending exa, eza is what you want instead.

## Installation

```powershell
scoop install eza
```

## Setting up aliases

The real payoff comes from replacing the built-in `ls` family in your PowerShell profile. These four aliases cover almost every directory listing you will ever need:

```powershell
function ls  { eza --icons --group-directories-first @args }
function ll  { eza --icons --group-directories-first -la @args }
function la  { eza --icons --group-directories-first -a @args }
function lt  { eza --icons --group-directories-first --tree --level=2 @args }
```

With these in place, a bare `ls` gives you a clean single-column listing with icons and directories pinned to the top. `ll` adds the long format with permissions, sizes, and timestamps. `la` shows hidden files. And `lt` renders a two-level tree, which is often exactly the right depth to understand a project's layout without drowning in detail.

## Git integration

One of eza's most quietly useful features is per-file Git status. In the long listing (`ll`), each file gets a small marker showing whether it is new, modified, or ignored according to Git. This turns a directory listing into a lightweight status check,you can see at a glance which files you have touched without switching mental contexts to `git status`. In a repository with dozens of files, that visual shortcut adds up across a day of work.

## Tree view

The `--tree` flag deserves special mention because it replaces the `tree` command entirely. Combined with `--level` to control depth and `--git-ignore` to skip files that Git does not track, it produces compact project overviews that are genuinely useful for documentation or sharing in chat. The colored output and icons make it far more readable than the plain-text trees you get from the system `tree` command.
