---
origin: personal
category: dev
url: https://github.com/ALXS-GitHub/Powershell-Config
location: ~/.config/powershell
description: Powershell custom configuration
use_state: actual
os: Windows
sidebar_custom_props:
    image: /images/powershell.png
---

# Powershell Config

Here are all the custom tools for my Powershell terminal.

You can access the GitHub repository for more information here: [Powershell-Config](https://github.com/ALXS-GitHub/Powershell-Config)

## Scripts

My Powershell configuration includes a variety of useful scripts. To display the list of available scripts, you can use the following command:

```bash
myhelp
```

## Configuration

First make sure to put the content of this repository in the correct location, in the powershell config directory: `~/.config/powershell`.

Also make sure that [Oh-My-Posh](https://ohmyposh.dev/) is installed and configured correctly.

In order to use these custom scripts and themes, you first need to make sure your `Microsoft.PowerShell_profile.ps1` file is loading them correctly. This script is usually located in `~\Documents\PowerShell`, or you can find it with the `$PROFILE` variable. Make sure this script is pointing to the correct location of your custom scripts. For example, it should contain: 

```sh
. $env:USERPROFILE\.config\powershell\user_profile.ps1 # or other location
```

### Extra steps

#### Windows Terminal

If you use the [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701) application, you may want to customize the prompt colors. To do this, you need to modify the settings in the Windows Terminal application.

First, open the Windows Terminal application and navigate to the settings. You can do this by clicking on the dropdown arrow in the title bar and selecting "Settings". This will open the settings UI.

In the settings UI, you can find the option to edit the JSON file directly. Click on the "Open JSON file" button (usually located at the bottom left corner). This will open the settings.json file in your default text editor.

In the settings.json file, you can add new color themes for the prompt section. Look for the "schemes" section. Within that section, you can add or customize your color schemes.

#### Warp

For a terminal like warp, the terminal prompt colors are defined in the warp theme configuration file.

I recommend that you read my [Warp Configuration Documentation](/docs/dev/apps/warp) for more information on how to setup Warp.

## Themes

For each theme (background image, and/or use of Warp), it is recommended to create a new theme file (.omp.json) with appropriate colors for that theme. I recommend [https://coolors.co/image-picker](https://coolors.co/image-picker) which allows you to have a color palette based on an image.