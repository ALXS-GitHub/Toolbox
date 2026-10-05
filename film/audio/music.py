# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy>=2", "scipy>=1.13"]
# ///
"""Original score for the Toolbox film, synthesized from code.

120 BPM, 28 bars (56 s), D minor, one chord per bar: Dm9, Bbmaj7, Fmaj7, C6.
The arrangement follows the storyboard; the buffer wraps so the loop is seamless.

    uv run audio/music.py            -> audio/out/music.wav
"""
import os
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
BPM = 120
BEAT = 60 / BPM
BAR = 4 * BEAT
BARS = 28
DUR = BARS * BAR
N = int(SR * DUR)
TAIL = int(SR * 5)
OUT = os.path.join(os.path.dirname(__file__), "out")
os.makedirs(OUT, exist_ok=True)

rng = np.random.default_rng(128)


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


class Bus:
    def __init__(self):
        self.l = np.zeros(N + TAIL)
        self.r = np.zeros(N + TAIL)

    def add(self, t0, sig, gain=1.0, pan=0.0):
        """Mono or stereo signal at time t0 (s). pan in [-1, 1]."""
        i = int(round(t0 * SR))
        if sig.ndim == 1:
            gl = np.cos((pan + 1) * np.pi / 4) * np.sqrt(2)
            gr = np.sin((pan + 1) * np.pi / 4) * np.sqrt(2)
            sl, sr_ = sig * gl, sig * gr
        else:
            sl, sr_ = sig[0], sig[1]
        n = min(len(sl), N + TAIL - i)
        if n <= 0 or i < 0:
            return
        self.l[i:i + n] += sl[:n] * gain
        self.r[i:i + n] += sr_[:n] * gain

    def stereo(self):
        return np.stack([self.l, self.r])


def saw(freq, n, phase0=0.0):
    """Band-limited sawtooth (polyBLEP)."""
    dt = freq / SR
    ph = (phase0 + dt * np.arange(n)) % 1.0
    s = 2 * ph - 1
    m1 = ph < dt
    x = ph[m1] / dt
    s[m1] -= x + x - x * x - 1
    m2 = ph > 1 - dt
    x = (ph[m2] - 1) / dt
    s[m2] -= x * x + x + x + 1
    return s


def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR * 0.45), "low", fs=SR, output="sos"), x)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, min(hi, SR * 0.45)], "band", fs=SR, output="sos"), x)


def sweep_lp(x, fcs, block=512):
    """Low-pass with a cutoff that changes per block (fcs: array of cutoffs per sample)."""
    out = np.zeros_like(x)
    zi = np.zeros((1, 2))
    for i in range(0, len(x), block):
        fc = float(np.clip(fcs[min(i, len(fcs) - 1)], 40, SR * 0.45))
        sos = butter(2, fc, "low", fs=SR, output="sos")
        out[i:i + block], zi = sosfilt(sos, x[i:i + block], zi=zi)
    return out


def env_ad(n, a, d, curve=1.0):
    t = np.arange(n) / SR
    e = np.minimum(1.0, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / d)
    return e ** curve


def env_asr(n, a, r, hold):
    t = np.arange(n) / SR
    e = np.minimum(1.0, t / a)
    rel = np.clip((t - hold) / r, 0, 1)
    return e * (1 - rel) ** 2


def noise(n):
    return rng.standard_normal(n)


# ── harmony ──────────────────────────────────────────────────────────────
CHORDS = [
    # root (bass), voicing
    (38, [53, 57, 60, 64, 69]),  # Dm9: F A C E A
    (34, [50, 53, 57, 60, 65]),  # Bbmaj7(9): D F A C F
    (41, [53, 57, 60, 64, 67]),  # Fmaj7: F A C E G
    (36, [52, 55, 57, 62, 64]),  # C6/9: E G A D E
]


def chord(b):
    return CHORDS[b % 4]


