---
description: "A real Linux inside Windows."
url: "https://learn.microsoft.com/windows/wsl/"
status: paused
kind: app
platforms: [windows]
image: wsl.png
sidebar_position: 6
---

# WSL

WSL (Windows Subsystem for Linux) runs a real Linux distribution inside Windows, with a full Linux kernel, started in a
second and integrated with the system: you run Linux commands from Windows, open files from either side, and VS Code
works right inside it.

I used it a lot, with my own bash config files (prompt, aliases, completion). I am not using it at the moment: all my
tools run natively on Windows with [PowerShell](/tools/dev/terminal/powershell), and [CortX](/projects/cortx) generates
the same aliases for bash should I come back to it.

```powershell
wsl --install            # installs WSL and Ubuntu
wsl                      # open the Linux shell
```
