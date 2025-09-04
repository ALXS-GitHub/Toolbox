---
origin: installed
category: dev
url: https://www.warp.dev/
location: ~/AppData/Roaming/warp/Warp
description: AI assisted Terminal
use_state: actual
os: Windows
rating: 5
sidebar_custom_props:
    image: /images/warp.png
---

# Warp

[Warp](https://www.warp.dev/) is a modern terminal application that rethinks the traditional command line experience by combining a graphical UI with terminal functionality. It offers a fast, GPU-accelerated interface, command autocompletion and AI-assisted suggestions, block-based command outputs that are easy to copy and share, and built-in workflows to automate multi-step tasks.

Customization includes themes and background images, and themes can be stored and managed in the user config directory so you can apply or share custom appearances. Warp also focuses on collaboration and ergonomics, providing searchable command history, a command palette, and features that simplify reproducible workflows and onboarding for teams.

## Themes

Here are the official instructions to set up custom themes for Warp: [https://docs.warp.dev/terminal/appearance/custom-themes](https://docs.warp.dev/terminal/appearance/custom-themes)

In order to set up custom themes for Warp, you need to follow these steps:

```bash
cd ~/AppData/Roaming/warp/Warp/data
git clone https://github.com/warpdotdev/themes.git
```

Themes can be easily organized into subfolders.

You can easily associate background images for the theme from the YAML config, but also specify the prompt colors (see the [docs](https://docs.warp.dev/terminal/appearance/custom-themes))

You can also create themes directly from the Warp interface `Themes > +`. However, with this method, the themes are placed directly in the `/themes` folder. I personally recommend to open the folder `~/AppData/Roaming/warp/Warp/data/themes` and putting the image and the yaml file in the `my_themes` (or other subfolder) subfolder for better organization. This theme creation method from Warp has a super nice feature of selecting custom colors for the prompt which I really like and recommend using.
Apart from the accent, foreground, and background colors, the automatic theme creation does not change the other prompt colors. You have to do it manually.

⚠️ When placing a theme in a subfolder with an associated image, don't forget to modify the YAML file to specify the subfolder path of the image (as the path is by default relative to the `/themes` folder, so change the image path to `<subfolder_name>/<image_name>` or you can also use the absolute path).

### Personal themes

My custom Warp themes can be found at the following GitHub repository: [https://github.com/ALXS-GitHub/Warp-Themes](https://github.com/ALXS-GitHub/Warp-Themes). Make sure to clone this repository at `~\AppData\Roaming\warp\Warp\data\themes`, and rename the folder as you want (e.g. `my_themes`).

I have created a theme called `half_one_dark_modded` which is a modified version of the `half_one_dark` theme that I use by default, so you can refer to this theme to create other color themes.