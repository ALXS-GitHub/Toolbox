// CortX, Terminal window, Halcyon Dark terminal theme. Recreated from frontend/src (TitleBar, SessionRail,
// ScopeSwitcher, theme-halcyon.css) and crates/cortx-core/resources/themes. Claude Code runs inside.
import { FONT, rgba } from '../engine/canvas.js';
import { clamp, sp, lerp, track, inv } from '../engine/motion.js';
import { T } from '../timeline.js';

export const CX = {
  bg: '#0f1b1f',
  chrome: '#122226',
  rail: '#10201f',
  card: '#18272a',
  text: '#e5f1f1',
  muted: '#95afb2',
  faint: '#678183',
  primary: '#2dd4bf',
  border: 'rgba(124,235,222,0.12)',
  borderStrong: 'rgba(124,235,222,0.22)',
  accent: 'rgba(45,212,191,0.16)',
  agent: '#a78bfa',
  done: '#2dd4bf',
  ansi: { black: '#16262b', red: '#ff7a88', green: '#2dd4bf', yellow: '#f5b73a', blue: '#48b9f5', magenta: '#c792ea', cyan: '#5fd7e6', white: '#c9d8d8' },
  clay: '#d97757',
  od: { blue: '#61afef', green: '#98c379', yellow: '#e5c07b', red: '#e06c75', purple: '#c678dd', orange: '#d19a66', cyan: '#56b6c2', gray: '#dcdcdc', dim: '#787878' },
};

export function cortxGeom(portrait) {
  return portrait
    ? { w: 860, h: 1340, title: 40, rail: 0, font: 25, lh: 33, pad: 22 }
    : { w: 1360, h: 780, title: 36, rail: 240, font: 16, lh: 22.5, pad: 18 };
}

const span = (text, color = CX.text, o = {}) => ({ text, color, ...o });

/** Terminal history: blocks of lines that appear at given times. */
function blocks(copy, G) {
  const c = copy.cortx;
  const ok = CX.ansi.green, dim = CX.faint, out = CX.muted;
  // the terminal wraps long lines at its width (JetBrains Mono advances 0.6 em)
  const cols = Math.floor((G.w - G.rail - G.pad * 2) / (G.font * 0.6)) - 1;
  const chop = (str, n) => {
    const parts = [];
    let rest = str;
    while (rest.length > n) {
      let cut = rest.lastIndexOf(' ', n);
      if (cut < n * 0.5) cut = n;
      parts.push(rest.slice(0, cut));
      rest = rest.slice(cut).trimStart();
    }
    parts.push(rest);
    return parts;
  };
  const tool = (t, head, res, extra = []) => ({
    t,
    lines: [
      ...chop(head, cols - 2).map((h, i) => [span(i ? '  ' : '● ', ok), span(h, CX.text, { bold: true })]),
      ...(res ? chop(res, cols - 5).map((r, i) => [span(i ? '     ' : '  ⎿  ', dim), span(r, out)]) : []),
      ...extra,
    ],
  });
  const prompt = (t, cmd) => ({ t, lines: [[span('~/zorg', CX.ansi.blue), span(' main', CX.ansi.green), span(' ❯ ', CX.primary), span(cmd, CX.text)]] });
  const diff = [
    ['  ', '41', ' ', 'const notes = useNotes(folderId)', null],
    ['  ', '42', '-', ".order('updated_at', { ascending: false })", 'del'],
    ['  ', '42', '+', ".order('pinned', { ascending: false })", 'add'],
    ['  ', '43', '+', ".order('updated_at', { ascending: false })", 'add'],
    ['  ', '58', '+', '<PinButton note={note} />', 'add'],
  ].map(([pad, n, sign, code, kind]) => [
    span('  ' + n.padStart(3) + ' ', dim, { bg: kind === 'add' ? 'rgba(45,212,191,0.13)' : kind === 'del' ? 'rgba(255,122,136,0.13)' : null, full: !!kind }),
    span(sign + ' ', kind === 'add' ? CX.ansi.green : kind === 'del' ? CX.ansi.red : dim),
    span(code, kind === 'add' ? '#d8fff6' : kind === 'del' ? '#ffd2d8' : out),
  ]);
  return [
    // the Zorg CLI, run by hand before (shown on the CLI layer of scene 2)
    prompt(-100, 'zorg ticket show ZORG-128'),
    { t: -100, lines: [[span(copy.cli.showTitle, CX.text, { bold: true })], [span('3f9a1c2e', dim)], [span(copy.cli.meta, dim)], [span('')], [span(copy.zorg.detail.descText, out)], [span('')]] },
    // scene 3: Claude Code
    { t: T.ccEnter, cc: true, lines: [] },
    { t: T.promptEnter, lines: [[span('> ' + c.prompt, CX.text, { bg: 'rgba(201,216,216,0.08)', full: true })], [span('')]] },
    tool(T.skill, c.skill, c.skillOut),
    tool(T.show, c.show, c.showOut),
    tool(T.status - 0.5, c.status, c.statusOut),
    tool(T.update, c.update, c.updateOut, diff),
    tool(T.service, c.service, c.serviceOut),
    tool(T.build, c.build, c.buildOut),
    tool(T.gate, c.commit, c.hookOut),
    { t: T.stamp, lines: chop(c.signedOut, cols - 5).map((r, i) => [span(i ? '     ' : '  ⎿  ', dim), span(r, out)]) },
    tool(T.rejoin, 'Bash(zorg ticket update ZORG-128 -s status=Done)', 'ZORG-128 → Done'),
    tool(T.rejoin + 0.5, 'Bash(zorg comment add ZORG-128 "…")', copy.lang === 'fr' ? 'Commentaire ajouté' : 'Comment added'),
  ];
}

