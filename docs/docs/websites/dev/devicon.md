---
origin: web
category: web
url: https://devicon.dev/
description: Icon set for programming languages and development tools
use_state: active
sidebar_custom_props:
    image: /images/devicon.png
---

# Devicon

**[Devicon](https://devicon.dev/)** is an open-source icon set providing 600+ icons for programming languages, frameworks, tools, and services. If you need a logo for React, Docker, Rust, AWS, or practically any other technology, Devicon likely has it in multiple styles.

## Usage

The fastest way to use Devicon is through the CDN. Add the stylesheet to your HTML `<head>`:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
```

Then use icons with `<i>` tags, specifying the technology name and style variant:

```html
<i class="devicon-react-original"></i>
<i class="devicon-typescript-plain"></i>
<i class="devicon-docker-plain colored"></i>
<i class="devicon-python-plain-wordmark colored"></i>
```

Adding the `colored` class applies the official brand colors to the icon.

## Style variants

Most icons come in several variants:

- **original** -- the full official logo as designed
- **plain** -- a simplified, single-color version
- **line** -- outline-only version
- **wordmark** -- includes the technology name below or beside the icon (e.g., `plain-wordmark`, `original-wordmark`)

Not every icon has all variants. The [Devicon website](https://devicon.dev/) lets you browse all available icons and see which styles exist for each one.

## Alternative usage

Beyond the CDN, you can also install Devicon via npm (`npm install devicon`) or download individual SVG files directly from the [GitHub repository](https://github.com/devicons/devicon/tree/master/icons). The SVG approach is useful when you need to customize icons or embed them in design tools, presentations, or documentation.
