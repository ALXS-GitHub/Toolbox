---
origin: installed
category: desktop
url: https://www.nvidia.com/fr-fr/software/nvidia-app/
description: Application for managing NVIDIA graphics settings and updates
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/nvidia_app.png
---

# NVIDIA App

The [NVIDIA App](https://www.nvidia.com/fr-fr/software/nvidia-app/) is the successor to GeForce Experience. It consolidates driver management, game optimization, and capture tools into a single interface without requiring a login to use core features. If you have an NVIDIA GPU, this is the central place to keep it up to date and get the most out of it.

## Driver updates

The app checks for new drivers and lets you install them in a few clicks. Two driver branches are available:

- **Game Ready Drivers** -- released alongside major game launches, optimized for day-one performance and stability in new titles.
- **Studio Drivers** -- tuned for creative applications like Blender, DaVinci Resolve, and Adobe Premiere Pro, with extended QA cycles for reliability in production workloads.

You can switch between branches at any time. The app also keeps a record of your currently installed driver version and offers a clean install option to remove leftover settings from previous versions.

## Performance overlay

Press **Alt+R** to bring up the in-game performance overlay. It displays real-time GPU and CPU utilization, clock speeds, temperature, frame rate, and frame time. The overlay is configurable -- you can choose which metrics to show, adjust the position on screen, and resize it. It is useful both for spotting thermal throttling and for verifying that a game is actually using the GPU you expect.

## Optimal game settings

The app scans your installed games and recommends per-game graphics settings based on your GPU model, display resolution, and available VRAM. You can apply the recommended profile with one click or use it as a starting point and tweak individual settings. This is especially handy when you install a game for the first time and want a reasonable baseline without manual trial and error.

## Screen recording and screenshots

Press **Alt+Z** to open the capture overlay. From there you can:

- **Record** gameplay footage at up to native resolution, using NVIDIA's hardware encoder (NVENC) so the performance cost stays minimal.
- **Instant Replay** -- retroactively save the last few minutes of gameplay. The app records in the background in a rolling buffer, and you save only when something interesting happens.
- **Screenshot** -- capture a still frame. On RTX cards, the app can take AI-enhanced screenshots at higher resolution than native using NVIDIA's upscaling pipeline.

## RTX and display features

The app surfaces GPU-specific capabilities: enabling or disabling RTX ray tracing features system-wide, managing G-SYNC/FreeSync settings for connected monitors, and configuring NVIDIA Reflex for low-latency rendering in supported games. These settings also exist in the NVIDIA Control Panel, but the app presents them in a more approachable layout.
