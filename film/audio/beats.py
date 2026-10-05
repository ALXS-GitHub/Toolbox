# /// script
# requires-python = ">=3.11,<3.14"
# dependencies = ["librosa>=0.10", "numpy>=1.26", "soundfile>=0.12"]
# ///
"""Measures tempo, beats, downbeats and onset peaks of a track (for example one made with Suno),
so the film can be resynchronized on it, or to check the synthesized score against the grid.

    uv run audio/beats.py audio/out/music.wav > audio/measured.json
    uv run audio/beats.py song.wav --check audio/beats.json
"""
import json
import sys
import librosa
import numpy as np


def measure(path):
    y, sr = librosa.load(path, sr=None, mono=True)
    tempo, frames = librosa.beat.beat_track(y=y, sr=sr, units="frames", tightness=400)
    beats = librosa.frames_to_time(frames, sr=sr)
    onset = librosa.onset.onset_strength(y=y, sr=sr)
    peaks = librosa.util.peak_pick(onset, pre_max=3, post_max=3, pre_avg=3, post_avg=5, delta=0.5, wait=10)
    hits = librosa.frames_to_time(peaks, sr=sr)
    tempo = float(np.atleast_1d(tempo)[0])
    return {
        "bpm": round(tempo, 2),
        "beats": [round(float(b), 3) for b in beats],
        "downbeats": [round(float(b), 3) for b in beats[::4]],
        "hits": [round(float(h), 3) for h in hits],
    }


def check(m, grid):
    """Distance of every measured beat to the nearest beat of the film's grid."""
    g = np.array(grid["beats"])
    d = [float(np.min(np.abs(g - b))) for b in m["beats"]]
    return {"bpm_measured": m["bpm"], "bpm_grid": grid["bpm"], "beats": len(d), "median_ms": round(1000 * float(np.median(d)), 1), "max_ms": round(1000 * float(np.max(d)), 1)}


if __name__ == "__main__":
    m = measure(sys.argv[1])
    if "--check" in sys.argv:
        grid = json.load(open(sys.argv[sys.argv.index("--check") + 1], encoding="utf-8"))
        print(json.dumps(check(m, grid), indent=1))
    else:
        print(json.dumps(m, indent=1))
