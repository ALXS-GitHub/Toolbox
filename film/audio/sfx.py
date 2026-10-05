# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy>=2", "scipy>=1.13"]
# ///
"""Interface sounds, synthesized and placed on the cues exported from src/timeline.js.

    uv run audio/sfx.py fr        -> audio/out/sfx-fr.wav
"""
import json
import os
import sys
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
DUR = 56.0
N = int(SR * DUR)
TAIL = int(SR * 3)
HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def lp(x, fc):
    return sosfilt(butter(2, min(fc, SR * 0.45), "low", fs=SR, output="sos"), x)


def hp(x, fc):
    return sosfilt(butter(2, fc, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, min(hi, SR * 0.45)], "band", fs=SR, output="sos"), x)


def tt(d):
    return np.arange(int(d * SR)) / SR


def noise(n):
    return rng.standard_normal(n)


def sine_sweep(f0, f1, d, k=20):
    t = tt(d)
    f = f1 + (f0 - f1) * np.exp(-t * k)
    return np.sin(2 * np.pi * np.cumsum(f) / SR)


# D minor pentatonic for the pitched cues
NOTES = [62, 65, 67, 69, 72, 74, 77, 79]


def midi(m):
    return 440 * 2 ** ((m - 69) / 12)


def voice(name):
    if name == "tick":
        t = tt(0.05)
        return np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 140) * 0.5 + hp(noise(len(t)), 3000) * np.exp(-t * 400) * 0.25
    if name == "key":
        t = tt(0.06)
        return bp(noise(len(t)), 1500, 6000) * np.exp(-t * 120) * 0.6 + np.sin(2 * np.pi * 180 * t) * np.exp(-t * 90) * 0.3
    if name == "enter":
        t = tt(0.12)
        return bp(noise(len(t)), 800, 5000) * np.exp(-t * 60) * 0.7 + np.sin(2 * np.pi * 120 * t) * np.exp(-t * 40) * 0.5
    if name == "click":
        t = tt(0.06)
        return np.sin(2 * np.pi * 1700 * t) * np.exp(-t * 110) * 0.6 + bp(noise(len(t)), 2000, 8000) * np.exp(-t * 300) * 0.3
    if name == "pop":
        t = tt(0.18)
        return sine_sweep(1100, 380, 0.18, 35) * np.exp(-t * 26) * 0.55
    if name == "pophi":
        t = tt(0.16)
        return sine_sweep(1800, 900, 0.16, 40) * np.exp(-t * 30) * 0.45
    if name == "bloop":
        t = tt(0.3)
        return (sine_sweep(420, 880, 0.3, 14) * 0.5 + np.sin(2 * np.pi * midi(74) * t) * 0.25) * np.exp(-t * 11)
    if name == "ding":
        t = tt(1.2)
        f = midi(81)
        return (np.sin(2 * np.pi * f * t + 1.2 * np.exp(-t * 6) * np.sin(2 * np.pi * f * 3 * t))) * np.exp(-t * 4) * 0.35
    if name.startswith("check"):
        i = int(name[-1])
        t = tt(0.35)
        f = midi([74, 77, 81][i])
        return np.sin(2 * np.pi * f * t + 0.8 * np.exp(-t * 10) * np.sin(2 * np.pi * f * 2 * t)) * np.exp(-t * 9) * 0.45
    if name.startswith("note"):
        i = int(name[-1])
        t = tt(1.0)
        f = midi(NOTES[i + 1] + 12)
        return np.sin(2 * np.pi * f * t + 1.5 * np.exp(-t * 7) * np.sin(2 * np.pi * f * 2 * t)) * np.exp(-t * 4.5) * 0.35
    if name == "shimmer":
        t = tt(1.0)
        v = sum(np.sin(2 * np.pi * midi(m + 24) * t + k) for k, m in enumerate([62, 69, 74, 77]))
        return v * np.exp(-t * 3.5) * np.minimum(1, t / 0.02) * 0.12
    if name in ("whoosh", "rise"):
        d = 0.6 if name == "whoosh" else 0.9
        t = tt(d)
        x = noise(len(t))
        env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** (1.5 if name == "whoosh" else 2.5)
        if name == "rise":
            env = (t / d) ** 2 * np.exp(-np.maximum(0, t - d * 0.85) * 30)
        u = t / d
        v = bp(x, 250, 1200) * (1 - u) + bp(x, 1400, 7000) * u
        return v * env * 0.35
    if name == "scan":
        t = tt(1.6)
        return (bp(noise(len(t)), 2000, 9000) * 0.25 + np.sin(2 * np.pi * (300 + 600 * t) * t) * 0.08) * np.sin(np.pi * t / 1.6) ** 2
    if name == "thump":
        t = tt(0.6)
        return np.tanh(sine_sweep(140, 42, 0.6, 18) * np.exp(-t * 7) * 1.6)
    if name == "impact":
        t = tt(1.4)
        return np.tanh((sine_sweep(110, 32, 1.4, 10) * np.exp(-t * 3.0) + lp(noise(len(t)), 3000) * np.exp(-t * 9) * 0.4) * 1.5)
    if name == "hit":
        t = tt(0.8)
        return np.tanh((sine_sweep(160, 48, 0.8, 16) * np.exp(-t * 5) + bp(noise(len(t)), 1500, 7000) * np.exp(-t * 25) * 0.3) * 1.4)
    if name == "riser":
        t = tt(0.9)
        return bp(noise(len(t)), 1200, 9000) * (t / 0.9) ** 3 * 0.3
    if name == "paper":
        t = tt(0.35)
        return bp(noise(len(t)), 1800, 7000) * (np.sin(np.pi * t / 0.35) ** 2) * (0.6 + 0.4 * np.sin(t * 90)) * 0.3
    if name == "reverse":
        t = tt(1.8)
        return hp(noise(len(t)), 3500) * (t / 1.8) ** 3 * 0.25
    raise ValueError(name)


def build(lang):
    cues = json.load(open(os.path.join(HERE, f"cues-{lang}.json"), encoding="utf-8"))
    l = np.zeros(N + TAIL)
    r = np.zeros(N + TAIL)
    send = np.zeros(N + TAIL)
    cache = {}
    for c in cues:
        v = cache.get(c["voice"])
        if v is None:
            v = cache[c["voice"]] = voice(c["voice"])
        i = int(round(c["t"] * SR))
        n = min(len(v), N + TAIL - i)
        pan = 0.15 * np.sin(c["t"] * 1.7)
        l[i:i + n] += v[:n] * c["gain"] * (1 - pan)
        r[i:i + n] += v[:n] * c["gain"] * (1 + pan)
        send[i:i + n] += v[:n] * c["gain"]
    irn = int(1.4 * SR)
    t = np.arange(irn) / SR
    ir = lp(noise(irn), 7000) * np.exp(-t / 0.3)
    ir /= np.sqrt(np.sum(ir ** 2))
    wet = fftconvolve(send, ir)[: N + TAIL] * 0.18
    out = np.stack([l + wet, r + wet])
    out[:, :TAIL] += out[:, N:N + TAIL]
    return out[:, :N].astype(np.float32)


if __name__ == "__main__":
    lang = sys.argv[1] if len(sys.argv) > 1 else "fr"
    a = build(lang)
    wavfile.write(os.path.join(OUT, f"sfx-{lang}.wav"), SR, a.T)
    print(f"sfx-{lang}.wav")
