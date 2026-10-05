// Zorg, "Halcyon" dark theme, recreated from apps/web (globals.css, Tickets.tsx, TicketDetail.tsx, Sidebar.tsx).
import { FONT, rgba } from '../engine/canvas.js';
import { clamp, sp, lerp, swap, inv } from '../engine/motion.js';
import { T } from '../timeline.js';

export const Z = {
  bg: '#0f1b1f',
  card: '#18272a',
  text: '#e4f1f1',
  muted: '#95afb2',
  faint: '#678183',
  primary: '#2dd4bf',
  onPrimary: '#06231f',
  border: 'rgba(124,235,222,0.12)',
  borderStrong: 'rgba(124,235,222,0.22)',
  accent: 'rgba(45,212,191,0.16)',
  accentBorder: 'rgba(45,212,191,0.45)',
  sidebar: '#0f1d21',
  glass: '#132226',
  st: { open: '#2aa6f0', progress: '#f0a517', blocked: '#fb6f8e', done: '#1bb89a' },
  pr: ['#7f989b', '#74b3cf', '#f5b73a', '#ff9a5c', '#ff7a88'],
  label: { notes: '#a78bfa', agenda: '#2aa6f0', calendar: '#2aa6f0', rappels: '#f5b73a', reminders: '#f5b73a', ui: '#ec4899', tickets: '#2dd4bf' },
  avatar: { JN: '#8b5cf6', RK: '#f97316', CL: '#d97757', ME: '#3b82f6' },
};

/** Halcyon canvas: three soft radial washes over the background. */
export function canvasWash(pen, w, h) {
  const c = pen.c;
  pen.rect(0, 0, w, h, Z.bg);
  const wash = (x, y, rx, ry, color, a) => {
    c.save();
    c.translate(x, y);
    c.scale(rx, ry);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, rgba(color, a));
    g.addColorStop(0.7, rgba(color, 0));
    c.fillStyle = g;
    c.fillRect(-1, -1, 2, 2);
    c.restore();
  };
  wash(w * 0.12, 0, w * 0.6, h * 0.5, Z.primary, 0.16);
  wash(w, h * 0.28, w * 0.55, h * 0.5, Z.st.blocked, 0.13);
  wash(w * 0.72, h, w * 0.5, h * 0.6, Z.st.open, 0.11);
}

/** Status glyph: Open = ring, In progress = half disc, Done = disc + check. `m` morphs between two states. */
export function statusDot(pen, x, y, size, state, m = null) {
  const c = pen.c;
  const r = size / 2;
  const col = Z.st[state] || Z.st.open;
  c.save();
  c.lineWidth = 2;
  c.strokeStyle = col;
  c.beginPath();
  c.arc(x, y, r - 1, 0, Math.PI * 2);
  c.stroke();
  if (state === 'progress') {
    c.fillStyle = col;
    c.beginPath();
    c.moveTo(x, y);
    c.arc(x, y, r - 1, -Math.PI / 2, Math.PI / 2);
    c.closePath();
    c.fill();
  }
  if (state === 'done') {
    c.fillStyle = col;
    c.beginPath();
    c.arc(x, y, r - 0.5, 0, Math.PI * 2);
    c.fill();
    pen.icon('check', x - r * 0.62, y - r * 0.62, r * 1.24, Z.card, 3.2);
  }
  c.restore();
}

/** Status glyph that morphs from one state to the next (k 0 → 1): the fill sweeps around. */
export function statusMorph(pen, x, y, size, from, to, k) {
  if (k <= 0) return statusDot(pen, x, y, size, from);
  if (k >= 1) return statusDot(pen, x, y, size, to);
  const c = pen.c;
  const r = size / 2;
  const cf = Z.st[from], ct = Z.st[to];
  const col = mixRGB(cf, ct, k);
  c.save();
  c.lineWidth = 2;
  c.strokeStyle = col;
  c.beginPath();
  c.arc(x, y, r - 1, 0, Math.PI * 2);
  c.stroke();
  const f0 = from === 'progress' ? 0.5 : from === 'done' ? 1 : 0;
  const f1 = to === 'progress' ? 0.5 : to === 'done' ? 1 : 0;
  const f = lerp(f0, f1, k);
  c.fillStyle = col;
  c.beginPath();
  c.moveTo(x, y);
  c.arc(x, y, r - 1, -Math.PI / 2, -Math.PI / 2 + f * Math.PI * 2);
  c.closePath();
  c.fill();
  if (to === 'done' && k > 0.6) pen.icon('check', x - r * 0.62, y - r * 0.62, r * 1.24, Z.card, 3.2);
  c.restore();
}

function mixRGB(a, b, k) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (s) => Math.round(((pa >> s) & 255) * (1 - k) + ((pb >> s) & 255) * k);
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}

