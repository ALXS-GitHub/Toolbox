---
sidebar_position: 0
sidebar_label: Overview
description: My personal organiser — tickets, notes, reminders and calendar — on the web, the desktop, the terminal and claude.ai.
status: active
kind: project
platforms: [web, windows, macos, linux]
stack: [React, Tauri 2, Supabase, Bun]
image: zorg.png
---

# Zorg

Zorg is where everything I have to do lives: my projects' tickets, my notes, my reminders and my calendar, organised
by project. I wanted a single tool for all of it, which I could open anywhere — in the browser, as a desktop app, on
the phone — and above all which my AI agents could use as well as I do. It has become the project I use the most every
day: the tasks I hand to [Claude Code](/setup/claude-code/tickets) go through it.

The repository is private. This page and the next two describe how the application works, not what it contains.

## What Zorg does

**Projects.** Everything is organised by project, with a short key used in ticket references (`ZORG-42`), a colour
and an icon. A project can have sub-projects, which share its statuses, labels and versions by default, or have their
own workflow. A global space holds what belongs to no project.

**Tickets.** The heart of the application, modelled on GitHub issues. Each project defines its statuses, grouped in
four categories (to do, in progress, blocked, done). Tickets have a priority, a due date, labels, a version,
sub-tickets, links between them (blocks, relates to, duplicates), comments and attachments. They are shown as a
kanban board, a list, a table or by version, with filters, bulk actions, a command palette and keyboard shortcuts.

**Notes.** Markdown notes, organised in folders, linked to each other with `[[Title]]` links. On the desktop app,
they are also mirrored to a folder of plain `.md` files, synced both ways: I can edit them with any editor and Zorg
picks up the changes.

**Reminders and calendar.** Reminders with several alerts and a recurrence (daily, weekly, monthly, yearly), sent even
when the application is closed. A monthly calendar for events, which can import Google's, read-only.

**Several users, by invitation.** Zorg is built for me, but it can welcome other people: sign-up is only open to
invited addresses, and a project can be shared with roles (owner, manager, editor, viewer). Each connected device —
browser, CLI, AI connector — has its own session, which I can revoke from the settings.

## Four ways to use it

| Surface | For |
|---|---|
| **Web app** | everywhere, including the phone by installing it as an app (PWA) |
| **Desktop app** | Windows, macOS and Linux, with notes as files and native notifications |
| **`zorg` CLI** | the terminal, and above all AI agents that have a shell |
| **MCP server** | claude.ai on the web or the phone, which has no shell |

All four read and write the same data, with the same permissions: what I see in the app, an agent sees through the
CLI. How it works is detailed in [Architecture](/projects/zorg/architecture) and
[Agents: CLI and MCP](/projects/zorg/agents).

## Where it stands

Zorg is at version 0.8 (October 2026), with almost 160 commits since June 2026, and it changes every week:
sub-projects, the MCP server and security hardening landed in early October. I use it every day.
