# The home-page film

A 56-second loop rendered frame by frame from code: one continuous 3D world (Three.js), interfaces
painted on canvases from the real apps' design tokens, an original score and interface sounds
synthesized in Python. All data shown is fictional.

- `STORYBOARD.md`: logline and shots, second by second.
- `ANIMATION_GUIDE.md`: palette, type, motion rules, banned looks.
- `style_guide.md`: the apps' real tokens and components (Zorg, CortX, Claude Code, claude.ai, 1Password).

## Layout

| Path | What |
|---|---|
| `index.html`, `src/main.js` | the page Playwright drives; `window.seekFrame(f)` paints frame *f* |
| `src/timeline.js` | every moment of the film, shared by the picture, the sounds and the captions |
| `src/engine/` | springs and splines (`motion.js`), canvas helpers, screens, post-processing |
| `src/ui/` | the interfaces: claude.ai, Zorg, CortX and Claude Code, 1Password, document, diagram |
| `src/stations/`, `src/film.js`, `src/layout.js` | the world, the choreography and the camera (16:9 and 9:16) |
| `audio/music.py`, `audio/sfx.py`, `audio/mix.py` | score, interface sounds, mix at -14 LUFS |
| `audio/beats.py` | measures a supplied track (librosa) to resynchronize the film on it |
| `render.mjs`, `tools/` | renderer, web encodes, critique sheets |

## Render

```sh
npm i && npx playwright install chromium
node tools/export.mjs                      # cues, beat grid, caption windows
uv run audio/music.py
uv run audio/sfx.py fr && uv run audio/mix.py fr
node render.mjs --lang fr --aspect land    # 2560 × 1440 (9:16: 1080 × 1920), supersampled, 60 fps, segments of 4 s
node render.mjs --lang fr --aspect land --only 12,13   # re-render only these seconds
node tools/critique.mjs fr-land 36         # contact sheet, 360 px phone test, loop seam, strips
node tools/encode.mjs fr-land              # AV1 WebM, H.264 MP4 (1440p and 1080p for 16:9) and poster into frontend/static/video
node tools/determinism.mjs                 # the same frame rendered twice has the same hash
uv run tools/flicker.py out/master-fr-land.mp4   # no flash, no shimmer (WCAG 2.3.1, per 8 × 8 zone)
```

To use a track made elsewhere instead of the synthesized score: `uv run audio/beats.py song.wav --check audio/beats.json`
tells how far its beats are from the film's grid (120 BPM); then `uv run audio/mix.py fr song.wav`.
