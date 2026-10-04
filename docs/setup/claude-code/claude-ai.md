---
sidebar_position: 7
description: Having my skills on claude.ai too, while git stays the single source.
---

# Skills on claude.ai

The production skills are useful outside the terminal too: on claude.ai, on mobile or in the desktop app, I want to
ask for a report or a diagram in the same style. The skills must therefore exist in both places, with one simple
rule: **git is the source, claude.ai is only a copy**.

<Diagram
  name="harness-claudeai"
  alt="A skill from the repository is packaged as a zip by skills.ps1, then imported into claude.ai by hand; syncing from claude.ai back to the machine is turned off."
/>

## Package, then import

There is no API to send a skill to claude.ai: it is imported by hand from a zip file, in the skills settings. The
`skills.ps1` script prepares that zip properly:

```powershell
& ~/.claude/skills.ps1 list           # the skills, and which ones stay local
& ~/.claude/skills.ps1 pack documents # creates dist/documents.zip, outside the repo
```

Before building the zip, `pack` checks what would make the import fail: the `name` field must match the folder name,
the description must not exceed 1,024 characters, and the front matter must only contain the fields claude.ai
accepts. It drops stray files (Python caches, system files), then reads the zip back to check that it holds a single
root folder with its `SKILL.md`. Without an argument, it packages every skill except those that depend on a local CLI
(tickets, browser), which are useless on claude.ai.

The loop is therefore: change the skill, commit, `pack`, then replace the old version on claude.ai.

## Why syncing is turned off

Claude Code can do the reverse: download claude.ai's skills into the local folder so that they are offered in the
terminal too. With skills that already exist locally, that creates duplicates, and two versions of the same skill
that can drift apart. So I turned that sync off (`syncClaudeAiSkills: false`): in the terminal, only the
repository's skills exist.

## Skill, document or artifact on claude.ai

On claude.ai, other tools compete with skills: artifacts (published web pages) and built-in documents. So that Claude
picks the right one, the simplest is to repeat in the claude.ai preferences the rule used in the terminal: a document,
a diagram or a small doc in my style goes through the matching skill; an artifact only on request.
