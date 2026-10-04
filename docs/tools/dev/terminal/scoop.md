---
description: "The package manager I install almost all my tools with."
url: "https://scoop.sh/"
status: active
kind: cli
platforms: [windows]
image: scoop.jpeg
sidebar_position: 4
---

# Scoop

Scoop installs command-line programs on Windows without admin rights: each tool goes into its own folder in the user
profile, and a small launcher is added to the `PATH`. Almost all my development tools go through it — languages, CLIs,
Neovim, PowerShell 7 itself.

## Why Scoop

- **No admin rights**, no installer to click through, nothing left in the registry.
- **One-command updates** for everything installed.
- **Isolated versions**: you can go back to the previous one if an update causes trouble.
- **"Buckets"**: catalogues you add as needed. I use four: `main`, `extras` (applications), `java` and `supabase`.

## How I use it

```powershell
scoop install <tool>         # install
scoop update; scoop update * # update Scoop, then everything else
scoop cleanup *              # remove old versions
scoop search <name>          # search the added buckets
scoop bucket add extras      # add a catalogue
```

I keep no list of the packages installed with Scoop: that is [CortX](/projects/cortx)'s job, whose tool registry
records each one's install method, which is what I use to set up a machine again.

## Installing it

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```
