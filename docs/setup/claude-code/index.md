---
sidebar_position: 0
sidebar_label: Claude Code harness
description: Everything around Claude Code that turns it into my everyday assistant, and how the pieces fit together.
---

# The Claude Code harness

Out of the box, Claude Code is an agent that reads code and runs commands. What I call my *harness* is everything I
built around it: settings, instructions, skills that produce polished documents and diagrams, a few mods for the
interface, guardrails, and a way to keep all of it under version control. The whole thing fits in one folder tracked
by git, which I can set up again on a new machine in a few minutes.

This section describes the harness as it is today. It is deliberately generic: accounts, paths and identifiers are
replaced by their role, so that anyone can borrow ideas without copying anything personal.

## The pieces and how they connect

The diagram below shows what Claude Code loads, what it drives on the machine, and where the configuration files go.

<Diagram
  name="harness-overview"
  alt="Claude Code loads the settings and instructions, calls the skills and mods, drives Chrome and command-line tools; the configuration is pushed to a private git repository and skills are imported into claude.ai."
/>

Claude Code sits in the middle. When a session starts, it loads two things: the **settings** (`settings.json`:
model, effort level, language, status line, denied connectors…) and the **instructions**, meaning the `CLAUDE.md`
files, global and per project, plus the memory it keeps from one session to the next. The **status line** is a small
script: Claude Code hands it the session state as JSON, and it prints two lines with the folder, the branch, the
context used, the quotas and the cost.

During the session, Claude Code relies on **skills**: folders of instructions and scripts that it loads when a request
matches their description. Mine produce written documents, diagrams, small documentation sites and visual pages, and
drive two command-line tools, my ticket manager and a browser. The production skills share a **common design**
(colours, light and dark themes, components) and use Python and a headless Chrome to produce HTML, PDF and PNG files.
Next to them, **mods** add interface to the terminal: a banner with the ticket in progress, and a dashboard of a
project's tickets.

All the configuration lives in a private git repository. Every commit goes through a leak-detection hook and is
signed. Skills that are useful outside the terminal are exported as zip files and imported into claude.ai by hand:
git stays the single source.

## Principles

A few choices drive the whole setup; they come back on every page of this section.

**Git is the source of truth.** The configuration is versioned inside Claude Code's own folder, with an allow-list
`.gitignore`: everything is ignored unless it is explicitly allowed. History, transcripts, credentials and caches
therefore cannot leave by mistake. Whatever lives elsewhere, on claude.ai or in the memories, is either a copy or
deliberately local.

**Command-line tools first.** When a service has a CLI designed to be driven, with `--json` output and help written
for agents, Claude Code uses it better and more directly than an MCP connector. The claude.ai connectors that duplicate
a CLI are therefore denied in the terminal; those with no local equivalent, such as mail or the calendar, stay
available.

**Polished, checked results.** Skills do not just give instructions to the agent: their scripts inject the design,
check the result (contrast, overflow, share of written prose) and refuse to finish while a problem remains. A document
or a diagram looks the same from one time to the next.

**Guardrails rather than vigilance.** The rules that matter do not rely on my attention or the agent's: tools enforce
them. A hook before every commit, mandatory signing, an allow-list, and skill descriptions that also say when *not* to
trigger.

## What is versioned, and what is not

The split follows a simple rule: version what you wrote yourself and would want back on another machine; everything
Claude Code produces or downloads stays local.

| Versioned | Stays on the machine |
|---|---|
| `settings.json` and the global `CLAUDE.md` | credentials and session |
| status line and maintenance scripts | history, transcripts, memory |
| skills, mods and the common design | caches, plugins, temporary files |
| leak-detection hook and setup script | secrets, in environment variables |

Secrets never belong in the repository, even a private one: the hook actually rejects the `settings.json` keys meant
to hold them.

## An end-to-end example

When I ask "write me a report on this topic, as a PDF", the description of the `documents` skill matches. Claude Code
loads it, reads the report template and an example, gathers the facts, then writes the document in HTML. The skill's
script injects the common design, numbers the sections, builds the table of contents, checks that there is real prose
and not only tables, then calls Chrome to produce the PDF. If a diagram is needed, the `diagrams` skill draws it and the
document includes it as a figure. I get a file that opens offline, with the same layout as the previous ones.
