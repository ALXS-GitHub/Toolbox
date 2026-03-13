---
origin: installed
category: desktop
url: https://www.autohotkey.com/
description: Scripting language for Windows automation and hotkeys
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/autohotkey.png
---

# AutoHotkey

Your keyboard, your rules. **[AutoHotkey](https://www.autohotkey.com/)** is a scripting language that lets you bend Windows to your will -- remap keys, fire off macros, automate tedious workflows, and build entire utilities from a plain text file. If you've ever thought "I wish pressing this key did something else," AHK is the answer.

The best way to understand what AutoHotkey can do is to see it in action. Here is a hotkey that opens Notepad when you press Win+N:

```ahk
#n::Run "notepad.exe"
```

One line. That's a complete, working script. The `#` symbol represents the Windows key, `n` is the letter, and `Run` launches a program. You can assign virtually any key combination to any action.

## Text expansion and hotstrings

AutoHotkey can watch what you type and replace abbreviations on the fly. These are called hotstrings, and they work everywhere in Windows:

```ahk
::@@::myemail@example.com
::btw::by the way
```

Type `@@` followed by a space and your email appears. This alone makes AHK worth installing for anyone who types repetitive text -- support replies, code snippets, addresses, signatures.

## Window manipulation

You can control windows programmatically. This one-liner toggles "always on top" for the active window with Ctrl+Space:

```ahk
^Space::WinSetAlwaysOnTop -1, "A"
```

Beyond pinning windows, you can move them to specific positions, resize them to exact dimensions, minimize everything except the current app, or cycle through windows matching a title pattern. AHK effectively gives you a scriptable window manager on top of Windows.

## The scripting language underneath

Behind the simple hotkey syntax is a full programming language with variables, loops, conditionals, functions, objects, and even GUI creation. You can build input dialogs, system tray menus, file management tools, or web scrapers. The ceiling is remarkably high for what started as a hotkey tool.

## A note on v1 vs. v2

AutoHotkey v2.0 is the current, recommended version. It is a significant rewrite with cleaner syntax and better consistency, but it is not backward-compatible with v1 scripts. All the examples on this page use v2 syntax. If you encounter old scripts online, they will likely need conversion. Adding `#Requires AutoHotkey v2.0` at the top of your scripts ensures they run with the correct interpreter.

## Running scripts

Scripts are plain `.ahk` text files. Right-click one and select "Run Script" to execute it, or compile it into a standalone `.exe` that runs without AutoHotkey installed. The [official v2 documentation](https://www.autohotkey.com/docs/v2/) is thorough and example-rich -- it is genuinely one of the best references for any scripting tool.