export function priority(pen, x, cy, level) {
  if (level >= 4) return pen.icon('flame', x - 1, cy - 8, 15, Z.pr[4], 2, Z.pr[4]);
  for (let i = 0; i < 3; i++) {
    const h = 4 + i * 4;
    pen.c.save();
    pen.c.globalAlpha *= i < level ? 1 : 0.26;
    pen.fillRR(x + i * 5, cy + 6 - h, 3, h, 1, i < level ? Z.pr[level] : Z.muted);
    pen.c.restore();
  }
}

export function chip(pen, label, x, cy, color) {
  pen.font(11, 500, FONT.ui);
  const w = pen.w(label) + 25;
  pen.fillRR(x, cy - 10, w, 20, 10, rgba(color, 0.14));
  pen.strokeRR(x, cy - 10, w, 20, 10, rgba(color, 0.36), 1);
  pen.circle(x + 10, cy, 3.5, color);
  pen.text(label, x + 17.5, cy + 0.5, mixRGB(color, Z.text, 0.28));
  return w;
}

export function avatar(pen, x, cy, size, initials) {
  pen.circle(x + size / 2, cy, size / 2, Z.avatar[initials] || '#14b8a6');
  pen.font(size * 0.4, 600, FONT.ui).text(initials, x + size / 2, cy + 0.5, '#ffffff', 'center');
}

/** Measures a Zorg ticket card's height for a given width. */
export function cardHeight(pen, title, w) {
  pen.font(14, 480, FONT.ui);
  const lines = pen.wrap(title, w - 24);
  return 10 + 20 + 8 + lines.length * 19 + 8 + 20 + 10;
}

/**
 * Zorg TicketCard (Tickets.tsx): priority glyph, mono ref, avatar; title 14/480; label chips.
 * opts.selected draws the accent border used for the freshly created ticket.
 */
export function ticketCard(pen, x, y, w, data, opts = {}) {
  const { ref, title, label, prio, who, comments = 0 } = data;
  const h = opts.h ?? cardHeight(pen, title, w);
  const c = pen.c;
  pen.shadow(x, y, w, h, 12, 16, 6, 'rgba(1,6,8,0.55)');
  pen.fillRR(x, y, w, h, 12, opts.bg || Z.card);
  if (opts.selected) {
    pen.fillRR(x, y, w, h, 12, rgba(Z.primary, 0.08 * opts.selected));
    pen.strokeRR(x, y, w, h, 12, rgba(Z.primary, 0.2 + 0.35 * opts.selected), 1.5);
  } else pen.strokeRR(x, y, w, h, 12, Z.border, 1);
  const r1 = y + 10 + 10;
  priority(pen, x + 12, r1, prio);
  pen.font(11, 500, FONT.mono).text('#' + ref, x + 32, r1, Z.faint);
  if (comments) {
    const rx = x + 32 + pen.w('#' + ref) + 10;
    pen.icon('message-square', rx, r1 - 6, 12, Z.faint, 2);
    pen.font(11, 500, FONT.ui).text(String(comments), rx + 16, r1, Z.faint);
  }
  avatar(pen, x + w - 12 - 20, r1, 20, who);
  pen.font(14, 480, FONT.ui);
  const lines = pen.wrap(title, w - 24);
  lines.forEach((l, i) => pen.text(l, x + 12, r1 + 10 + 8 + 9 + i * 19, Z.text));
  const r3 = r1 + 10 + 8 + lines.length * 19 + 8 + 10;
  chip(pen, label, x + 12, r3, Z.label[label] || Z.primary);
  if (opts.status) statusMorph(pen, x + w - 20, r3, 13, opts.status[0], opts.status[1], opts.status[2]);
  return h;
}

// ── data ─────────────────────────────────────────────────────────────────

export function boardData(copy) {
  const mk = (arr, start) => arr.map(([title, label, prio, who], i) => ({ ref: 'ZORG-' + (start - i), title, label, prio, who }));
  return {
    open: mk(copy.zorg.cards.open, 127),
    progress: mk(copy.zorg.cards.progress, 123),
    done: mk(copy.zorg.cards.done, 119),
    hero: { ref: copy.ticket.ref, title: copy.ticket.title, label: copy.ticket.label, prio: 2, who: 'CL' },
  };
}

// ── web board (16:9) ─────────────────────────────────────────────────────

export const BOARD = { w: 1500, h: 920, side: 252, head: 56, colW: 286, gap: 12, pad: 16 };

