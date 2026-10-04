---
description: "The engine behind my prompt: a home-made theme and swappable palettes."
url: "https://ohmyposh.dev/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: oh_my_posh.png
sidebar_position: 3
---

# Oh My Posh

Oh My Posh draws the shell prompt from a theme: a series of segments (folder, git branch, language version, time, exit
code…) that only show up when they have something to say. It works with every shell; I use it with
[PowerShell](/tools/dev/terminal/powershell).

## My theme

I use a home-made theme, `alxs`, on two lines: on the left the shell, admin rights, the folder and the git status; on
the right the Node version and the time; below, the last command's exit code. The theme holds no hard-coded colours:
each segment refers to a colour name, and a **palette** gives them their values. I have about twenty (Dracula, Nord,
Rosé Pine, Tokyo Night…), which changes the whole mood without touching the layout.

## Switching theme or colours

[CortX](/projects/cortx) loads Oh My Posh when the shell starts, with the remembered theme and palette. Two commands
switch them:

```powershell
omp-theme            # pick a theme (mine or a built-in one) from a list filtered with fzf
omp-color            # only change the current theme's palette
```

A **Nerd Font** is required for the segments' icons: I use Hack Nerd Font. Setup details are in
[The terminal on Windows](/setup/windows).
