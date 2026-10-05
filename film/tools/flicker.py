# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy>=2"]
# ///
"""Flicker check, after WCAG 2.3.1's "general flash": a pair of opposing changes in relative (linear)
luminance of at least 10 % of the maximum, the darker state below 0.8. Measured per zone of an 8 × 8 grid
(much smaller than WCAG's quarter of the visual field, so stricter), frame by frame: an alert is a jump of
at least 0.10 that reverses (an opposite jump of at least half its size, and at least 0.10) within the next
3 frames. Content that merely moves changes a zone's luminance monotonically and is not flagged.

    uv run tools/flicker.py out/master-fr-land.mp4 [--json out/flicker-fr-land.json]
Exit code 1 when there is at least one alert.
"""
import json
import subprocess
import sys
import numpy as np

GRID = 8
FLASH = 0.10    # change in relative luminance (fraction of full white)
DARK = 0.80     # the darker state must be below this
WINDOW = 3      # frames within which the jump must reverse


def frames(path, w=192, h=None):
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate",
                            "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip().split(",")
    W, H = int(probe[0]), int(probe[1])
    num, den = probe[2].split("/")
    fps = float(num) / float(den)
    h = round(w * H / W / GRID) * GRID
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={w}:{h}:flags=area,format=gray", "-f", "rawvideo", "-"],
                         stdout=subprocess.PIPE)
    size = w * h
    out = []
    while True:
        buf = p.stdout.read(size)
        if len(buf) < size:
            break
        out.append(np.frombuffer(buf, np.uint8).reshape(h, w))
    return np.array(out, np.float32), fps


def linear(f):
    """sRGB code values (0..255) to relative luminance (0..1)."""
    c = f / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def zone_changes(f):
    n, h, w = f.shape
    z = linear(f).reshape(n, GRID, h // GRID, GRID, w // GRID).mean(axis=(2, 4))
    return np.diff(z, axis=0), z[:-1]


def alerts(d, z, fps):
    big = (np.abs(d) >= FLASH) & (np.minimum(z, z + d) < DARK)
    found = []
    n = d.shape[0]
    for i, gy, gx in zip(*np.nonzero(big)):
        s = np.sign(d[i, gy, gx])
        for k in range(1, WINDOW + 1):
            j = i + k
            if j >= n:
                break
            back = d[j, gy, gx]
            if np.sign(back) == -s and abs(back) >= max(FLASH, 0.5 * abs(d[i, gy, gx])):
                found.append({"frame": int(i + 1), "t": round((i + 1) / fps, 3), "zone": [int(gx), int(gy)],
                              "jump": round(float(d[i, gy, gx]), 3), "back": round(float(back), 3),
                              "level": round(float(z[i, gy, gx]), 3)})
                break
    return found


SHIMMER = 0.01   # sustained shimmer: linear luminance change per frame
ALTERN = 4       # sign alternations in a row


def shimmer(d, z, fps):
    """Light that keeps flickering: at least ALTERN consecutive sign alternations of changes >= SHIMMER
    in the same zone (smooth motion does not alternate frame after frame)."""
    found = []
    n = d.shape[0]
    sig = np.where(np.abs(d) >= SHIMMER, np.sign(d), 0)
    alt = (sig[1:] * sig[:-1]) < 0          # alternation between change i and i+1
    run = np.zeros(alt.shape[1:], int)
    for i in range(alt.shape[0]):
        run = np.where(alt[i], run + 1, 0)
        for gy, gx in zip(*np.nonzero(run == ALTERN)):
            found.append({"frame": int(i + 1), "t": round((i + 1) / fps, 3), "zone": [int(gx), int(gy)], "kind": "shimmer",
                          "level": round(float(z[i, gy, gx]), 3)})
    return found


def main():
    path = sys.argv[1]
    f, fps = frames(path)
    d, z = zone_changes(f)
    found = alerts(d, z, fps) + shimmer(d, z, fps)
    # also across the loop seam: last frames followed by the first ones
    sd, sz = zone_changes(np.concatenate([f[-4:], f[:4]]))
    for a in alerts(sd, sz, fps):
        a["frame"] = f"seam+{a['frame']}"
        found.append(a)
    secs = sorted({int(a["t"]) for a in found if isinstance(a["frame"], int)})
    print(f"{path}: {len(found)} alert(s)" + (f" in seconds {secs}" if secs else ""))
    if "--json" in sys.argv:
        json.dump(found, open(sys.argv[sys.argv.index("--json") + 1], "w"), indent=1)
    sys.exit(1 if found else 0)


if __name__ == "__main__":
    main()
