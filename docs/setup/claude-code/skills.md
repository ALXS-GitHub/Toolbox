---
sidebar_position: 5
description: The skills I use, what they produce, and how they know when to trigger.
---

# Skills

A skill is a folder: a `SKILL.md` file that says what it is for and how to go about it, and next to it the scripts,
templates and examples it needs. Claude Code only reads each skill's *description* up front; it loads the rest only
when a request matches. That is what makes it possible to have many of them without cluttering every session.

## The catalogue

My skills fall into two families: those that produce polished files, and those that drive a tool on the machine.

| Skill | Triggers when… | Produces |
|---|---|---|
| `documents` | I ask for a document, a report, a note, minutes or a PDF | a Word-like written document: cover page, table of contents, numbered sections, figures; HTML and A4 PDF |
| `diagrams` | I ask for a diagram, or on its own as soon as four or more things are connected | an architecture or process diagram, standalone HTML and PNG, light and dark |
| `doc-site` | I ask for a small multi-page documentation | a doc with a sidebar, search and dark mode, in one or several HTML files |
| `pages` | I ask for it explicitly, and only then | a visual, interactive page to explain or compare something |
| tickets | I name my ticket manager ([Zorg](/projects/zorg)) or a ticket | the full ticket cycle: reading, coding, commit, status, comment (see [Tickets and mods](/setup/claude-code/tickets)) |
| browser | a website has to be used on my behalf | actions in [Chrome](/tools/web/browsers/chrome), driven by a CLI (see [The browser](/setup/claude-code/browser)) |

The first four share the same design and rendering pipeline, described in
[The document pipeline](/setup/claude-code/design). The last two depend on CLIs installed on the machine: they stay
local and are not sent to claude.ai.

## Read, browse, consult

Three of the production skills look alike, and the risk is that the agent picks the wrong one. The boundary fits in
three verbs: a **document** is *read* from start to finish, a **page** is *browsed* on screen, a **doc** is
*consulted* piece by piece. A forty-page document is still a document; a one-page doc has no reason to exist.

## Writing a good description

Everything hinges on the description, since it is the only thing the agent sees before choosing. Mine say three
things: what the skill produces, the words that should trigger it, and above all **when not to use it**. The `pages`
skill, for instance, used to trigger as soon as I asked for a web page or an artifact; its description now says it is
only used on explicit request, and points the other cases to the right tool. The tickets skill only triggers when I
name the ticket manager, so it does not barge into a conversation where the word "ticket" comes up by chance.

When in doubt between two skills, the instruction is to ask before starting: a question costs less than a ten-page
document in the wrong format.

## Global skills and project skills

My skills live in Claude Code's folder and are available everywhere. A project can also have its own, in its own
`.claude/skills/` folder, when they only make sense there. A project skill takes precedence over a global skill with
the same name.
