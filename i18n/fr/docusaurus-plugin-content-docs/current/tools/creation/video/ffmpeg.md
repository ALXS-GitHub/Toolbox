---
description: "Convertir, couper, compresser n'importe quel fichier audio ou vidéo, en ligne de commande."
url: "https://ffmpeg.org/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: ffmpeg.png
sidebar_position: 1
---

# FFmpeg

FFmpeg lit et écrit à peu près tous les formats audio et vidéo. Il n'a pas d'interface : tout se fait en ligne de
commande, ce qui en fait l'outil idéal pour les scripts — et pour les agents. Beaucoup de logiciels, dont
[yt-dlp](/tools/dev/cli/small-tools) et [OBS](/tools/creation/video/obs-studio), s'appuient d'ailleurs sur lui.

## Mon usage

Je n'apprends pas ses options par cœur : je décris ce que je veux à [Claude Code](/tools/ai/coding/claude-code), qui
écrit la commande. Les besoins reviennent toujours aux mêmes :

```bash
ffmpeg -i video.mov -c:v libx264 -crf 23 video.mp4      # convertir et compresser
ffmpeg -ss 00:01:00 -to 00:01:30 -i in.mp4 -c copy out.mp4   # couper sans réencoder
ffmpeg -i video.mp4 -vn -c:a libmp3lame audio.mp3       # extraire l'audio
ffmpeg -i in.mp4 -vf "fps=15,scale=640:-1" anim.gif     # faire un GIF
```

Il est installé avec [Scoop](/tools/dev/terminal/scoop), dans sa version complète.
