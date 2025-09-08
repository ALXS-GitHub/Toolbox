---
origin: installed
category: documents
url: https://quarkdown.com/
location: ~/scoop/shims/quarkdown.cmd
description: A modern Markdown enhancer and document processor
use_state: testing
os: Windows
sidebar_custom_props:
    image: /images/quarkdown.png
---

# Quarkdown

**[Quarkdown](https://quarkdown.com/)** is a modern, Markdown‑based typesetting system that extends CommonMark/GFM with scripting, layout primitives, and targets for print and interactive presentations. It compiles a project into HTML or PDF (paged output) and aims to let authors move from idea to paper or slides with minimal friction while retaining the readability of Markdown source.

## Why use it

Quarkdown is useful when you need more than lightweight Markdown: complex page layouts, templates, programmatic content (loops, conditionals, functions), and multi‑file projects (books, lecture notes, slide decks). It provides a richer standard library, live preview, and compilation options that produce print‑ready pages or web slides without stitching together multiple tools.

## Installation (Windows)

Quarkdown is available via Scoop (there’s an official scoop bucket). Example:
```powershell
scoop bucket add quarkdown https://github.com/quarkdown-labs/scoop-quarkdown
scoop install quarkdown
```

You can also follow the project docs and releases at the GitHub repo: https://github.com/iamgio/quarkdown and https://quarkdown.com/docs.

## Quick usage

Create a project scaffold with `quarkdown create <dir>`, or compile a source file with `quarkdown c file.qd`. Use `-p -w` for preview + watch (live reload) and `--pdf` to export PDF. The CLI also offers `quarkdown repl` for interactive experimentation and options to control output directory, renderer, and rendering flags.

## Comparison to Markdown

Quarkdown is a superset of Markdown: where Markdown focuses on simple, readable markup for documents and web content, Quarkdown adds a Turing‑complete extension language, layout builders, and export targets (paged PDF, reveal.js slides) so the same source can become a book, an article, or an interactive presentation. If you want minimal prose formatting, plain Markdown is better; if you need programmatic content, precise page control, or integrated slide export, Quarkdown is designed for that use case.

## Summary

That’s a compact summary, for deeper CLI options and examples consult the official docs and the project README.