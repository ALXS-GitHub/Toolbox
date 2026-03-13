---
origin: installed
category: desktop
url: https://obsproject.com/
description: Open-source streaming and screen recording software
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/obs_studio.png
---

# OBS Studio

**[OBS Studio](https://obsproject.com/)** is free, open-source, and the tool that virtually every streamer and screen recorder ends up using. Whether you are broadcasting live on Twitch, recording a tutorial, or capturing gameplay footage, OBS is the default choice for a reason: it is powerful, endlessly configurable, and costs nothing.

## How OBS Thinks About Video

OBS organizes everything around **scenes** and **sources**. A scene is a layout -- your webcam in the corner, a game capture filling the screen, a chat overlay on the side. Each element in that layout is a source: a display capture, a window, a camera feed, an image, a browser page, or plain text. You can create as many scenes as you need and switch between them instantly, either by clicking or by pressing a hotkey you have assigned.

Audio works through a built-in mixer that gives you per-source volume controls and filters. You can apply noise suppression to your microphone, add a noise gate so it only picks up when you speak, and adjust gain levels -- all without leaving OBS. For more advanced processing, it supports VST audio plugins.

## Recording

Add a **Display Capture** or **Window Capture** source, configure your output settings under Settings > Output (MKV is the recommended format because it survives crashes without corrupting the file), and hit **Start Recording** or press `F9`. When you are done, remux the MKV to MP4 through File > Remux Recordings if you need a more portable format.

## Streaming

Go to Settings > Stream, pick your platform (Twitch, YouTube, Kick, or a custom RTMP server), and paste your stream key. Set up your scenes, then click **Start Streaming** or press `F10`. That is genuinely all it takes for a basic setup.

## Studio Mode and Beyond

**Studio Mode** splits the interface into a preview and a live view. You can set up your next scene on the left while your audience still sees the current one on the right, then transition when ready. This is essential for any live production where you do not want viewers seeing you drag sources around.

The **plugin ecosystem** extends OBS well beyond its defaults. Community plugins add things like animated transitions, advanced scene switching logic, NDI support, and integration with StreamElements or Streamlabs. You can also write your own automation with Lua or Python scripts through the built-in scripting API.

## Installation

Download from [obsproject.com](https://obsproject.com/). Available for Windows 10/11, macOS 12.0+, and Linux.