function sidebar(pen, copy, imgs, h, active = 0, desktop = false) {
  const S = BOARD.side;
  const c = pen.c;
  pen.rect(0, 0, S, h, Z.sidebar);
  pen.rect(S - 1, 0, 1, h, Z.border);
  // logo + name
  c.save();
  pen.rr(18, 18, 32, 32, 7);
  c.clip();
  c.drawImage(imgs.zorg, 18, 18, 32, 32);
  c.restore();
  pen.font(15, 600, FONT.display).text('Zorg', 60, 34, Z.text);
  // project switcher
  pen.fillRR(14, 66, S - 28, 40, 10, 'rgba(24,39,42,0.7)');
  pen.strokeRR(14, 66, S - 28, 40, 10, Z.border, 1);
  pen.circle(32, 86, 5, Z.primary);
  pen.font(13.5, 550, FONT.ui).text(copy.zorg.allProjects, 46, 86, Z.text);
  pen.icon('chevron-down', S - 40, 79, 14, Z.faint, 2);
  // nav
  const groups = [[copy.zorg.groups[0], [[copy.zorg.nav[0], 'layout-grid', '12']]], [copy.zorg.groups[1], [[copy.zorg.nav[1], 'file-text']]], [copy.zorg.groups[2], [[copy.zorg.nav[2], 'bell'], [copy.zorg.nav[3], 'calendar-days']]], [copy.zorg.groups[3], [[copy.zorg.nav[4], 'folder-cog'], [copy.zorg.nav[5], 'settings']]]];
  let y = 134;
  let idx = 0;
  for (const [g, items] of groups) {
    pen.font(10.5, 600, FONT.ui, 0.07).text(g, 24, y, Z.faint);
    pen.font(10.5, 600, FONT.ui, 0);
    y += 22;
    for (const [name, icon, count] of items) {
      const on = idx === active;
      if (on) pen.fillRR(12, y - 17, S - 24, 34, 10, Z.accent);
      pen.icon(icon, 22, y - 9, 18, on ? Z.primary : Z.faint, 2);
      pen.font(14, on ? 550 : 450, FONT.ui).text(name, 50, y, on ? Z.text : Z.muted);
      if (count) pen.font(12, 500, FONT.ui).text(count, S - 26, y, Z.faint, 'right');
      y += 38;
      idx++;
    }
    y += 12;
  }
  // footer
  if (!desktop) {
    pen.icon('monitor', 22, h - 106, 16, Z.faint, 2);
    pen.font(12.5, 450, FONT.ui).text(copy.zorg.download, 46, h - 98, Z.muted);
  }
  pen.fillRR(12, h - 70, S - 24, 54, 10, 'rgba(24,39,42,0.6)');
  pen.strokeRR(12, h - 70, S - 24, 54, 10, Z.border, 1);
  avatar(pen, 24, h - 43, 30, 'ME');
  pen.font(13, 550, FONT.ui).text(copy.lang === 'fr' ? 'Moi' : 'Me', 64, h - 43, Z.text);
  pen.icon('moon', S - 66, h - 51, 16, Z.faint, 2);
  pen.icon('log-out', S - 40, h - 51, 16, Z.faint, 2);
}

function screenHeader(pen, copy, x, w, sub) {
  const H = BOARD.head;
  pen.rect(x, 0, w, H, 'rgba(15,27,31,0.65)');
  pen.rect(x, H - 1, w, 1, Z.border);
  pen.font(18, 600, FONT.display, -0.01).text(copy.zorg.screen, x + 22, H / 2, Z.text);
  const tw = pen.font(18, 600, FONT.display, -0.01).w(copy.zorg.screen);
  pen.font(12, 450, FONT.ui, 0).text(sub, x + 22 + tw + 12, H / 2 + 1, Z.muted);
  // right side actions
  let rx = x + w - 20;
  pen.font(12, 600, FONT.ui);
  const nb = pen.w(copy.zorg.newBtn) + 38;
  rx -= nb;
  pen.fillRR(rx, H / 2 - 16, nb, 32, 10, Z.primary);
  pen.icon('plus', rx + 10, H / 2 - 7, 14, Z.onPrimary, 2.4);
  pen.text(copy.zorg.newBtn, rx + 28, H / 2 + 0.5, Z.onPrimary);
  // segmented control
  rx -= 12 + 4 * 30 + 8;
  pen.fillRR(rx, H / 2 - 17, 4 * 30 + 8, 34, 10, '#162a2e');
  ['layout-grid', 'list', 'table-2', 'flag'].forEach((ic, i) => {
    if (i === 0) pen.fillRR(rx + 4 + i * 30, H / 2 - 13, 30, 26, 7, Z.card);
    pen.icon(ic, rx + 4 + i * 30 + 7, H / 2 - 8, 16, i === 0 ? Z.text : Z.faint, 2);
  });
  // filter
  pen.font(12, 500, FONT.ui);
  const fw = pen.w(copy.zorg.filter) + 36;
  rx -= 10 + fw;
  pen.strokeRR(rx, H / 2 - 16, fw, 32, 10, Z.border, 1);
  pen.icon('filter', rx + 10, H / 2 - 7, 14, Z.muted, 2);
  pen.text(copy.zorg.filter, rx + 28, H / 2 + 0.5, Z.muted);
  // search
  rx -= 10 + 210;
  pen.fillRR(rx, H / 2 - 16, 210, 32, 10, 'rgba(24,39,42,0.6)');
  pen.strokeRR(rx, H / 2 - 16, 210, 32, 10, Z.border, 1);
  pen.icon('search', rx + 10, H / 2 - 7, 14, Z.faint, 2);
  pen.font(12, 450, FONT.ui).text(copy.zorg.search, rx + 30, H / 2 + 0.5, Z.faint);
}