/** Lines of the history visible at t, with their y (css px, top of pane) after scrolling. */
export function termLayout(copy, G, t) {
  const bl = blocks(copy, G);
  const paneH = G.h - G.title - G.pad * 2;
  const ccOn = t >= T.ccEnter;
  const bottomRes = ccOn ? G.lh * 7.2 : G.lh * 1.4; // input box + status line, or the shell prompt
  const avail = paneH - bottomRes;
  // y of every line, unscrolled
  let y = 0;
  const all = [];
  const heights = [];
  for (const b of bl) {
    if (b.cc) {
      all.push({ t: b.t, y, welcome: true });
      y += G.lh * 5;
      continue;
    }
    for (const l of b.lines) {
      all.push({ t: b.t, y, spans: l });
      y += G.lh;
    }
    heights.push([b.t, y]);
  }
  // shell prompt with `cc` typed, before Claude Code starts
  // scroll keys: whenever content passes the bottom, the view springs up
  const keys = [[-200, 0]];
  for (const [bt, yb] of heights) if (bt > -50) keys.push([bt, Math.max(0, yb + (bt < T.ccEnter ? G.lh : 0) - avail)]);
  keys.push([T.ccEnter, Math.max(0, all.find((a) => a.welcome).y + G.lh * 5 - avail)]);
  keys.sort((a, b) => a[0] - b[0]);
  // keep the max so far (never scroll back down)
  let m = 0;
  for (const k of keys) { m = Math.max(m, k[1]); k[1] = m; }
  const scroll = track(t, keys, 'base');
  return { lines: all.filter((a) => a.t <= t), scroll, avail, bottomRes };
}

/** Canvas rect (css px) of the terminal lines printed between t0 and t1, as they sit at time t. */
export function blockRect(copy, G, t, t0, t1) {
  const L = termLayout(copy, G, Math.min(t, T.rejoin + 1.5));
  const ls = L.lines.filter((l) => l.t >= t0 - 1e-6 && l.t <= t1 + 1e-6);
  const top = Math.min(...ls.map((l) => l.y)) - L.scroll + G.title + G.pad;
  const bot = Math.max(...ls.map((l) => l.y + (l.welcome ? G.lh * 4.5 : G.lh))) - L.scroll + G.title + G.pad;
  return [0, top - 10, G.w, bot - top + 20];
}

