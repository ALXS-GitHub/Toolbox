// Motion primitives. Every function is a pure function of time: no state, no wall clock.

export const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
export const lerp = (a, b, k) => a + (b - a) * k;
export const mix = lerp;
export const inv = (a, b, x) => clamp((x - a) / (b - a));
export const smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
export const smoother = (x) => { x = clamp(x); return x * x * x * (x * (x * 6 - 15) + 10); };

/** Spring presets: stiffness k and damping d (unit mass). */
export const SPRING = {
  snap: [320, 30],
  base: [170, 26],
  heavy: [140, 24],
  soft: [90, 19],
  cam: [60, 15.5],
};

/**
 * Closed-form damped spring from 0 to 1, started at t = 0.
 * Returns 0 before the start. Pure function of t (seconds).
 */
export function spring(t, k = 170, d = 26) {
  if (t <= 0) return 0;
  const w0 = Math.sqrt(k);
  const z = d / (2 * w0);
  if (z < 1) {
    const wd = w0 * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t));
  }
  if (z === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  const s = Math.sqrt(z * z - 1);
  const r1 = -w0 * (z - s), r2 = -w0 * (z + s);
  return 1 + (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r1 - r2);
}

/** Spring driven by a preset name or [k, d]. */
export function sp(t, preset = 'base') {
  const [k, d] = Array.isArray(preset) ? preset : SPRING[preset];
  return spring(t, k, d);
}

/**
 * A value with several targets over time: [[t0, v0], [t1, v1], ...].
 * Each change adds one spring starting at its own time, so the value is continuous.
 */
export function track(t, keys, preset = 'base') {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [ti, vi] = keys[i];
    if (t <= ti) break;
    v += (vi - keys[i - 1][1]) * sp(t - ti, keys[i][2] || preset);
  }
  return v;
}

/** Same as track for arrays (vectors). */
export function trackV(t, keys, preset = 'base') {
  const n = keys[0][1].length;
  const out = keys[0][1].slice();
  for (let i = 1; i < keys.length; i++) {
    const [ti, vi] = keys[i];
    if (t <= ti) break;
    const s = sp(t - ti, keys[i][2] || preset);
    for (let j = 0; j < n; j++) out[j] += (vi[j] - keys[i - 1][1][j]) * s;
  }
  return out;
}

/** 0 → 1 spring that starts at t0 (a convenience). */
export const on = (t, t0, preset = 'base') => sp(t - t0, preset);
/** 0 → 1 → 0: rises at t0, falls at t1. */
export const pulse = (t, t0, t1, preset = 'base') => sp(t - t0, preset) - sp(t - t1, preset);

/** Text swap inside a morphing box: in 0.08 s after tIn, out 0.1 s before tOut. */
export function swap(t, tIn, tOut = Infinity) {
  return Math.min(clamp((t - tIn - 0.08) / 0.12), clamp((tOut - 0.1 - t) / 0.1));
}

/** Seeded PRNG (mulberry32). */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic hash noise in [0, 1) for an integer pair. */
export function hash2(x, y = 0) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Smooth 1D value noise, pure function of x. */
export function noise1(x, seed = 0) {
  const i = Math.floor(x), f = x - i;
  const a = hash2(i, seed), b = hash2(i + 1, seed);
  const u = f * f * (3 - 2 * f);
  return a + (b - a) * u;
}

/** Wrap time into [0, dur). */
export const loopT = (t, dur) => ((t % dur) + dur) % dur;

/**
 * Closed cubic Hermite spline through time-stamped keys, with Catmull-Rom tangents in time.
 * keys: [[t, [x, y, z, ...]], ...] sorted, covering one period `dur`. Position and velocity are
 * continuous everywhere, including across the loop seam.
 */
export function closedSpline(keys, dur) {
  const n = keys.length;
  const T = (i) => {
    const w = Math.floor(i / n);
    return keys[((i % n) + n) % n][0] + w * dur;
  };
  const P = (i) => keys[((i % n) + n) % n][1];
  const dim = keys[0][1].length;
  const tan = [];
  for (let i = 0; i < n; i++) {
    const p0 = P(i - 1), p1 = P(i + 1);
    const dt = T(i + 1) - T(i - 1);
    const hold = keys[i][2] === 'hold';
    tan.push(p0.map((_, j) => (hold ? 0 : (p1[j] - p0[j]) / dt)));
  }
  return (t) => {
    t = loopT(t, dur);
    let i = n - 1;
    for (let k = 0; k < n; k++) if (keys[k][0] <= t) i = k;
    const t0 = T(i), t1 = T(i + 1);
    const h = t1 - t0;
    const s = (t - t0) / h;
    const s2 = s * s, s3 = s2 * s;
    const h00 = 2 * s3 - 3 * s2 + 1, h10 = s3 - 2 * s2 + s, h01 = -2 * s3 + 3 * s2, h11 = s3 - s2;
    const a = P(i), b = P(i + 1), ma = tan[i], mb = tan[(i + 1) % n];
    const out = new Array(dim);
    for (let j = 0; j < dim; j++) out[j] = h00 * a[j] + h10 * h * ma[j] + h01 * b[j] + h11 * h * mb[j];
    return out;
  };
}

/** Linear interpolation of colors given as [r, g, b] in 0..1. */
export const mixColor = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];

export function hex(h) {
  const v = parseInt(h.slice(1), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}
