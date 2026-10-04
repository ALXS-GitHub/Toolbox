---
sidebar_position: 1
description: A desktop app that launches my projects, hosts my terminals and keeps track of my tools.
url: "https://github.com/ALXS-GitHub/CortX/releases"
repo: "https://github.com/ALXS-GitHub/CortX"
status: active
kind: project
platforms: [windows, macos, linux]
stack: [Tauri 2, Rust, React, TypeScript]
image: cortx.png
---

# CortX

CortX started from a simple annoyance: working on a project meant opening four terminals, starting the front end, the
API and a worker, then finding out which one showed what. CortX puts all of that in one application: a project, its
services, one button to start everything. It has since become the centre of my working environment. It is my
terminal, it generates the aliases of all my shells, it runs my scripts and it keeps the list of the tools installed
on the machine.

The project is open source (MIT licence) and released for Windows, macOS and Linux.

## What CortX does

**Projects and services.** A project is a folder and a list of services: a command, a working directory, environment
variables. You start them one by one or all together; CortX detects the open ports and keeps each service's output in
a tab. Stopping a service sends `Ctrl+C` first, so that dev servers shut down cleanly.

**A real terminal.** Every service, script or shell runs in a real pseudo-terminal rendered with xterm.js: colours,
progress bars and text interfaces behave as in a regular terminal. The Terminal window adds tabs, splits, Warp-like
shortcuts, themes in Warp's format and session restore: when it reopens, each tab gets back its folder and the end of
its previous output, without re-running anything. With the shell integration, tabs follow the current directory and
flag when long commands finish. It is my everyday terminal: it replaced [Warp](/archive/dev/warp).

**Scripts, tools and aliases.** CortX keeps parameterised global scripts, which I run from the app, from its text
interface or with `cortx run`. It also keeps a registry of the tools and applications on the machine, with their
status, their configuration files and a link to their page in this documentation: that is my inventory when I set up
a new computer. Finally, `cortx init <shell>` generates the same set of aliases, functions and integrations for
PowerShell, bash, zsh and fish, such as the one for [zoxide](/tools/dev/cli/zoxide).

## With an agent

An agent working on a project often needs to run it: start the dev server, read its logs to understand an error,
restart it after a fix. Without CortX, I am the one opening terminals and pasting error messages into the
conversation. With CortX, the agent does it itself, with the same configuration as mine: it lists the project's
services, starts one in the background, reads its latest logs, stops it.

```bash
cortx docs                                   # the reference written for agents
cortx project list --json                    # known projects
cortx service start <project> <service>      # starts in the background, returns at once
cortx service status <project> <service>     # PID, uptime, last log lines
cortx service logs <project> <service>
```

Agents use this CLI by default: every command answers in JSON with `--json`, and `cortx docs` explains the rest. The
MCP server exposes the same features for clients that have no shell access. The agent can also run my global scripts,
look up the registry of tools on the machine, or, with `cortx agents`, find the other Claude Code and Codex sessions
running and read their latest messages (still in beta).

## How it is built

CortX is a Rust workspace with a Tauri application on top. The diagram shows how the four interfaces share one core.

<Diagram
  name="cortx-architecture"
  alt="The desktop app, the TUI, the CLI and the MCP server call cortx-core, which manages services, generates the shell init and stores the data as JSON, backed up to a git repository."
/>

Everything goes through `cortx-core`, a Rust library that defines the models, reads and writes the data and manages
processes. The desktop app (Tauri 2, React 19, TypeScript, Tailwind, shadcn/ui, Zustand), the text interface
(ratatui), the CLI and the MCP server are just different ways to reach it, so they all see the same projects, scripts
and aliases. The data is plain JSON files; `cortx backup` pushes them to a private git repository, which brings
everything back on a new machine.

Releases are built by GitHub Actions when I push a tag: the release is created as a draft with the installers for the
three systems, and I publish it by hand (see
[Tauri app updates](/setup/tauri-updates)).

## Where it stands

CortX is my most active project. It is at version 0.15 (October 2026), with almost 280 commits, and I use it every
day: it is what opens my terminals and sets up my shells.

## Installing it

The installers (`.msi` and `.exe` for Windows, `.dmg` for macOS, `.deb` and `.AppImage` for Linux) are on the
[releases page](https://github.com/ALXS-GitHub/CortX/releases). To build it yourself, you need Bun and Rust:

```bash
git clone https://github.com/ALXS-GitHub/CortX.git
cd CortX/frontend
bun install
bun tauri:dev     # development mode
bun tauri:build   # installer for the current system
```