function column(pen, x, y, w, h, title, state, count) {
  pen.fillRR(x, y, w, h, 18, 'rgba(24,39,42,0.42)');
  pen.strokeRR(x, y, w, h, 18, Z.border, 1);
  statusDot(pen, x + 18, y + 22, 11, state);
  pen.font(14, 600, FONT.ui).text(title, x + 32, y + 22, Z.text);
  const tw = pen.w(title);
  pen.font(14, 600, FONT.ui).text(String(count), x + 32 + tw + 8, y + 22, Z.faint);
  pen.icon('plus', x + w - 28, y + 15, 14, Z.faint, 2);
}

/** Where the hero card sits on the board (css px), for the flying card to land exactly on it. */
export function boardSlot(pen, copy) {
  const x = BOARD.side + BOARD.pad + 8;
  const y = BOARD.head + BOARD.pad + 44;
  const w = BOARD.colW - 16;
  const h = cardHeight(pen, copy.ticket.title, w);
  return { x, y, w, h };
}

export function boardPainter(copy, imgs) {
  const D = boardData(copy);
  return {
    key(t) {
      if (t < T.land - 0.4) return 0;
      if (t > T.impact + 1.2 && t < T.explode + 1.5) return T.impact + 1.2;
      if (t > T.explode + 2.5 && t < T.cardIn - 0.05) return T.explode + 2.5;
      if (t > T.cardIn + 0.9 && t < 46) return T.cardIn + 0.9;
      if (t >= 46.9) return 46.9;
      return t;
    },
    draw(pen, t) {
      const { w, h, side, head, colW, gap, pad } = BOARD;
      canvasWash(pen, w, h);
      sidebar(pen, { ...copy, lang: copy.lang }, imgs, h, 0);
      screenHeader(pen, copy, side, w - side, copy.zorg.count.replace('12', String(t >= T.land ? 12 : 11)));
      const cols = [
        ['Open', 'open', D.open],
        ['In progress', 'progress', D.progress],
        ['Blocked', 'blocked', []],
        ['Done', 'done', D.done],
      ];
      const slot = boardSlot(pen, copy);
      // the Open column makes room for the new card, then closes when the card lifts off again (T.cardIn);
      // in the finale the ticket sits at the top of Done
      const finale = t >= 46;
      const open = finale ? 0 : sp(t - (T.land - 0.3), 'base') - sp(t - T.cardIn, 'base');
      const arrived = t >= T.impact - 0.02 && t < T.cardIn && !finale;
      const sel = arrived ? 1 - clamp(inv(T.explode + 1.5, T.explode + 2.5, t)) : 0;
      const doneOpen = finale ? sp(t - 46, 'base') : 0;
      cols.forEach(([title, state, cards], ci) => {
        const x = side + pad + ci * (colW + gap);
        const y = head + pad;
        const ch = h - head - pad * 2;
        const extra = (ci === 0 && arrived) || (ci === 3 && finale) ? 1 : 0;
        column(pen, x, y, colW, ch, title, state, cards.length + extra);
        let cy = y + 44;
        if (ci === 0) cy += (slot.h + 8) * open;
        if (ci === 3) cy += (slot.h + 8) * doneOpen;
        if (ci === 0 && arrived) ticketCard(pen, slot.x, slot.y, slot.w, D.hero, { selected: sel });
        if (ci === 3 && finale) ticketCard(pen, x + 8, y + 44, colW - 16, D.hero, { status: ['done', 'done', 1] });
        if (cards.length === 0) {
          pen.c.setLineDash([5, 5]);
          pen.strokeRR(x + 8, cy, colW - 16, 64, 12, Z.borderStrong, 1);
          pen.c.setLineDash([]);
          pen.font(12, 450, FONT.ui).text(copy.lang === 'fr' ? 'Aucun ticket' : 'No tickets', x + colW / 2, cy + 32, Z.faint, 'center');
        }
        cards.forEach((card) => {
          const ch2 = ticketCard(pen, x + 8, cy, colW - 16, card, { comments: card.prio > 1 ? 2 : 0 });
          cy += ch2 + 8;
        });
      });
    },
  };
}

// ── desktop app (Tauri) list view ────────────────────────────────────────

