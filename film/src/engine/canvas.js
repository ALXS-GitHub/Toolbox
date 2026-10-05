// 2D drawing helpers used by every interface painter. Pure drawing, no state between frames.
import { ICONS } from './icons.js';

export const FONT = {
  display: 'Outfit',
  ui: '"Plus Jakarta Sans"',
  mono: '"JetBrains Mono", "Cascadia Mono", Consolas, monospace',
  emoji: '"Segoe UI Emoji"',
};

export async function loadFonts(base) {
  const faces = [
    ['Outfit', 'outfit.woff2'],
    ['Plus Jakarta Sans', 'plus-jakarta-sans.woff2'],
    ['JetBrains Mono', 'jetbrains-mono.woff2'],
  ];
  for (const [family, file] of faces) {
    const f = new FontFace(family, `url(${base}/${file})`, { weight: '100 900' });
    await f.load();
    document.fonts.add(f);
  }
  // Warm every weight we use so the first measured frame matches the others.
  const c = document.createElement('canvas').getContext('2d');
  for (const fam of [FONT.display, FONT.ui, FONT.mono]) for (const w of [400, 480, 500, 550, 600, 700, 800]) {
    c.font = `${w} 20px ${fam}`;
    c.fillText('Aé→✓●⎿│▓░', 0, 0);
  }
  await document.fonts.ready;
}