/** Canvas rect of the bottom area: Claude Code's input box and status line. */
export function inputRect(G) {
  const res = G.lh * 7.2;
  return [0, G.h - G.pad - res - 10, G.w, res + G.pad + 10];
}

function drawSpans(pen, spans, x, y, G, maxW) {
  let cx = x;
  for (const s of spans) {
    pen.font(G.font, s.bold ? 700 : 400, FONT.mono);
    if (s.bg) {
      const w = s.full ? maxW : pen.w(s.text);
      pen.rect(x - 6, y - G.lh / 2, w + 12, G.lh, s.bg);
    }
    cx += pen.text(s.text, cx, y, s.color);
  }
  return cx;
}

function sparkGlyph(t) {
  const g = ['·', '✢', '✳', '✶', '✻', '✽'];
  return g[Math.floor(Math.abs(t) * 8) % g.length];
}

/** Claude Code statusline (two lines, One Dark palette, separator "  │  "). */
function statusline(pen, G, x, y, t, copy) {
  const o = CX.od;
  const ctxPct = Math.round(lerp(38, 46, clamp(inv(T.ccEnter, T.rejoin, t))));
  const filled = Math.round(ctxPct / 10);
  const bar = '▓'.repeat(filled) + '░'.repeat(10 - filled);
  const sep = span('  │  ', o.gray);
  const l1 = [span('📁 ', o.blue), span('~/Projects/zorg', o.blue), sep, span('🌿 ', o.green), span('main ✱' + (t > T.update ? 3 : 0), t > T.update ? o.yellow : o.green), sep, span('🤖 ', o.purple), span('Opus 5.5', o.purple), sep, span('⚡ ', o.yellow), span('high', o.yellow), sep, span('🧠 ', o.green), span(bar + ' ' + ctxPct + '%', o.green), span(' · ', o.gray), span(Math.round(ctxPct * 2) + 'k/200k', o.green)];
  const mins = Math.floor(lerp(3, 14, clamp(inv(T.ccEnter, 46, t))));
  const l2 = [span('⏳ ', o.green), span('5h 34%', o.green), span(' ↻20:20', o.dim), span(' · ', o.gray), span('7j 61%', o.yellow), span(' ↻jeu. 05:40', o.dim), sep, span('⏱️ ', o.gray), span(mins + 'm', o.gray), sep, span('📝 ', o.gray), span(t > T.update ? '+46' : '+0', o.green), span(' ', o.gray), span(t > T.update ? '-3' : '-0', o.red), sep, span('🔥 ', o.orange), span('91%', o.orange)];
  const fs = G.font * 0.92;
  const G2 = { ...G, font: fs };
  drawSpans(pen, G.rail === 0 ? l1.slice(0, 8) : l1, x, y, G2, 0);
  drawSpans(pen, G.rail === 0 ? l2.slice(0, 9) : l2, x, y + G.lh, G2, 0);
}

