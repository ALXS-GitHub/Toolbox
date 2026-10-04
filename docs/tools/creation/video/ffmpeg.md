---
description: "Convert, cut, compress any audio or video file, on the command line."
url: "https://ffmpeg.org/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: ffmpeg.png
sidebar_position: 1
---

# FFmpeg

FFmpeg reads and writes just about every audio and video format. It has no interface: everything happens on the command
line, which makes it the ideal tool for scripts — and for agents. Many programs, including
[yt-dlp](/tools/dev/cli/small-tools) and [OBS](/tools/creation/video/obs-studio), rely on it.

## How I use it

I do not learn its options by heart: I describe what I want to [Claude Code](/tools/ai/coding/claude-code), which writes
the command. The needs are always the same:

```bash
ffmpeg -i video.mov -c:v libx264 -crf 23 video.mp4      # convert and compress
ffmpeg -ss 00:01:00 -to 00:01:30 -i in.mp4 -c copy out.mp4   # cut without re-encoding
ffmpeg -i video.mp4 -vn -c:a libmp3lame audio.mp3       # extract the audio
ffmpeg -i in.mp4 -vf "fps=15,scale=640:-1" anim.gif     # make a GIF
```

It is installed with [Scoop](/tools/dev/terminal/scoop), in its full build.
