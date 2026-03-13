---
origin: installed
category: dev
url: https://ffmpeg.org/
description: Multimedia framework for audio/video processing
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/ffmpeg.png
---

# FFmpeg

FFmpeg is the universal media converter. If a file contains audio or video, FFmpeg can read it, convert it, cut it, resize it, or transform it into something else entirely. Tools like OBS, VLC, and YouTube all use FFmpeg under the hood -- learning it directly gives you that same power on the command line.

```powershell
scoop install ffmpeg
ffmpeg -version
```

The sections below are organized by task. Each one solves a specific problem you are likely to run into.

## Quick format conversion

The simplest thing FFmpeg does is convert one format to another. Point it at an input file and give the output a different extension:

```powershell
ffmpeg -i input.mkv output.mp4
ffmpeg -i input.wav output.mp3
```

FFmpeg infers the codecs from the file extensions and handles the rest. If you need a specific codec, say H.264 for maximum compatibility, specify it explicitly:

```powershell
ffmpeg -i input.mov -c:v libx264 output.mp4
```

## Extracting audio

When you just need the audio track from a video, tell FFmpeg to drop the video stream with `-vn`. If the audio is already in the format you want, copy it directly to avoid any quality loss:

```powershell
ffmpeg -i video.mp4 -vn -acodec copy audio.aac
```

If you need it as an MP3 instead, leave out the copy flag and FFmpeg will re-encode:

```powershell
ffmpeg -i video.mp4 -vn audio.mp3
```

## Cutting clips

To extract a segment from a longer video, specify a start time and an end time. Adding `-c copy` makes this nearly instant because FFmpeg copies the data without re-encoding:

```powershell
ffmpeg -i input.mp4 -ss 00:01:30 -to 00:03:00 -c copy clip.mp4
```

The `-ss` flag sets the start, `-to` sets the end. You can also use `-t` instead of `-to` to specify a duration rather than an absolute timestamp.

## Resizing video

The `-vf` flag applies video filters, and `scale` is the one you will reach for most often:

```powershell
ffmpeg -i input.mp4 -vf "scale=1280:720" output.mp4
```

Use `-1` for either dimension to let FFmpeg calculate it automatically while preserving the aspect ratio, like `scale=1280:-1`.

## Making GIFs

Converting a video clip into a GIF is a single command. Lower the frame rate and resolution to keep the file size reasonable:

```powershell
ffmpeg -i input.mp4 -vf "fps=15,scale=480:-1" -loop 0 output.gif
```

The `-loop 0` flag makes the GIF loop forever. Adjust `fps` and `scale` to trade off between quality and file size.

## Joining files

To concatenate multiple files, create a text file listing them:

```
file 'part1.mp4'
file 'part2.mp4'
```

Then pass it to FFmpeg with the concat demuxer:

```powershell
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

This works without re-encoding as long as all parts share the same codec and resolution.

## Inspecting media

Before you process a file, you often want to know what is inside it. `ffprobe` ships alongside FFmpeg and prints codec details, bitrate, resolution, duration, and more:

```powershell
ffprobe input.mp4
```

## Understanding the flags

The most important concept in FFmpeg is the difference between **copying** and **re-encoding**. When you pass `-c copy` (or its longer forms `-c:v copy` and `-c:a copy`), FFmpeg transfers the compressed data directly from input to output without touching it. This is fast and completely lossless, but it only works when the source format is compatible with the output container. If you need to change the codec, resize, or apply filters, FFmpeg must re-encode, which takes longer and introduces a generation of compression.

For re-encoding video, the **CRF** (Constant Rate Factor) flag controls the quality-to-size tradeoff. Lower values mean higher quality and larger files. For H.264, a CRF of 18 is visually lossless to most people, 23 is the default, and anything above 28 starts to look noticeably degraded. Pair CRF with a preset to control encoding speed: `-crf 18 -preset slow` produces excellent quality at the cost of encoding time, while `-preset ultrafast` finishes quickly but at a larger file size for the same CRF. Finding the right combination for your use case is the core skill of working with FFmpeg.