function titleBar(pen, G, copy, imgs, t, agents) {
  const { w, title } = G;
  const c = pen.c;
  pen.rect(0, 0, w, title, CX.chrome);
  pen.rect(0, title - 1, w, 1, CX.border);
  c.save();
  pen.rr(12, 9, 18, 18, 4);
  c.clip();
  c.drawImage(imgs.cortx, 12, 9, 18, 18);
  c.restore();
  pen.font(12, 500, FONT.display).text(copy.cortx.title, 38, 18, CX.muted);
  const tw = pen.w(copy.cortx.title);
  pen.fillRR(46 + tw, 10, 34, 16, 8, CX.accent);
  pen.strokeRR(46 + tw, 10, 34, 16, 8, 'rgba(45,212,191,0.45)', 1);
  pen.font(10, 600, FONT.ui, 0.05).text('BETA', 63 + tw, 18.5, CX.primary, 'center');
  pen.font(10, 400, FONT.mono, 0).text('v0.15.10', 90 + tw, 18.5, 'rgba(149,175,178,0.6)');
  // scope switcher
  if (G.rail > 0) {
    const pills = [['globe', 'Global'], ...(agents ? [['bot', 'Agents 1']] : []), ['dot', 'zorg']];
    pen.font(11, 500, FONT.ui);
    const ws = pills.map(([, n]) => pen.w(n) + 30);
    const total = ws.reduce((a, b) => a + b, 0) + 6;
    let px = w / 2 - total / 2;
    pen.fillRR(px, 6, total, 24, 12, 'rgba(24,39,42,0.5)');
    pen.strokeRR(px, 6, total, 24, 12, CX.border, 1);
    px += 3;
    pills.forEach(([ic, n], i) => {
      const active = n === 'zorg';
      if (active) pen.fillRR(px, 8, ws[i], 20, 10, CX.accent);
      if (ic === 'dot') pen.circle(px + 12, 18, 3, CX.primary);
      else pen.icon(ic, px + 6, 12, 12, CX.muted, 2);
      pen.font(11, 500, FONT.ui).text(n, px + 22, 18.5, active ? CX.text : CX.muted);
      px += ws[i];
    });
    // right side
    // laid out from the window buttons leftwards, from measured widths: nothing overlaps
    let rx = w - 46 * 3 - 12;
    pen.font(11.5, 500, FONT.ui);
    const ow = pen.w('Open CortX');
    pen.text('Open CortX', rx, 18.5, CX.muted, 'right');
    rx -= ow + 16;
    pen.icon('sliders-horizontal', rx - 14, 11, 14, CX.muted, 2);
    rx -= 14 + 14;
    pen.fillRR(rx - 120, 7, 120, 22, 11, 'rgba(24,39,42,0.5)');
    pen.icon('search', rx - 112, 12, 12, CX.faint, 2);
    pen.font(10.5, 500, FONT.ui).text('Ctrl K', rx - 10, 18.5, CX.faint, 'right');
  }
  const bx = w - 46 * 3;
  pen.line(bx + 18, 18, bx + 28, 18, CX.muted, 1);
  pen.strokeRR(bx + 46 + 18, 13, 10, 10, 1.5, CX.muted, 1);
  pen.line(bx + 92 + 18, 13, bx + 92 + 28, 23, CX.muted, 1);
  pen.line(bx + 92 + 28, 13, bx + 92 + 18, 23, CX.muted, 1);
}