export function desktopPainter(copy, imgs) {
  const D = boardData(copy);
  return {
    key: () => 0,
    draw(pen) {
      const { w, h, side } = BOARD;
      canvasWash(pen, w, h);
      // Tauri title bar
      pen.rect(0, 0, w, 36, Z.glass);
      pen.rect(0, 35, w, 1, Z.border);
      const c = pen.c;
      c.save();
      pen.rr(12, 9, 18, 18, 4);
      c.clip();
      c.drawImage(imgs.zorg, 12, 9, 18, 18);
      c.restore();
      pen.font(12, 500, FONT.display).text('Zorg', 38, 18, Z.muted);
      pen.font(10, 400, FONT.mono).text('v0.8.0', 72, 18.5, 'rgba(149,175,178,0.6)');
      // window buttons
      const bx = w - 46 * 3;
      pen.line(bx + 18, 18, bx + 28, 18, Z.muted, 1);
      pen.strokeRR(bx + 46 + 18, 13, 10, 10, 1.5, Z.muted, 1);
      pen.line(bx + 92 + 18, 13, bx + 92 + 28, 23, Z.muted, 1);
      pen.line(bx + 92 + 28, 13, bx + 92 + 18, 23, Z.muted, 1);
      c.save();
      c.translate(0, 36);
      sidebar(pen, copy, imgs, h - 36, 0, true);
      // list view
      const x0 = side + 24;
      pen.font(18, 600, FONT.display).text(copy.zorg.screen, x0, 30, Z.text);
      let y = 70;
      const rows = [['Open', 'open', [D.hero, ...D.open]], ['In progress', 'progress', D.progress]];
      for (const [name, st, list] of rows) {
        statusDot(pen, x0 + 6, y, 11, st);
        pen.font(13, 600, FONT.ui).text(name, x0 + 20, y, Z.text);
        pen.font(13, 600, FONT.ui).text(String(list.length), x0 + 26 + pen.w(name), y, Z.faint);
        y += 30;
        for (const r of list) {
          const hero = r === D.hero;
          if (hero) {
            pen.fillRR(x0 - 8, y - 18, w - side - 48, 36, 10, Z.accent);
            pen.strokeRR(x0 - 8, y - 18, w - side - 48, 36, 10, Z.accentBorder, 1);
          }
          priority(pen, x0 + 4, y, r.prio);
          statusDot(pen, x0 + 34, y, 11, st);
          pen.font(11, 500, FONT.mono).text('#' + r.ref, x0 + 50, y, Z.faint);
          pen.font(14, 500, FONT.ui).text(r.title, x0 + 140, y, Z.text);
          chip(pen, r.label, x0 + 150 + pen.w(r.title), y, Z.label[r.label] || Z.primary);
          avatar(pen, w - side - 70 + x0 - 24, y, 20, r.who);
          y += 40;
        }
        y += 14;
      }
      c.restore();
    },
  };
}

// ── ticket detail (modal) ────────────────────────────────────────────────

export const DETAIL = { w: 980, h: 660 };