# Section map, bar index 0..27 (one bar = 2 s)
def has(b, part):
    S1, S2, S3, S4, S5, S6a, S6b, OUTRO = range(0, 5), range(5, 9), range(9, 13), range(13, 19), range(19, 23), range(23, 25), range(25, 27), range(27, 28)
    table = {
        "kick": list(S2) + list(S3) + [13, 14, 15, 16] + [18] + [21, 22] + [23, 24] + list(S6b),
        "kickhalf": [17],
        "bass": list(S2) + list(S3) + list(S4) + [21, 22] + list(S6b),
        "clap": [6, 7, 8] + list(S3) + list(S4) + [22] + list(S6b),
        "hat": list(S2) + list(S3) + list(S4) + [21, 22, 23, 24] + list(S6b),
        "shaker": list(S3) + list(S4) + list(S6b),
        "openhat": list(S4) + list(S6b),
        "arp": list(range(0, 27)),
        "pulse": list(S1) + [19, 20],
        "lead": list(S3) + [15, 16, 18] + list(S6b),
        "pad": list(range(0, 28)),
    }
    return b in table[part]


# pad cutoff per bar (opens with the story)
PAD_FC = [650, 700, 760, 820, 950] + [1300] * 4 + [1500] * 4 + [1800] * 6 + [2200] * 4 + [2600, 3200] + [3600, 3600] + [1100]


