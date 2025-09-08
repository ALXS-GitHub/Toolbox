---
origin: installed
category: dev
url: https://ohmyposh.dev/
description: A prompt theme engine for any shell
use_state: active
rating: 5
os: Windows
sidebar_custom_props:
    image: /images/oh_my_posh.png
---

# Oh My Posh

Oh My Posh is a fast, theme‑able prompt engine that enriches your shell (PowerShell, Bash, Zsh, Warp, etc.) with contextual segments like Git status, runtime versions, execution time, and more, rendered in a visually appealing, Unicode/NERD font aware layout. It lets you compose or tweak JSON/YAML based themes so your prompt surfaces exactly the information you care about while staying minimal when idle.

I use it primarily inside PowerShell. You can find more details about my PowerShell Config here: [PowerShell Config](/docs/dev/configs/powershell_config).

## Installation

Windows installation instructions are straightforward and documented at the official site: https://ohmyposh.dev/docs/installation/windows (multiple options: winget, scoop, manual). Pick the package manager you already use; after install the `oh-my-posh` executable becomes available in your PATH.

## Configuration

Configuration (themes, segments, environment variables, transient prompt, etc.) is already thoroughly covered in the official docs: https://ohmyposh.dev/. Rather than duplicating that material here, consult their guides to select or build a theme, then reference it from your PowerShell profile (e.g. calling `oh-my-posh init pwsh --config <path>` during shell startup). That’s essentially all you need: install, place a theme file (or pick a built‑in one), initialize in your profile, and enjoy an informative prompt.

Also, using a [Nerd Font](https://www.nerdfonts.com/) is recommended for the best visual experience, as it provides the necessary glyphs for the prompt segments. I personally use the [`Hack Nerd Font`](https://www.nerdfonts.com/font-downloads).