export function detailPainter(copy, imgs) {
  const d = copy.zorg.detail;
  return {
    key(t) {
      if (t < T.detail - 0.5) return 0;
      if (t > T.comment + 3) return T.comment + 3;
      return t;
    },
    draw(pen, t) {
      const { w, h } = DETAIL;
      const c = pen.c;
      pen.fillRR(0, 0, w, h, 22, '#132428');
      pen.strokeRR(0, 0, w, h, 22, Z.borderStrong, 1);
      // close button
      pen.circle(w - 34, 34, 15, 'rgba(24,39,42,0.8)');
      pen.icon('x', w - 42, 26, 16, Z.muted, 2);
      // breadcrumb + title
      pen.font(12, 500, FONT.mono).text('#' + copy.ticket.ref, 32, 36, Z.faint);
      pen.font(24, 600, FONT.display, -0.015).text(copy.ticket.title, 32, 74, Z.text);
      pen.font(24, 600, FONT.display, 0);
      // left column
      const lx = 32, rx = w - 32 - 208;
      chip(pen, copy.ticket.label, lx, 114, Z.label.notes);
      pen.font(10.5, 600, FONT.ui, 0.07).text(d.description, lx, 152, Z.faint);
      pen.font(10.5, 600, FONT.ui, 0);
      pen.fillRR(lx, 166, rx - lx - 28, 64, 12, 'rgba(24,39,42,0.4)');
      pen.strokeRR(lx, 166, rx - lx - 28, 64, 12, Z.border, 1);
      pen.font(13.5, 450, FONT.ui);
      pen.wrap(d.descText, rx - lx - 60).forEach((l, i) => pen.text(l, lx + 16, 188 + i * 20, Z.text));
      pen.icon('message-square', lx, 254, 13, Z.faint, 2);
      pen.font(10.5, 600, FONT.ui, 0.07).text(d.comments, lx + 20, 261, Z.faint);
      pen.font(10.5, 600, FONT.ui, 0);
      // activity
      const act = sp(t - T.activity, 'snap');
      let y = 290;
      const hist = (txt, k) => {
        c.save();
        c.globalAlpha = k;
        pen.icon('history', lx, y - 7 + (1 - k) * 8, 13, Z.faint, 2);
        pen.font(11.5, 600, FONT.ui).text('Claude', lx + 20, y + (1 - k) * 8, Z.muted);
        const nw = pen.w('Claude');
        pen.font(11.5, 450, FONT.ui).text(' · ' + txt + ' · ' + d.today, lx + 20 + nw, y + (1 - k) * 8, Z.faint);
        c.restore();
      };
      hist('Statut → In progress'.replace('Statut', copy.lang === 'fr' ? 'Statut' : 'Status'), 1);
      y += 24;
      if (act > 0) hist(d.activity, clamp(act * 1.5));
      y += 30;
      // comment card (Claude's comment, typed)
      const kc = sp(t - T.comment, 'base');
      if (kc > 0) {
        const cw = rx - lx - 28;
        pen.font(13.5, 450, FONT.ui);
        const lines = pen.wrap(d.comment, cw - 30);
        const ch = 44 + lines.length * 21 + 12;
        const yy = y + (1 - kc) * 18;
        c.save();
        c.globalAlpha = clamp(kc * 2);
        pen.fillRR(lx, yy, cw, ch, 13, 'rgba(24,39,42,0.5)');
        pen.strokeRR(lx, yy, cw, ch, 13, Z.border, 1);
        avatar(pen, lx + 14, yy + 22, 20, 'CL');
        pen.font(12, 550, FONT.ui).text('Claude', lx + 42, yy + 22, Z.text);
        pen.font(11, 450, FONT.ui).text('· ' + d.today, lx + 42 + pen.font(12, 550, FONT.ui).w('Claude') + 6, yy + 22.5, Z.faint);
        // typing: characters appear over 1.5 s
        const n = Math.floor(clamp((t - T.comment - 0.15) / 1.5) * d.comment.length);
        let left = n;
        pen.font(13.5, 450, FONT.ui);
        lines.forEach((l, i) => {
          if (left <= 0) return;
          const s = l.slice(0, left);
          left -= l.length + 1;
          pen.text(s, lx + 14, yy + 50 + i * 21, Z.text);
        });
        c.restore();
      }
      // right column: properties
      pen.rect(rx - 20, 104, 1, h - 170, Z.border);
      const props = d.props;
      const k = sp(t - T.done, 'snap');
      let py = 112;
      props.forEach((p, i) => {
        pen.font(10.5, 600, FONT.ui, 0.07).text(p.toUpperCase(), rx, py, Z.faint);
        pen.font(10.5, 600, FONT.ui, 0);
        const by = py + 12;
        const isStatus = i === 0;
        pen.fillRR(rx, by, 208, 36, 10, 'rgba(24,39,42,0.6)');
        pen.strokeRR(rx, by, 208, 36, 10, isStatus && k > 0 && k < 1.2 ? rgba(Z.st.done, 0.25 + 0.4 * (1 - Math.abs(1 - k))) : Z.border, 1);
        const cy = by + 18;
        if (isStatus) {
          statusMorph(pen, rx + 18, cy, 13, 'progress', 'done', clamp(k));
          // label swaps inside the morphing control
          const a1 = swap(t, -10, T.done), a2 = swap(t, T.done);
          c.save();
          c.globalAlpha = a1;
          pen.font(13, 500, FONT.ui).text('In progress', rx + 34, cy + (1 - a1) * -6, Z.text);
          c.globalAlpha = a2;
          pen.font(13, 500, FONT.ui).text('Done', rx + 34, cy + (1 - a2) * 6, Z.text);
          c.restore();
        } else if (i === 1) {
          priority(pen, rx + 13, cy, 2);
          pen.font(13, 500, FONT.ui).text(copy.ticket.priority, rx + 34, cy, Z.text);
        } else if (i === 2) {
          avatar(pen, rx + 10, cy, 20, 'CL');
          pen.font(13, 500, FONT.ui).text(d.assignee, rx + 38, cy, Z.text);
        } else if (i === 3) {
          pen.icon('rocket', rx + 11, cy - 7, 14, Z.muted, 2);
          pen.font(13, 500, FONT.ui).text(copy.ticket.project, rx + 34, cy, Z.text);
        } else {
          chip(pen, copy.ticket.label, rx + 10, cy, Z.label.notes);
        }
        py += 70;
      });
      pen.font(11, 450, FONT.ui).text(d.created, rx, py + 4, Z.faint);
      // footer
      pen.rect(32, h - 58, w - 64, 1, Z.border);
      pen.icon('archive', w - 140, h - 38, 14, Z.muted, 2);
      pen.font(12.5, 500, FONT.ui).text(d.archive, w - 120, h - 31, Z.muted);
    },
  };
}

// ── mobile list (9:16) ───────────────────────────────────────────────────

export const MOBILE = { w: 420, h: 860 };

export function mobileSlot(pen, copy) {
  return { x: 14, y: 140, w: MOBILE.w - 28, h: cardHeight(pen, copy.ticket.title, MOBILE.w - 28) };
}