function sessionRail(pen, G, copy, t) {
  const { rail, title, h } = G;
  if (!rail) return;
  const c = copy.cortx;
  pen.rect(0, title, rail, h - title, CX.rail);
  pen.rect(rail - 1, title, 1, h - title, CX.border);
  const agentOn = t >= T.promptEnter;
  const ccOn = t >= T.ccEnter;
  const svc = t >= T.service + 0.2;
  pen.font(12, 600, FONT.display).text(c.sessions, 14, title + 20, CX.text);
  const summary = `${svc ? 3 : 2} · ${ccOn ? '1 agent' : '0 agent'}${svc ? ' · 1 running' : ''}`;
  pen.font(11, 450, FONT.ui).text(summary, 14 + pen.font(12, 600, FONT.display).w(c.sessions) + 8, title + 20.5, CX.faint);
  pen.icon('panel-left-close', rail - 30, title + 12, 15, CX.faint, 2);
  let y = title + 52;
  pen.icon('chevron-down', 12, y - 6, 12, CX.faint, 2);
  pen.circle(32, y, 3, CX.primary);
  pen.font(10.5, 600, FONT.ui, 0.07).text('ZORG', 42, y, CX.faint);
  pen.font(10.5, 600, FONT.ui, 0).text(svc ? '2' : '1', rail - 16, y, CX.faint, 'right');
  y += 26;
  // active tab: shell, then Claude Code
  pen.fillRR(8, y - 4, rail - 16, 44, 10, CX.accent);
  const name = agentOn ? (copy.lang === 'fr' ? 'Prendre ZORG-128' : 'Take ZORG-128') : ccOn ? 'claude · zorg' : 'pwsh · zorg';
  pen.icon(ccOn ? 'sparkles' : 'square-terminal', 18, y + 4, 14, ccOn ? CX.primary : CX.faint, 2);
  pen.font(12.5, 500, FONT.ui).text(name, 42, y + 10, CX.text);
  if (agentOn) {
    pen.font(10.5, 500, FONT.ui).text(c.working, 42, y + 27, CX.agent);
    const ph = (t * 1.6) % 1;
    pen.ring(rail - 26, y + 18, 4.5 + ph * 5, rgba(CX.agent, 0.55 * (1 - ph)), 1.5);
    pen.circle(rail - 26, y + 18, 4.5, CX.agent);
  } else {
    pen.font(10.5, 400, FONT.mono).text('~/zorg', 42, y + 27, CX.faint);
    pen.circle(rail - 26, y + 18, 4.5, ccOn ? CX.od.yellow : '#5d7376');
  }
  y += 48;
  if (svc) {
    const k = sp(t - (T.service + 0.2), 'snap');
    pen.c.save();
    pen.c.globalAlpha = clamp(k * 2);
    const yy = y + (1 - k) * -12;
    pen.icon('terminal', 18, yy + 4, 14, CX.faint, 2);
    pen.font(12.5, 500, FONT.ui).text(c.serviceRow, 42, yy + 10, CX.text);
    pen.font(10.5, 400, FONT.mono).text('bun run dev · :5173', 42, yy + 27, CX.primary);
    const ph = (t * 1.6) % 1;
    pen.ring(rail - 26, yy + 18, 4.5 + ph * 5, rgba(CX.done, 0.55 * (1 - ph)), 1.5);
    pen.circle(rail - 26, yy + 18, 4.5, CX.done);
    pen.c.restore();
    y += 48 * k;
  }
  y += 14;
  pen.icon('chevron-down', 12, y - 6, 12, CX.faint, 2);
  pen.font(10.5, 600, FONT.ui, 0.07).text(c.noProject.toUpperCase(), 30, y, CX.faint);
  pen.font(10.5, 600, FONT.ui, 0);
  y += 26;
  pen.icon('square-terminal', 18, y + 4, 14, CX.faint, 2);
  pen.font(12.5, 500, FONT.ui).text('pwsh · ~', 42, y + 10, CX.muted);
  pen.font(10.5, 400, FONT.mono).text('~', 42, y + 27, CX.faint);
  pen.circle(rail - 26, y + 18, 4.5, '#5d7376');
  // footer
  pen.strokeRR(12, h - 50, rail - 24, 34, 10, CX.borderStrong, 1);
  pen.icon('plus', 24, h - 40, 14, CX.muted, 2);
  pen.font(12.5, 500, FONT.ui).text(c.newTerminal, 44, h - 33, CX.muted);
}

/**
 * The CortX terminal window. `mode(t)` returns 'cli' while it is only the bare Zorg CLI pane
 * (scene 2), 'full' afterwards. The choreography reveals the chrome with the screen's visible rect.
 */
