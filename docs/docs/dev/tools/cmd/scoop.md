---
origin: installed
category: dev
url: https://scoop.sh/
location: ~/scoop
description: Windows command-line installer
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/scoop.jpeg
---

# Scoop

**[Scoop](https://scoop.sh/)** is a command‑line installer for Windows that focuses on simplicity: downloads are checksum‑verified, installs are isolated into versioned directories under your user profile, and PATH shims are created automatically. It avoids UAC prompts by operating in your home directory, keeps configurations portable, and makes upgrading or rolling back tools straightforward. Great for developer tooling (CLI utilities, language runtimes, editors) without hunting installers or clicking through wizards.

## Why use it

Compared to manual installs or heavyweight package managers, Scoop provides predictable, scriptable installs; succinct manifests (buckets) you can inspect; easy cleanup and updates (`scoop update *`). Buckets let you opt into broader catalogs (main, extras, versions, nerd-fonts, java) while keeping the core minimal. Because apps live under `~/scoop/apps/<name>/<version>` you can pin or revert versions by adjusting a symlink rather than uninstalling.

## Installation

Prerequisites: recent PowerShell (5.1+ or pwsh), and (optionally) Git if you plan to add extra buckets.
Run in PowerShell (non-admin):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

This creates the `scoop` directory and adds the shim path to your user environment. Verify:
```powershell
scoop --version
```

Add common buckets:
```powershell
scoop bucket add extras
scoop bucket add versions
```

## Common usage

Search for an app:
```powershell
scoop search neovim
```

Install / uninstall:
```powershell
scoop install neovim
scoop uninstall neovim
```

Update everything (and Scoop itself):
```powershell
scoop update
scoop update *
```

List installed apps:
```powershell
scoop list
```

Show info / current manifest:
```powershell
scoop info ripgrep
```

Hold (pin) a version to prevent upgrades:
```powershell
scoop hold neovim
scoop unhold neovim
```

Cleanup old versions & cache:
```powershell
scoop cleanup *
```

## Notes on installed applications

For details about specific tools I installed via Scoop (e.g. Neovim, ripgrep, fzf, fd, lazygit, LLVM, jq, 7zip, etc.) refer to their individual pages in this documentation rather than duplicating descriptions here.

The following list may not be up-to-date for my current setup, but shows examples of apps I use via Scoop:
```
Name    Version      Source Updated             Info
----    -------      ------ -------             ----
7zip    22.01        main   2023-03-15 18:28:41 
curl    7.88.1_2     main   2023-03-15 18:28:43 
fd      9.0.0        main   2023-12-20 21:18:38 
fzf     0.44.1       main   2023-12-18 15:00:30 
jq      1.6          main   2023-03-15 18:28:44 
lazygit 0.40.2       extras 2023-12-20 21:20:33 
llvm    19.1.6       main   2024-12-22 15:08:08 
neovim  0.10.2       main   2024-12-17 13:26:08 
nvm     1.1.10       main   2023-03-15 21:16:44 
ripgrep 14.0.3       main   2023-12-20 21:17:52 
sudo    0.2020.01.26 main   2023-03-15 18:28:45 
```

## Summary

Scoop streamlines installing and maintaining developer utilities on Windows using simple PowerShell commands, versioned directories, and extensible buckets. Install once, add buckets you need, and manage upgrades or rollbacks quickly while keeping your system clean.