export function mobilePainter(copy, imgs) {
  const D = boardData(copy);
  return {
    key(t) {
      if (t < T.land - 0.4) return 0;
      if (t > T.impact + 1.2 && t < T.explode + 1.5) return T.impact + 1.2;
      if (t > T.explode + 2.5 && t < T.cardIn - 0.05) return T.explode + 2.5;
      if (t > T.cardIn + 0.9) return T.cardIn + 0.9;
      return t;
    },
    draw(pen, t) {
      const { w, h } = MOBILE;
      canvasWash(pen, w, h);
      const c = pen.c;
      // header
      c.save();
      pen.rr(16, 22, 28, 28, 7);
      c.clip();
      c.drawImage(imgs.zorg, 16, 22, 28, 28);
      c.restore();
      pen.font(20, 600, FONT.display).text(copy.zorg.screen, 54, 37, Z.text);
      pen.font(12, 450, FONT.ui).text(copy.zorg.count.replace('12', String(t >= T.land ? 12 : 11)), 54 + pen.font(20, 600, FONT.display).w(copy.zorg.screen) + 10, 38, Z.muted);
      pen.fillRR(w - 50, 20, 34, 34, 10, Z.primary);
      pen.icon('plus', w - 42, 28, 18, Z.onPrimary, 2.4);
      pen.fillRR(14, 66, w - 28, 36, 10, 'rgba(24,39,42,0.6)');
      pen.strokeRR(14, 66, w - 28, 36, 10, Z.border, 1);
      pen.icon('search', 26, 76, 15, Z.faint, 2);
      pen.font(13, 450, FONT.ui).text(copy.zorg.search.replace(' (/)', ''), 48, 84, Z.faint);
      // Open section
      statusDot(pen, 22, 122, 11, 'open');
      pen.font(13, 600, FONT.ui).text('Open', 36, 122, Z.text);
      const arrived = t >= T.impact - 0.02 && t < T.cardIn;
      pen.font(13, 600, FONT.ui).text(String(D.open.length + (arrived ? 1 : 0)), 36 + pen.w('Open') + 6, 122, Z.faint);
      const slot = mobileSlot(pen, copy);
      const open = sp(t - (T.land - 0.3), 'base') - sp(t - T.cardIn, 'base');
      let y = slot.y + (slot.h + 8) * open;
      const sel = arrived ? 1 - clamp(inv(T.explode + 1.5, T.explode + 2.5, t)) : 0;
      if (arrived) ticketCard(pen, slot.x, slot.y, slot.w, D.hero, { selected: sel });
      for (const card of D.open.slice(0, 3)) {
        y += ticketCard(pen, 14, y, w - 28, card) + 8;
      }
      y += 10;
      statusDot(pen, 22, y + 8, 11, 'progress');
      pen.font(13, 600, FONT.ui).text('In progress', 36, y + 8, Z.text);
      y += 26;
      for (const card of D.progress) y += ticketCard(pen, 14, y, w - 28, card) + 8;
      // bottom tab bar
      pen.rect(0, h - 74, w, 74, '#10201f');
      pen.rect(0, h - 74, w, 1, Z.border);
      const tabs = [['layout-grid', copy.zorg.mobileTabs[0]], ['file-text', copy.zorg.mobileTabs[1]], ['bell', copy.zorg.mobileTabs[2]], ['calendar-days', copy.zorg.mobileTabs[3]], ['settings', copy.zorg.mobileTabs[5]]];
      tabs.forEach(([ic, name], i) => {
        const cx = (w / tabs.length) * (i + 0.5);
        if (i === 0) pen.fillRR(cx - 24, h - 64, 48, 28, 14, Z.accent);
        pen.icon(ic, cx - 9, h - 59, 18, i === 0 ? Z.primary : Z.faint, 2);
        pen.font(10, 500, FONT.ui).text(name, cx, h - 24, i === 0 ? Z.text : Z.faint, 'center');
      });
    },
  };
}

// ── ticket detail as the mobile bottom sheet (9:16) ──────────────────────

export const DETAIL_P = { w: 520, h: 960 };

