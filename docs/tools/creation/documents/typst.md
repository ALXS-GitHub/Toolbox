---
description: "Documents laid out with a simple language, compiled instantly."
url: "https://typst.app/"
status: active
kind: language
image: typst.png
---

# Typst

Typst is a document layout language, designed as a modern successor to LaTeX: Markdown-like syntax for text, a real
programming language for templates, and compilation so fast that the preview updates as you type.

## How I use it

I write it in [VS Code](/tools/dev/editors/vscode) with the **tinymist** extension, which bundles the compiler, shows the
preview next to the code and exports to PDF: nothing else to install. I use it for documents that must look good in
print — CVs, reports, sheets — where LaTeX used to take hours of tweaking.

```typst
#set page(margin: 2cm)
#set text(font: "Inter", lang: "en")

= Title
Text in *bold*, maths $a^2 + b^2 = c^2$, and a loop:
#for x in (1, 2, 3) [- item #x]
```

## What it replaces

[LaTeX](/archive/creation/latex) and [Quarkdown](/archive/creation/quarkdown), both in the archive.
