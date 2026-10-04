---
sidebar_position: 8
description: Handing a ticket to the agent, and following its work from the terminal.
---

# Tickets and mods

My development tasks live in my ticket manager, Zorg, a personal project. The integration with Claude Code allows a
request like "take ticket 42": the agent reads the whole ticket, does the work, commits, moves the ticket and leaves a
follow-up comment. Three pieces make it work: a CLI built for agents, a skill that describes a ticket's life cycle, and
two mods that keep the ticket in view in the terminal.

<Diagram
  name="harness-tickets"
  alt="In the terminal, the tickets skill calls the CLI, which the mods read; the CLI talks to the database. On claude.ai, without a shell, the connector goes through the MCP server, which reaches the same database."
/>

## A CLI built for agents

The CLI answers every command in JSON with `--json`, accepts a name or an identifier wherever it expects a ticket or a
project, and has a command that prints its own documentation, written for an agent: what can be done, the
conventions, the pitfalls. The agent reads it before anything else, which saves repeating the manual in every
instruction. Signing in goes through the browser and the session expires after thirty days: when it does, the agent
asks me to sign in again instead of looking for a workaround.

That is the default path. The same service exposes an MCP server, with OAuth sign-in, for clients that have no shell:
claude.ai on the web or on the phone. In the terminal, that connector is denied, since the CLI does the same thing
better (see [Settings](/setup/claude-code/settings)).

## The skill: a ticket's life cycle

The skill only triggers when I name the ticket manager or a ticket. It describes the work in order:

1. find the project and its statuses, then read the ticket **in full**, body and comments;
2. move the ticket to "in progress";
3. do the work, running subagents in parallel when there are several tickets;
4. commit with the ticket reference in the message;
5. move the ticket to the next status and add a comment summarising what was done and how to check it.

One rule matters more than the others: subagents write code but touch **neither git nor statuses**. The main agent
reviews their work, commits and moves the tickets, so that two agents never push or change a status at the same time.

## Mods: the ticket stays in view

Mods are small plugins that add interface to Claude Code. They are written in TypeScript (TSX), hook into Claude Code
events (a tool call, a session start, a clock) and can show something above the prompt or open a panel. Mine live
with the skills, in the same versioned folder.

- **The ticket banner.** It watches the agent's tool calls; as soon as a CLI command is about a ticket (reading,
  updating, commenting on it), it remembers that ticket and shows it above the prompt with its reference, its
  coloured status and its title, refreshed every two minutes. I always know what the agent is working on.
- **The dashboard.** A `/zorg-dashboard` command opens a panel with a project's tickets grouped by status. The project
  is guessed from the current folder and can be changed from the keyboard.

Both mods only call the CLI: they see exactly what the agent sees.