def build():
    music = Bus()
    rev = Bus()  # reverb send

    # ── pad: supersaw, held per bar with overlap ──
    for b in range(BARS):
        root, notes = chord(b)
        t0 = b * BAR - 0.05
        hold = BAR + 0.1
        n = int((hold + 1.6) * SR)
        sig_l = np.zeros(n)
        sig_r = np.zeros(n)
        for m in notes:
            f = midi(m)
            for k, det in enumerate([-0.11, -0.05, 0.0, 0.05, 0.11, 0.17]):
                v = saw(f * 2 ** (det / 12), n, rng.random())
                if k % 2:
                    sig_l += v
                else:
                    sig_r += v
        e = env_asr(n, 0.35 if b else 0.02, 1.4, hold)
        fc = PAD_FC[b]
        sig_l = lp(sig_l, fc, 2) * e
        sig_r = lp(sig_r, fc, 2) * e
        g = 0.022 if b < 27 else 0.018
        music.add(t0, np.stack([sig_l, sig_r]), g)
        rev.add(t0, np.stack([sig_l, sig_r]), g * 0.6)

    # ── arpeggio: plucked 16ths through the chord ──
    pattern = [0, 2, 4, 1, 3, 2, 4, 3]
    for b in range(BARS):
        if not has(b, "arp"):
            continue
        root, notes = chord(b)
        tones = notes + [x + 12 for x in notes]
        bright = 0.5 + 0.5 * min(1, b / 24)
        for i in range(16):
            t = b * BAR + i * BEAT / 4
            idx = pattern[i % 8] + (2 if (b >= 23 and i >= 8) else 0)
            m = tones[idx % len(tones)] + 12
            f = midi(m)
            n = int(0.42 * SR)
            v = saw(f, n, rng.random()) * 0.6 + saw(f * 1.003, n, rng.random()) * 0.4
            a = lp(v, 2600 + 2400 * bright) * env_ad(n, 0.002, 0.07) + lp(v, 900) * env_ad(n, 0.004, 0.22)
            acc = 1.0 if i % 4 == 0 else 0.7
            g = (0.065 if b < 5 else 0.06) * acc
            pan = -0.35 if i % 2 else 0.35
            music.add(t, a, g, pan)
            rev.add(t, a, g * 0.8, pan)

    # ── bass: off-beat 8ths ──
    for b in range(BARS):
        if not has(b, "bass"):
            continue
        root, _ = chord(b)
        for i in range(8):
            if i % 2 == 0:
                continue
            t = b * BAR + i * BEAT / 2
            f = midi(root + 12)
            n = int(0.24 * SR)
            tt = np.arange(n) / SR
            v = np.sin(2 * np.pi * f * tt) * 0.8 + lp(saw(f, n), 420 + (300 if b >= 13 else 0)) * 0.6
            v = np.tanh(v * 1.4) * env_ad(n, 0.004, 0.11)
            music.add(t, v, 0.34)
        # sub on the downbeat
        n = int(0.5 * SR)
        tt = np.arange(n) / SR
        music.add(b * BAR, np.sin(2 * np.pi * midi(root) * tt) * env_ad(n, 0.01, 0.3), 0.3)

    # ── drums ──
    def kick():
        n = int(0.5 * SR)
        t = np.arange(n) / SR
        f = 44 + 120 * np.exp(-t * 30)
        s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6.0)
        s += hp(noise(n), 2500) * np.exp(-t * 260) * 0.12
        return np.tanh(s * 1.8)

    def clap():
        n = int(0.4 * SR)
        t = np.arange(n) / SR
        e = np.zeros(n)
        for k, d in enumerate([0.0, 0.011, 0.022]):
            e += np.where(t >= d, np.exp(-(t - d) * 120), 0) * (0.8 if k < 2 else 1)
        e += np.exp(-t * 14) * 0.35
        return bp(noise(n), 900, 4200) * e

    def hat(open_=False):
        n = int((0.3 if open_ else 0.06) * SR)
        t = np.arange(n) / SR
        return hp(noise(n), 7000, 2) * np.exp(-t * (12 if open_ else 70))

    K = kick()
    MUFFLED = lp(kick(), 160) * 1.6
    kick_times = []
    # intro pulse: a muffled kick on every beat, the heartbeat under the dictation
    for b in range(BARS):
        if has(b, "pulse"):
            for i in range(4):
                music.add(b * BAR + i * BEAT, MUFFLED, 0.42 if i == 0 else 0.3)
    # sustained sub under the intro
    for b in range(BARS):
        if has(b, "pulse"):
            root, _ = chord(b)
            n = int(2.3 * SR)
            tt_ = np.arange(n) / SR
            music.add(b * BAR, np.sin(2 * np.pi * midi(root) * tt_) * env_asr(n, 0.05, 0.4, 1.9), 0.2)
    # the first downbeat of the loop: a deep accent
    n = int(2.0 * SR)
    tt_ = np.arange(n) / SR
    f = 30 + 60 * np.exp(-tt_ * 8)
    music.add(0.0, np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt_ * 2.6) * 1.6), 0.45)
    for b in range(BARS):
        for i in range(4):
            t = b * BAR + i * BEAT
            if has(b, "kick") or (has(b, "kickhalf") and i in (0,)):
                music.add(t, K, 0.62)
                kick_times.append(t)
            if has(b, "clap") and i in (1, 3):
                c = clap()
                music.add(t, c, 0.16, 0.05)
                rev.add(t, c, 0.12)
        for i in range(8):
            t = b * BAR + i * BEAT / 2
            if has(b, "hat") and i % 2 == 1:
                music.add(t, hat(), 0.09, 0.25)
            if has(b, "openhat") and i % 4 == 3:
                music.add(t, hat(True), 0.05, -0.2)
        for i in range(16):
            t = b * BAR + i * BEAT / 4
            if has(b, "shaker"):
                g = 0.03 if i % 2 else 0.018
                music.add(t, hat() * 0.7, g, -0.4)

    # ── lead: FM bell motif ──
    motif = [(0, 69, 1), (1, 72, 1), (1.5, 74, 0.5), (2, 77, 1.5), (3.5, 76, 0.5), (4, 74, 1), (5, 72, 1), (6, 69, 2)]
    for b in range(BARS):
        if not has(b, "lead") or b % 2:
            continue
        for (beat, m, ln) in motif:
            t = b * BAR + beat * BEAT
            f = midi(m)
            n = int((ln * BEAT + 0.9) * SR)
            tt = np.arange(n) / SR
            I = 2.2 * np.exp(-tt * 5)
            v = np.sin(2 * np.pi * f * tt + I * np.sin(2 * np.pi * f * 2 * tt)) * env_ad(n, 0.004, 0.55)
            music.add(t, v, 0.07, 0.15)
            rev.add(t, v, 0.09)

    # ── chord stabs on the final words ──
    for t in (50.5, 51.0):
        root, notes = chord(int(t // BAR))
        n = int(0.9 * SR)
        v = np.zeros(n)
        for m in notes + [notes[0] + 12]:
            for det in (-0.08, 0.08):
                v += saw(midi(m + 12) * 2 ** (det / 12), n, rng.random())
        v = lp(v, 3200) * env_ad(n, 0.003, 0.22)
        music.add(t, v, 0.03)
        rev.add(t, v, 0.05)

    # ── risers and impacts ──
    def riser(dur):
        n = int(dur * SR)
        t = np.arange(n) / SR
        x = noise(n)
        fcs = 300 + 9000 * (t / dur) ** 2
        v = sweep_lp(x, fcs) - sweep_lp(x, fcs * 0.35)
        return v * (t / dur) ** 2.2

    def impact():
        n = int(2.5 * SR)
        t = np.arange(n) / SR
        f = 34 + 70 * np.exp(-t * 9)
        boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2)
        hiss = lp(noise(n), 5000) * np.exp(-t * 7) * 0.3
        return np.tanh((boom + hiss) * 1.5)

    for (t0, t1, g) in [(8.0, 10.0, 0.22), (16.0, 18.0, 0.14), (34.0, 36.0, 0.26), (44.0, 46.0, 0.16), (48.0, 50.0, 0.26)]:
        r = riser(t1 - t0)
        music.add(t0, r, g)
        rev.add(t0, r, g * 0.5)
    for t, g in [(10.0, 0.45), (36.0, 0.6), (50.5, 0.6), (18.0, 0.25)]:
        im = impact()
        music.add(t, im, g)
        rev.add(t, im, g * 0.4)

    # reverse cymbal into the loop point
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    rc = hp(noise(n), 4500) * (t / 1.6) ** 3
    music.add(DUR - 1.6, rc, 0.08)

    # ── reverb ──
    ir_n = int(2.6 * SR)
    t = np.arange(ir_n) / SR
    irl = lp(noise(ir_n), 6000) * np.exp(-t / 0.55)
    irr = lp(noise(ir_n), 6000) * np.exp(-t / 0.55)
    irl /= np.sqrt(np.sum(irl ** 2))
    irr /= np.sqrt(np.sum(irr ** 2))
    wet_l = fftconvolve(rev.l, irl)[: N + TAIL]
    wet_r = fftconvolve(rev.r, irr)[: N + TAIL]

    # ── sidechain on the pad + bass bus (approximation: duck the whole music bus lightly) ──
    duck = np.ones(N + TAIL)
    for kt in kick_times:
        i = int(kt * SR)
        n = int(0.32 * SR)
        e = 1 - 0.45 * np.exp(-np.arange(n) / SR / 0.09)
        j = min(n, N + TAIL - i)
        duck[i:i + j] = np.minimum(duck[i:i + j], e[:j])
    out = music.stereo()
    out[0] = out[0] * (0.55 + 0.45 * duck) + wet_l * 0.5 * duck
    out[1] = out[1] * (0.55 + 0.45 * duck) + wet_r * 0.5 * duck

    # ── wrap the tail into the start so the loop is seamless ──
    out[:, :TAIL] += out[:, N:N + TAIL]
    out = out[:, :N]
    out = np.tanh(out * 0.9) / 0.9
    out /= max(1e-9, np.max(np.abs(out))) / 0.89
    return out.astype(np.float32), kick_times


if __name__ == "__main__":
    audio, kicks = build()
    wavfile.write(os.path.join(OUT, "music.wav"), SR, audio.T)
    print("music.wav", audio.shape[1] / SR, "s")