export function detailPainterPort(copy) {
  const d = copy.zorg.detail;
  return {
    key(t) {
      if (t < T.detail - 0.5) return 0;
      if (t > T.comment + 3) return T.comment + 3;
      return t;
    },
    draw(pen, t) {
      const { w, h } = DETAIL_P;
      const c = pen.c;
      pen.fillRR(0, 0, w, h, 28, '#132428');
      pen.strokeRR(0, 0, w, h, 28, Z.borderStrong, 1);
      pen.fillRR(w / 2 - 22, 12, 44, 5, 3, 'rgba(149,175,178,0.4)');
      pen.font(13, 500, FONT.mono).text('#' + copy.ticket.ref, 26, 48, Z.faint);
      pen.font(26, 600, FONT.display, -0.015);
      const tl = pen.wrap(copy.ticket.title, w - 52);
      tl.forEach((l, i) => pen.text(l, 26, 86 + i * 32, Z.text));
      pen.font(26, 600, FONT.display, 0);
      let y = 86 + tl.length * 32 + 14;
      // properties grid 2 × 2
      const k = sp(t - T.done, 'snap');
      const cell = (i, x, yy, label) => {
        pen.font(11, 600, FONT.ui, 0.07).text(label.toUpperCase(), x, yy, Z.faint);
        pen.font(11, 600, FONT.ui, 0);
        const by = yy + 12, bw = (w - 52 - 12) / 2;
        pen.fillRR(x, by, bw, 42, 12, 'rgba(24,39,42,0.6)');
        pen.strokeRR(x, by, bw, 42, 12, i === 0 && k > 0 && k < 1.2 ? rgba(Z.st.done, 0.25 + 0.4 * (1 - Math.abs(1 - k))) : Z.border, 1);
        const cy = by + 21;
        if (i === 0) {
          statusMorph(pen, x + 20, cy, 15, 'progress', 'done', clamp(k));
          const a1 = swap(t, -10, T.done), a2 = swap(t, T.done);
          c.save();
          c.globalAlpha = a1;
          pen.font(15, 500, FONT.ui).text('In progress', x + 38, cy - (1 - a1) * 6, Z.text);
          c.globalAlpha = a2;
          pen.font(15, 500, FONT.ui).text('Done', x + 38, cy + (1 - a2) * 6, Z.text);
          c.restore();
        } else if (i === 1) {
          priority(pen, x + 14, cy, 2);
          pen.font(15, 500, FONT.ui).text(copy.ticket.priority, x + 36, cy, Z.text);
        } else if (i === 2) {
          avatar(pen, x + 12, cy, 22, 'CL');
          pen.font(15, 500, FONT.ui).text(d.assignee, x + 42, cy, Z.text);
        } else {
          chip(pen, copy.ticket.label, x + 12, cy, Z.label.notes);
        }
      };
      const bw = (w - 52 - 12) / 2;
      cell(0, 26, y, d.props[0]);
      cell(1, 26 + bw + 12, y, d.props[1]);
      cell(2, 26, y + 72, d.props[2]);
      cell(3, 26 + bw + 12, y + 72, d.props[4]);
      y += 160;
      pen.font(11, 600, FONT.ui, 0.07).text(d.description, 26, y, Z.faint);
      pen.font(11, 600, FONT.ui, 0);
      pen.font(15, 450, FONT.ui);
      const dl = pen.wrap(d.descText, w - 84);
      pen.fillRR(26, y + 14, w - 52, dl.length * 22 + 26, 12, 'rgba(24,39,42,0.4)');
      pen.strokeRR(26, y + 14, w - 52, dl.length * 22 + 26, 12, Z.border, 1);
      dl.forEach((l, i) => pen.text(l, 42, y + 38 + i * 22, Z.text));
      y += dl.length * 22 + 66;
      pen.icon('message-square', 26, y - 7, 13, Z.faint, 2);
      pen.font(11, 600, FONT.ui, 0.07).text(d.comments, 46, y, Z.faint);
      pen.font(11, 600, FONT.ui, 0);
      y += 28;
      const hist = (txt, kk) => {
        c.save();
        c.globalAlpha = kk;
        pen.icon('history', 26, y - 7 + (1 - kk) * 8, 13, Z.faint, 2);
        pen.font(13, 600, FONT.ui).text('Claude', 46, y + (1 - kk) * 8, Z.muted);
        const nw = pen.w('Claude');
        pen.font(13, 450, FONT.ui).text(' · ' + txt + ' · ' + d.today, 46 + nw, y + (1 - kk) * 8, Z.faint);
        c.restore();
      };
      hist((copy.lang === 'fr' ? 'Statut' : 'Status') + ' → In progress', 1);
      y += 26;
      const act = sp(t - T.activity, 'snap');
      if (act > 0) hist(d.activity, clamp(act * 1.5));
      y += 30;
      const kc = sp(t - T.comment, 'base');
      if (kc > 0) {
        const cw = w - 52;
        pen.font(15, 450, FONT.ui);
        const lines = pen.wrap(d.comment, cw - 30);
        const ch = 48 + lines.length * 23 + 12;
        const yy = y + (1 - kc) * 18;
        c.save();
        c.globalAlpha = clamp(kc * 2);
        pen.fillRR(26, yy, cw, ch, 14, 'rgba(24,39,42,0.5)');
        pen.strokeRR(26, yy, cw, ch, 14, Z.border, 1);
        avatar(pen, 40, yy + 24, 22, 'CL');
        pen.font(13.5, 550, FONT.ui).text('Claude', 72, yy + 24, Z.text);
        pen.font(12, 450, FONT.ui).text('· ' + d.today, 72 + pen.font(13.5, 550, FONT.ui).w('Claude') + 6, yy + 24.5, Z.faint);
        const n = Math.floor(clamp((t - T.comment - 0.15) / 1.5) * d.comment.length);
        let left = n;
        pen.font(15, 450, FONT.ui);
        lines.forEach((l, i) => {
          if (left <= 0) return;
          pen.text(l.slice(0, left), 40, yy + 56 + i * 23, Z.text);
          left -= l.length + 1;
        });
        c.restore();
      }
    },
  };
}
