---
origin: installed
category: desktop
url: https://www.audacityteam.org/
description: Free, open-source audio editing software
use_state: active
os: Windows
sidebar_custom_props:
  image: /images/audacity.png
---

# Audacity

**[Audacity](https://www.audacityteam.org/)** is probably the first audio editor most people ever use, and for good reason. It is free, open-source, runs on every major platform, and handles the three things people actually need from an audio tool: recording, cleanup, and format conversion.

## Recording

Plug in a microphone, select it from the toolbar dropdown, press `R`, and you are recording. Audacity captures from any input device -- microphones, line-in, USB interfaces -- and supports multi-track recording so you can layer takes or record separate sources simultaneously. Timer recording and sound-activated recording are also available for hands-off capture. When you are done, hit `Space` to stop.

## Editing and cleanup

This is where Audacity earns its reputation. The noise reduction workflow alone saves hours of manual work: select a short stretch of audio that contains only background noise (no speech or music), go to Effect > Noise Reduction > Get Noise Profile, then select the entire track with `Ctrl+A` and apply Effect > Noise Reduction again. Audacity learns the noise signature and strips it from the whole recording. The result is not always perfect, but it is remarkably good for a free tool.

Beyond noise removal, the built-in effects library covers equalization, compression, reverb, echo, normalization, and many more. VST3 and Nyquist plugins extend this further, and recent versions have introduced AI-powered plugins for tasks like music separation, noise suppression, and transcription. The spectrogram view (accessible from the track dropdown menu) lets you visualize frequencies for forensic analysis or surgical editing of specific sounds.

Useful shortcuts to keep in muscle memory: `Ctrl+Z` to undo, `Ctrl+A` to select all, and `Ctrl+Shift+E` to jump straight to the export dialog.

## Format conversion

Audacity reads and writes WAV, MP3, FLAC, and Ogg Vorbis out of the box. For extended format support -- AAC, WMA, AC3, and others -- install the optional [FFmpeg library](https://manual.audacityteam.org/man/installing_ffmpeg_for_windows.html) separately. Once FFmpeg is linked, Audacity becomes a capable batch converter too: the Macros feature lets you apply effects or format conversions to entire folders of files in one pass.

Between the Nyquist scripting language for custom effects and the ever-growing plugin ecosystem, Audacity keeps finding ways to stay relevant decades after its first release.
