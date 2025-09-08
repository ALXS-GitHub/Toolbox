---
origin: installed
category: documents
url: https://typst.app/home/
location: ~/AppData/Local/Microsoft/WinGet/Packages
description: A modern markup-based document preparation system
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/typst.png
---

# Typst

**[Typst](https://typst.app/)** is a modern markup‑based document preparation system written in Rust. It focuses on intuitive, readable source syntax and fast, deterministic rendering, while offering powerful layout primitives and programmatic customization. Typst aims to combine the expressiveness and precision of systems like LaTeX with a more ergonomic authoring experience.

Typst supports detailed document arrangement: grids, flexible columns, precise box/layout control, custom styles, macros (written in Typst's own language), and template composition. Styling and typography are first‑class: you can control fonts, spacing, color, and micro‑typography with concise declarations. Because Typst is implemented in Rust, it benefits from fast compilation and robust binary releases across platforms.

## Comparison to LaTeX and Markdown

Compared to LaTeX, Typst trades extreme legacy compatibility and an enormous package ecosystem for a simpler, more consistent syntax and quicker iteration. Where LaTeX exposes deep macro power and decades of packages, Typst prefers a smaller, more composable standard library and clearer semantics that reduce surprising macro interactions. Compared to Markdown, Typst is a full document system: it offers page layout, numbering, cross‑references, bibliographies, and precise typographic control that Markdown doesn’t aim to provide, Markdown is for lightweight content, Typst is for designed documents.

## Installation (Windows)

Installation on Windows is straightforward using Winget:
```powershell
winget install --id Typst.Typst
```

After installation, verify by running:
```powershell
typst --version
```

## Typst Universe

Typst Universe is the community hub for packages, templates, and examples created by users; it’s a great place to find themes, reusable components, and starter templates for books, articles, resumes, or posters.

## Summary

That’s a compact summary, Typst is a good choice when you want modern syntax, fast builds, and fine control over document layout without the legacy complexity of classic TeX macros.