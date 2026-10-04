---
description: "The shell in all my terminals, version 7."
url: "https://github.com/PowerShell/PowerShell"
status: active
kind: cli
platforms: [windows, macos, linux]
image: powershell.png
sidebar_position: 1
---

# PowerShell

PowerShell is the shell in all my terminals on Windows. I use **PowerShell 7** (the open-source, cross-platform
project), installed with [Scoop](/tools/dev/terminal/scoop), and no longer the Windows PowerShell 5.1 that ships with
the system. The difference is not just a version number: PowerShell 7 is faster, keeps getting new features, and it is
what my scripts target.

## Why PowerShell rather than bash

On Windows, PowerShell is the native shell: it talks to the system directly, and its strength is passing **objects**
around rather than text. `Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU` filters and sorts processes without
ever splitting a string. For the rest, I keep my Unix habits thanks to the aliases [CortX](/projects/cortx) generates
(`ls`, `which`, `touch`, `less`…).

## How I use it

My profile is almost empty: it loads a config file that sets up PSReadLine (Emacs-style editing, suggestions from
history), then runs `cortx init powershell`, which installs the prompt, aliases and tool integrations. The whole chain
is described in [The terminal on Windows](/setup/windows).

Two everyday reflexes:

```powershell
Ctrl+R                     # search history
Ctrl+H                     # (my shortcut) suggestions as a list or inline
```

## What it replaces

Windows PowerShell 5.1, still on the system but no longer opened, and the `cmd` prompt.
