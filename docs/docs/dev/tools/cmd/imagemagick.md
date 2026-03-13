---
origin: installed
category: dev
url: https://imagemagick.org/
description: CLI tool for image creation, editing, and conversion
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/imagemagick.png
---

# ImageMagick

**[ImageMagick](https://imagemagick.org/)** is the Swiss Army knife of image manipulation on the command line. It supports over 200 formats -- PNG, JPEG, WebP, SVG, PDF, TIFF, GIF, HEIC, AVIF, and many more -- and can do just about anything you would open a graphical editor for: convert, resize, crop, annotate, composite, and batch-process, all from a single `magick` command.

If you're on version 7 (which you should be), all subcommands live under the `magick` prefix. Older guides may reference standalone `convert`, `mogrify`, or `identify` commands -- those are v6 syntax and are deprecated. On v7, just prefix everything with `magick`.

## Installation

Download from [imagemagick.org](https://imagemagick.org/script/download.php) and make sure the installer adds it to your PATH. Verify with:

```powershell
magick --version
```

## I want to convert a file to another format

Just pass the input and output with the desired extension. ImageMagick infers the format from the filename:

```powershell
magick input.png output.jpg
magick input.svg output.png
magick input.webp output.png
```

Control quality with `-quality N` (1--100). Lower values mean smaller files but more compression artifacts, which matters most for JPEG and WebP:

```powershell
magick input.png -quality 80 output.jpg
```

## I want to resize images

The `-resize` flag fits the image within the given dimensions while preserving aspect ratio. Append `!` to force exact dimensions (which may distort), or use a percentage:

```powershell
magick input.png -resize 800x600 output.png
magick input.png -resize 50% output.png
magick input.png -resize 800x600! output.png
```

## I want to crop or annotate

Cropping uses the geometry syntax `WxH+X+Y`, where W and H are the crop dimensions and X, Y are the offset from the top-left corner:

```powershell
magick input.png -crop 400x300+50+100 output.png
```

For text overlays, use `-annotate` with a font size:

```powershell
magick input.png -pointsize 36 -annotate +50+50 "Hello" output.png
```

## I want to batch-process a whole folder

This is where `mogrify` comes in. Unlike the standard `magick` command which reads an input and writes to a separate output, `mogrify` operates on files in place:

```powershell
magick mogrify -format png *.jpg
magick mogrify -resize 1024x1024 *.png
```

For composites and montages, `montage` arranges multiple images into a grid:

```powershell
magick montage *.png -geometry 200x200+5+5 montage.png
```

## I want to inspect an image

`identify` prints format, dimensions, color depth, and file size. Add `-verbose` for full metadata including EXIF data, color profiles, and compression details:

```powershell
magick identify input.png
magick identify -verbose input.png
```

## A word about mogrify

Because `mogrify` modifies files in place, it is destructive by default. If you're running it on original images, always use the `-path` flag to redirect output to a different directory. This is easy to forget and impossible to undo:

```powershell
magick mogrify -resize 800x600 -path output/ *.png
```

ImageMagick combines well with [fd](/docs/dev/tools/cmd/fd) for targeted batch operations. Instead of relying on shell globs, you can find exactly the files you want and pipe them through: `fd -e jpg -x magick {} {.}.png`.
