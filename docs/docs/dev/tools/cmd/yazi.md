---
origin: installed
category: dev
url: https://yazi-rs.github.io/
description: Blazing fast terminal file manager with async I/O
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/yazi.png
---

# yazi

Most terminal file managers feel like they are fighting the terminal rather than embracing it. yazi does not have that problem. It is written in Rust with every I/O operation running asynchronously and CPU-heavy work spread across threads, which means scrolling through a directory of ten thousand files feels the same as scrolling through ten. Large images render previews without blocking navigation. Syntax-highlighted code previews load in the background while you are already moving to the next file.

## Installation

```powershell
scoop install yazi
```

## How it fits into a terminal workflow

yazi occupies a specific niche: it is the spatial, visual layer on top of a terminal-centric development setup. Where [lazygit](/docs/dev/tools/cmd/lazygit) gives you a TUI for Git and Neovim gives you a TUI for editing, yazi gives you a TUI for the filesystem itself. The three tools together form a workflow where you rarely need to leave the terminal,yazi to navigate and manage files, Neovim to edit them, lazygit to commit the changes. Each tool is fast enough that switching between them feels like changing tabs, not launching applications.

## The wrapper function

By default, yazi runs as a standalone process and does not affect your shell's working directory. To fix that, you add a small wrapper function to your PowerShell profile that captures the last directory yazi visited and `cd`s into it on exit:

```powershell
function y {
    $tmp = [System.IO.Path]::GetTempFileName()
    yazi $args --cwd-file="$tmp"
    $cwd = Get-Content -Path $tmp
    if ($cwd -and $cwd -ne $PWD.Path) {
        Set-Location -LiteralPath $cwd
    }
    Remove-Item -Path $tmp
}
```

With this in place, pressing `q` to quit yazi drops you into whatever directory you last navigated to, making it a natural extension of `cd` rather than an isolated file browser.

## What you get out of the box

yazi ships with image previews (via terminal protocols like Sixel and iTerm2 inline images), syntax highlighting for code files, archive peeking, and bulk rename and delete operations. The interface follows a three-pane layout inspired by ranger,parent directory on the left, current directory in the center, preview on the right,but the async architecture means the preview pane never slows down the navigation pane.

## Extending with Lua

The plugin system uses Lua, keeping extensions lightweight and sandboxed. Plugins can add new previewers for custom file types, define keybinding schemes, or integrate with external tools. The plugin ecosystem is still young compared to Neovim's, but the architecture is sound and the community is active. For most users, the defaults are more than enough.
