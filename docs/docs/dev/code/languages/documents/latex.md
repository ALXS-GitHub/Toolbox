---
origin: installed
category: documents
url: https://www.latex-project.org/
location: C:/texlive/2022/bin/win32/latex.exe
description: A document preparation system for high-quality typesetting
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/latex.png
---

# LaTeX

**[LaTeX](https://www.latex-project.org/)** is a high-quality document preparation system and markup language designed for producing technical and scientific documents. Instead of WYSIWYG formatting, you write semantic source (sections, figures, equations, citations) and compile to PDF; this approach yields consistent, publication‑quality typography and precise control over complex layouts, automatic numbering, bibliographies, and mathematical typesetting.

On Windows there are two common distributions: MiKTeX (which can install packages on demand) and TeX Live (a larger bundled distribution). I use [TeX Live](https://www.tug.org/texlive/), which provides the `latex.exe` binary and a comprehensive set of packages. For installers and full platform instructions see the TeX Live page: https://www.tug.org/texlive/.

That’s all this page needs, for editors and workflows I generally use a dedicated LaTeX editor like [Overleaf](https://fr.overleaf.com/) or VS Code with LaTeX extensions, but the core is: write `.tex`, compile with the distribution tools, and produce PDFs suitable for publication.