export function cortxPainter(copy, imgs, portrait) {
  const G = cortxGeom(portrait);
  return {
    G,
    key(t) {
      if (t < T.dive - 0.2) return 0;
      if (t > T.rejoin + 1.6) return 46;
      return t;
    },
    draw(pen, t) {
      const { w, h, title, rail, pad, lh } = G;
      const c = pen.c;
      pen.rect(0, 0, w, h, CX.bg);
      titleBar(pen, G, copy, imgs, t, t >= T.promptEnter);
      sessionRail(pen, G, copy, t);
      // pane
      const px = rail + pad, py = title + pad, pw = w - rail - pad * 2;
      const L = termLayout(copy, G, Math.min(t, T.rejoin + 1.5));
      c.save();
      c.beginPath();
      c.rect(rail, title, w - rail, h - title - L.bottomRes - pad);
      c.clip();
      for (const ln of L.lines) {
        const y = py + ln.y - L.scroll + lh / 2;
        if (y < title - lh || y > h) continue;
        if (ln.welcome) {
          const k = sp(t - ln.t, 'snap');
          c.save();
          c.globalAlpha = clamp(k * 2);
          const bw = Math.min(pw, 520);
          pen.strokeRR(px, y - lh / 2 + 4, bw, lh * 4, 10, CX.clay, 1.2);
          pen.font(G.font, 700, FONT.mono).text('✻', px + 16, y + lh * 0.9, CX.clay);
          pen.font(G.font, 700, FONT.mono).text(copy.cortx.welcome, px + 40, y + lh * 0.9, CX.text);
          pen.font(G.font, 400, FONT.mono).text('cwd: ~/Projects/zorg', px + 40, y + lh * 2.4, CX.faint);
          c.restore();
          continue;
        }
        const k = sp(t - ln.t, 'snap');
        c.save();
        c.globalAlpha = clamp(k * 3);
        drawSpans(pen, ln.spans, px, y + (1 - k) * 6, G, pw);
        c.restore();
      }
      c.restore();
      // bottom: shell prompt (before cc) or Claude Code input box + statusline
      const by = h - pad - L.bottomRes;
      if (t < T.ccEnter) {
        const typed = t >= T.ccType ? (t >= T.ccType + 0.12 ? 'cc' : 'c') : '';
        const yb = Math.min(by, py + (L.lines.length ? L.lines[L.lines.length - 1].y + lh : 0) - L.scroll) + lh / 2;
        const x = drawSpans(pen, [span('~/zorg', CX.ansi.blue), span(' main', CX.ansi.green), span(' ❯ ', CX.primary), span(typed, CX.text)], px, yb, G, pw);
        if (Math.floor(t * 2) % 2 === 0 || typed) pen.rect(x + 1, yb - lh * 0.42, 2, lh * 0.84, CX.primary);
      } else {
        const k = sp(t - T.ccEnter, 'snap');
        c.save();
        c.globalAlpha = clamp(k * 2);
        // spinner while working
        const working = t >= T.promptEnter + 0.1 && t < T.rejoin + 1.4;
        if (working) {
          const secs = Math.floor(t - T.promptEnter);
          pen.font(G.font, 400, FONT.mono).text(sparkGlyph(t) + ' ' + copy.cortx.think + ` (${secs}s · esc)`, px, by + lh * 0.5, CX.clay);
        }
        const iy = by + lh * 1.2;
        pen.strokeRR(px - 4, iy, pw + 8, lh * 2.2, 8, 'rgba(201,216,216,0.28)', 1);
        const n = clamp((t - T.promptType) / 1.25) * copy.cortx.prompt.length;
        const shown = t < T.promptEnter ? copy.cortx.prompt.slice(0, Math.floor(n)) : '';
        const x = drawSpans(pen, [span('> ', CX.faint), span(shown || (t < T.promptType ? copy.cortx.tip : ''), shown ? CX.text : CX.faint)], px + 10, iy + lh * 1.1, G, pw);
        if (!working && (Math.floor(t * 2) % 2 === 0 || shown)) pen.rect((shown ? x : px + 10 + pen.font(G.font, 400, FONT.mono).w('> ')) + 1, iy + lh * 1.1 - lh * 0.42, 2, lh * 0.84, CX.text);
        statusline(pen, G, px, iy + lh * 3.1, t, copy);
        c.restore();
      }
    },
  };
}
