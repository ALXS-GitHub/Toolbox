---
sidebar_position: 2
sidebar_label: "Agents: CLI and MCP"
description: How an AI agent uses Zorg — the CLI by default, the MCP server when there is no shell.
---

# Agents: CLI and MCP

Zorg was designed from the start to be used by AI agents as much as by me. The idea comes from another of my tools,
[CortX](/projects/cortx): everything the interface does must be doable from the command line, and the CLI must explain
by itself how to use it. The MCP server came later, for agents that have no terminal.

## The CLI by default

An agent with a shell, such as [Claude Code](/tools/ai/coding/claude-code), goes through the CLI. Its first command is
`zorg ai`, which prints a guide written for it: the conventions, the entities and their fields, how to read a ticket
with its context, how to work with sub-projects.

```bash
zorg ai                                   # the guide for agents
zorg project list --json                  # projects, as JSON
zorg ticket show <ticket> --json          # a full ticket, with its comments
zorg ticket update <ticket> --set priority=3
zorg comment add <ticket> "Done: …"
```

Every entity (projects, tickets, notes, reminders, events, statuses, labels, versions…) has the same commands: `list`,
`get`, `create`, `update`, `delete`. Tickets add their own: the full view, labels, links, sub-tickets, comments and
attachments. The conventions are designed for a program: `--json` everywhere, `--set field=value` to change things, a
name or an identifier accepted everywhere, `--yes` to confirm a deletion without interaction, a reliable exit code.

The full cycle of a ticket handed to Claude Code is described on the [Tickets and mods](/setup/claude-code/tickets)
page of my harness.

## Signing in through the browser

The CLI signs in like `gh`: it starts a small local server, opens the browser on a page of the app, and I approve the
sign-in with the session I already have there. The local server then receives a single-use token, which the CLI
exchanges for a session of its own. I never type a password in the terminal, and each connected CLI shows up as a
separate device in the settings, which I can sign out at any time. The session expires after thirty days.

## The MCP server for claude.ai

On claude.ai, in the browser or on the phone, there is no shell: no CLI possible. Zorg is available there as a
connector, thanks to a remote MCP server. It exposes eight tools, deliberately limited to tickets: list projects,
statuses, versions and tickets, show a ticket, create one, update one, add a comment. It also sends its usage
instructions as soon as it connects, the equivalent of `zorg ai`.

Sign-in uses OAuth 2.1, like any connector: claude.ai discovers the authorisation server, registers, and I accept the
access on a Zorg consent screen. On every request, the server checks that the token is meant for it, that it comes
from a connector and not another session, and that the session still exists and is under thirty days old. Revoking
the access in the settings cuts it off immediately. The other way round, a connector token cannot be used to open a
full session elsewhere.

## Which one to use

The CLI covers everything and is the most efficient: the agent reads the help, chains commands and filters the JSON.
The MCP server only covers tickets and is only for places with no terminal. In Claude Code, the claude.ai Zorg
connector is therefore turned off, so the agent does not take the wrong path.
