---
origin: installed
category: desktop
url: https://www.gimp.org/
description: Open-source image editor
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/gimp.png
---

# GIMP

**[GIMP](https://www.gimp.org/)** (GNU Image Manipulation Program) is the most capable free image editor available. It is often called "the free Photoshop," which is both fair and slightly misleading -- it handles many of the same tasks, but its interface, workflow, and philosophy are its own. With the release of GIMP 3.0, built on GTK3 with improved HiDPI support and steps toward non-destructive editing, the gap has narrowed considerably.

## Photo Editing

This is where GIMP is strongest. Color correction, levels and curves, sharpening, noise reduction, lens distortion correction, clone and heal brushing -- the full toolkit is there. You can work with ICC color profiles for accurate reproduction across displays and print. For batch operations, the built-in Script-Fu console (Filters > Script-Fu Console) or Python-Fu lets you automate repetitive tasks like resizing, watermarking, or format conversion across hundreds of files.

The keyboard shortcuts reflect GIMP's editing focus: `Shift+O` for the color picker, `Shift+Ctrl+E` to export, and `/` to quick-search for any tool, filter, or action you cannot remember the shortcut for.

## Graphic Design

GIMP handles icons, UI mockups, logos, and illustrations through layer-based editing with blend modes, masks, and channels. Path tools give you vector-compatible drawing for crisp shapes at any resolution, and the text tool has improved substantially in 3.0. That said, for heavy vector work, you are better off pairing GIMP with **Inkscape** -- they complement each other well, and GIMP imports SVG natively.

## Extending GIMP

The plugin and scripting ecosystem is one of GIMP's real advantages. Scripts can be written in Script-Fu (a Scheme dialect), Python, C, C++, or Perl. But the single most impactful addition is the **[G'MIC](https://gmic.eu/)** plugin, which adds hundreds of filters and effects -- film emulation, inpainting, detail enhancement, artistic styles -- that dramatically expand what GIMP can do out of the box.

GIMP reads and writes PSD, TIFF, PNG, JPEG, WebP, SVG, PDF, and many more formats natively, so interoperability with Photoshop workflows is generally smooth.

## Where It Falls Short

GIMP is not Photoshop in every respect. Non-destructive editing (adjustment layers, smart objects) is still limited compared to Photoshop or even Affinity Photo. CMYK support is partial. The interface, while much improved in 3.0, can still feel less polished. If you need professional print production or advanced compositing with non-destructive stacks, you may hit walls. For everything else -- photo editing, web graphics, scripting-heavy workflows, quick design tasks -- GIMP delivers.

## Installation

Download from [gimp.org](https://www.gimp.org/downloads/). Available for Windows, macOS, and Linux. For desktop publishing alongside GIMP, consider **Scribus**.