export async function loadImage(src) {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

/** Wraps a 2D context with a few helpers. Units are CSS pixels; the canvas is scaled by `dpr`. */
export class Pen {
  constructor(ctx) {
    this.c = ctx;
  }

  font(size, weight = 400, family = FONT.ui, tracking = 0) {
    const c = this.c;
    c.font = `${weight} ${size}px ${family}`;
    c.letterSpacing = tracking ? `${tracking}em` : '0px';
    return this;
  }

  rr(x, y, w, h, r) {
    const c = this.c;
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    c.beginPath();
    c.roundRect(x, y, w, h, r);
    return this;
  }

  fillRR(x, y, w, h, r, color) {
    this.rr(x, y, w, h, r);
    this.c.fillStyle = color;
    this.c.fill();
    return this;
  }

  strokeRR(x, y, w, h, r, color, lw = 1) {
    this.rr(x + lw / 2, y + lw / 2, w - lw, h - lw, Math.max(0, r - lw / 2));
    this.c.strokeStyle = color;
    this.c.lineWidth = lw;
    this.c.stroke();
    return this;
  }

  rect(x, y, w, h, color) {
    this.c.fillStyle = color;
    this.c.fillRect(x, y, w, h);
    return this;
  }

  line(x1, y1, x2, y2, color, lw = 1) {
    const c = this.c;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = color;
    c.lineWidth = lw;
    c.stroke();
    return this;
  }

  circle(x, y, r, color) {
    const c = this.c;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = color;
    c.fill();
    return this;
  }

  ring(x, y, r, color, lw) {
    const c = this.c;
    c.beginPath();
    c.arc(x, y, r - lw / 2, 0, Math.PI * 2);
    c.strokeStyle = color;
    c.lineWidth = lw;
    c.stroke();
    return this;
  }

  /** Text at a baseline-middle anchor. Returns the advance width. */
  text(s, x, y, color, align = 'left', baseline = 'middle') {
    const c = this.c;
    c.fillStyle = color;
    c.textAlign = align;
    c.textBaseline = baseline;
    c.fillText(s, x, y);
    return c.measureText(s).width;
  }

  w(s) {
    return this.c.measureText(s).width;
  }

  /** Greedy word wrap with the current font. */
  wrap(s, maxW) {
    const words = s.split(' ');
    const lines = [];
    let cur = '';
    for (const word of words) {
      const next = cur ? cur + ' ' + word : word;
      if (cur && this.w(next) > maxW) {
        lines.push(cur);
        cur = word;
      } else cur = next;
    }
    if (cur) lines.push(cur);
    return lines;
  }

  /** Clip the next drawings to a rounded rect; call restore() after. */
  clipRR(x, y, w, h, r) {
    this.c.save();
    this.rr(x, y, w, h, r);
    this.c.clip();
    return this;
  }

  save() { this.c.save(); return this; }
  restore() { this.c.restore(); return this; }
  alpha(a) { this.c.globalAlpha = a; return this; }

  /** Lucide icon (24×24 viewBox), drawn with a 2 px stroke scaled to `size`. */
  icon(name, x, y, size, color, stroke = 2, fill = null) {
    const data = ICONS[name];
    if (!data) throw new Error('icon ' + name);
    const c = this.c;
    c.save();
    c.translate(x, y);
    c.scale(size / 24, size / 24);
    c.strokeStyle = color;
    c.lineWidth = stroke;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    for (const [tag, a] of data) {
      let p;
      if (tag === 'path') p = new Path2D(a.d);
      else if (tag === 'circle') { p = new Path2D(); p.arc(+a.cx, +a.cy, +a.r, 0, Math.PI * 2); }
      else if (tag === 'rect') { p = new Path2D(); p.roundRect(+a.x, +a.y, +a.width, +a.height, +(a.rx || 0)); }
      else if (tag === 'line') { p = new Path2D(); p.moveTo(+a.x1, +a.y1); p.lineTo(+a.x2, +a.y2); }
      else if (tag === 'polyline' || tag === 'polygon') {
        p = new Path2D();
        const pts = a.points.trim().split(/[\s,]+/).map(Number);
        p.moveTo(pts[0], pts[1]);
        for (let i = 2; i < pts.length; i += 2) p.lineTo(pts[i], pts[i + 1]);
        if (tag === 'polygon') p.closePath();
      } else if (tag === 'ellipse') { p = new Path2D(); p.ellipse(+a.cx, +a.cy, +a.rx, +a.ry, 0, 0, Math.PI * 2); }
      if (!p) continue;
      if (fill) { c.fillStyle = fill; c.fill(p); }
      c.stroke(p);
    }
    c.restore();
    return this;
  }

  /** Soft drop shadow under a rounded rect (the app's real elevation shadows). */
  shadow(x, y, w, h, r, blur, dy, color) {
    const c = this.c;
    c.save();
    c.shadowColor = color;
    c.shadowBlur = blur;
    c.shadowOffsetY = dy;
    this.rr(x, y, w, h, r);
    c.fillStyle = color;
    c.fill();
    c.restore();
    return this;
  }
}

/** Reveal helper: draws text with a vertical mask (rises from below its line box). */
export function maskedText(pen, s, x, y, lineH, k, color, align = 'left') {
  if (k <= 0) return pen.w(s);
  const c = pen.c;
  c.save();
  c.beginPath();
  c.rect(x - (align === 'left' ? 4 : pen.w(s)) - 4, y - lineH * 0.62, pen.w(s) + 16 + (align === 'left' ? 0 : pen.w(s)), lineH * 1.24);
  c.clip();
  const dy = (1 - k) * lineH * 0.9;
  const wv = pen.text(s, x, y + dy, color, align);
  c.restore();
  return wv;
}

/** Typewriter: the first n characters of s (n can be fractional, floored). */
export const typed = (s, n) => s.slice(0, Math.max(0, Math.floor(n)));

/** Mix two hex colours, returns rgb() string. */
export function mixHex(a, b, k) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) * (1 - k) + ((pb >> 16) & 255) * k);
  const g = Math.round(((pa >> 8) & 255) * (1 - k) + ((pb >> 8) & 255) * k);
  const bl = Math.round((pa & 255) * (1 - k) + (pb & 255) * k);
  return `rgb(${r},${g},${bl})`;
}

/** hex + alpha → rgba() string. */
export function rgba(h, a) {
  const v = parseInt(h.slice(1), 16);
  return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${a})`;
}
