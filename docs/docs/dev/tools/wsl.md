---
origin: installed
category: dev
url: https://learn.microsoft.com/windows/wsl/
description: Windows Subsystem for Linux
use_state: active
rating: 5
os: Windows
sidebar_custom_props:
    image: /images/wsl.png
---

# WSL

**[Windows Subsystem for Linux (WSL 2)](https://learn.microsoft.com/windows/wsl/)** provides a real Linux kernel running in a lightweight utility VM, tightly integrated with Windows so you can run Linux distributions, CLI tools, package managers, and development stacks side‑by‑side with native Windows applications. Unlike traditional virtual machines, WSL 2 starts fast, uses minimal overhead, and lets you access your files and tooling from both environments seamlessly.

## Why use it

It removes friction when building or running software that expects a Linux environment (most server frameworks, container tooling, shell scripts, language ecosystems) while still letting you rely on Windows for GUI apps, editors, or proprietary tools. File system performance and full system call compatibility in WSL 2 mean tools like Docker (when using its WSL backend), Node.js, Python, Rust, Go, etc. behave like they would on a native Linux host. You can bind mount Windows paths, open Linux folders directly in VS Code, and copy/paste across boundaries without ceremony.

## Installation

Official instructions (kept up to date) live here: https://learn.microsoft.com/windows/wsl/install. In most cases on current Windows 11 builds you simply run:
```powershell
wsl --install
```

This enables required components (Virtual Machine Platform, WSL), downloads the default distribution, and sets WSL 2 as the default version. You can list installed distributions with:
```powershell
wsl --list --verbose
```

And set a default version (in case it isn’t already 2):
```powershell
wsl --set-default-version 2
```

Refer to the Microsoft docs for advanced scenarios (custom kernels, import/export of distributions, mounting drives, GPU compute, systemd enablement, etc.) rather than duplicating all switches here.

## Distributions

Multiple Linux distributions are available via the Microsoft Store (Ubuntu, Debian, Fedora, openSUSE, Kali, etc.). You pick whichever matches your production or learning environment. I currently use: Ubuntu 22.04.3 LTS. You can install another distribution without affecting existing ones; each is isolated with its own packages, users, and file system.

Install an additional distribution (example):
```powershell
wsl --install -d Ubuntu-22.04
```

Launch it from the Start Menu or via:
```powershell
wsl -d Ubuntu-22.04
```

## File system & interoperability (brief)

Linux root for a distribution lives in a virtual ext4 VHD. From Windows you can access it at `\\wsl$\<DistroName>\`. Inside WSL your Windows drives are auto-mounted at `/mnt/c`, `/mnt/d`, etc. Prefer keeping active Linux project files inside the Linux filesystem for best performance (instead of editing large projects directly in `/mnt/c`). VS Code with the Remote - WSL extension transparently handles this by launching a server within the distribution.

## My Configuration & dotfiles

My specific WSL configuration (including `.wslconfig`, dotfiles bootstrap, package selections, and shell customizations) is documented in the [WSL Config Documentation](/docs/dev/configs/wsl_config). That section covers how I synchronize dotfiles, manage default shell, resource limits (memory/CPU), and other environment tweaks. Refer there for details beyond the general concepts here.

## Basic management commands

```powershell
wsl --list --verbose          # Show installed distributions & versions
wsl --set-version Ubuntu-22.04 2  # Convert a distro to WSL 2
wsl --terminate Ubuntu-22.04  # Gracefully stop a distribution
wsl --export Ubuntu-22.04 C:/backups/ubuntu22.tar  # Backup distro
wsl --import UbuntuClone C:/WSL/UbuntuClone C:/backups/ubuntu22.tar --version 2  # Restore/import
```

## Summary

WSL 2 gives you near‑native Linux development inside Windows with minimal overhead: fast startup, full system call support, and tight integration with editors and tools. Choose a distribution (Ubuntu 22.04.3 LTS in my case), install via the simplified `wsl --install` path, and layer your own configuration/dotfiles for productivity. See the dedicated config page for deeper customization.