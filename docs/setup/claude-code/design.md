---
sidebar_position: 6
description: One common design, defined once, for every document, page, doc and diagram.
image: icons/palette.svg
---

# The document pipeline

The four production skills (`documents`, `pages`, `doc-site` and `diagrams`) share one design: the same colours, the
same font, the same callouts and tables, in light and dark mode. That design is defined in a single place, a
`_design` folder, then copied into each skill. This page explains why it is copied, how, and what the scripts check
along the way.

<Diagram
  name="harness-design"
  alt="The common design's variables, themes and components go through build.py, which copies them into the four skills; each skill's script injects the design and a headless browser produces the HTML, PDF and PNG."
/>

## One source, several copies

It would be simpler for each skill to read the design straight from `_design`. That is impossible on claude.ai: a
skill there is an isolated folder that cannot see another one's files. Each skill therefore ships **its own copy** of
the design, and `_design` is not a skill: it is never sent anywhere.

So that the copies do not drift apart, they are never edited by hand. They carry a "generated, do not edit" header,
and the only way to change them is to edit the source and run `build.py` again.

## What the design contains

| File | Role |
|---|---|
| `variables.json` | the contract: every variable (colours, fonts, radii…) with its purpose and its light and dark value; it also carries the design version |
| `themes/*.json` | a theme only holds what it changes compared with the contract |
| `components.css` | the common components (callouts, tables, steps, cards…), written with variables only |
| `components.md` | the catalogue of those components with their exact HTML: this is what the agent reads |
| font and tools | Inter, embedded in every file, and a few shared Python functions (injection, browser rendering, captures) |

Since components only use variables, a theme or dark mode changes everything at once. Any block can even switch theme
locally with a `data-theme` attribute.

## build.py checks, then copies

The build script computes the full values of each theme, generates the stylesheet, then checks before copying:

- text **contrast** on its backgrounds, in light and dark mode (at least 4.5:1);
- no **hard-coded colour** in the components;
- no **unknown variable** in a theme.

With `--check`, it changes nothing and only reports outdated copies.

## Rendering, checked as well

Each skill has its rendering script. It injects the design into the output file (which becomes standalone and opens
offline), adds what is specific to the skill (numbering and table of contents for a document, search and navigation
for a doc), then opens the result in a headless browser (Chrome, Edge or another Chromium) to check and export it. The checks cover form and substance:
nothing overflows, no diagram link runs diagonally, and a document must contain real prose (a document section that
only stacks tables is rejected). As long as something remains to fix, the script says so and the agent tries again.

## Two maintenance rules

Never edit a copy, always the source; and never rename a variable or a component, since files already produced use
them. You add, you do not remove. The full loop after a change is described in
[Maintenance](/setup/claude-code/maintenance).
