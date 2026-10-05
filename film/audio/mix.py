# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy>=2", "scipy>=1.13"]
# ///
"""Mixes the music and the interface sounds, then normalizes to -14 LUFS (true peak -1.5 dBTP).

    uv run audio/mix.py fr [music.wav]   -> audio/out/mix-fr.wav
A supplied track (for example from Suno) can replace the synthesized music: pass its path.
"""
import json
import os
import subprocess
import sys
import numpy as np
from scipy.io import wavfile

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "out")
SR = 48000
N = int(SR * 56.0)


def load(p):
    sr, a = wavfile.read(p)
    assert sr == SR, f"{p}: {sr} Hz, expected {SR}"
    a = a.astype(np.float32)
    if a.ndim == 1:
        a = np.stack([a, a], 1)
    if len(a) < N:
        a = np.concatenate([a, np.zeros((N - len(a), 2), np.float32)])
    return a[:N]


def main():
    lang = sys.argv[1] if len(sys.argv) > 1 else "fr"
    music = load(sys.argv[2] if len(sys.argv) > 2 else os.path.join(OUT, "music.wav"))
    sfx = load(os.path.join(OUT, f"sfx-{lang}.wav"))
    mix = music * 0.82 + sfx * 0.62
    mix = np.tanh(mix * 1.1) / 1.1
    raw = os.path.join(OUT, f"raw-{lang}.wav")
    wavfile.write(raw, SR, mix.astype(np.float32))
    # two-pass loudnorm
    target = "I=-14:TP=-1.5:LRA=11"
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", raw, "-af", f"loudnorm={target}:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    js = r.stderr[r.stderr.rindex("{"): r.stderr.rindex("}") + 1]
    m = json.loads(js)
    af = f"loudnorm={target}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
    out = os.path.join(OUT, f"mix-{lang}.wav")
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", raw, "-af", af, "-ar", str(SR), "-c:a", "pcm_f32le", out], check=True)
    os.remove(raw)
    print(out, "measured", m["input_i"], "LUFS")


if __name__ == "__main__":
    main()
