// The smaller pieces: the travelling ticket card, MCP panel, layer labels, pre-commit, commit card,
// 1Password request, signature seal, the generated document and diagram, the final title.
import { FONT, rgba } from '../engine/canvas.js';
import { clamp, sp, lerp, swap, inv, smoother } from '../engine/motion.js';
import { T } from '../timeline.js';
import { Z, ticketCard, cardHeight, chip, statusMorph, priority, avatar, canvasWash } from './zorg.js';
import { ticketCardChat } from './phone.js';
import { CX } from './cortx.js';

const AMBER = '#ffc107';
const AMBER_L = '#ffd454';

// ── the travelling ticket card ───────────────────────────────────────────

export const CARD = { w: 360, h: 150 };

/** Rects (css px inside the card canvas) of the two looks; the screen morphs between them. */
export function cardLooks(pen, copy, zw) {
  const chat = { x: 0, y: 0, w: 354, h: 132, r: 14 };
  const zh = cardHeight(pen, copy.ticket.title, zw);
  const zorg = { x: 0, y: 0, w: zw, h: zh, r: 12 };
  return { chat, zorg };
}

export function cardPainter(copy, zw, morph) {
  const hero = { ref: copy.ticket.ref, title: copy.ticket.title, label: copy.ticket.label, prio: 2, who: 'CL' };
  return {
    key(t) {
      if (t > T.status + 0.8 && t < T.stamp - 0.1) return T.status + 0.8;
      return t;
    },
    draw(pen, t, scr) {
      const m = morph(t); // 0 = claude.ai card, 1 = Zorg card
      const L = cardLooks(pen, copy, zw);
      const r = {
        w: lerp(L.chat.w, L.zorg.w, m),
        h: lerp(L.chat.h, L.zorg.h, m),
      };
      // the two looks overlap while the box morphs, so the card is never empty
      const a0 = 1 - smoother(clamp((m - 0.2) / 0.4));
      const a1 = smoother(clamp((m - 0.4) / 0.4));
      pen.fillRR(0, 0, r.w, r.h, 14, m < 0.5 ? '#1f1e1d' : Z.card);
      if (a0 > 0) ticketCardChat(pen, copy, 0, 0, r.w, r.h, a0);
      if (a1 > 0) {
        pen.c.save();
        pen.c.globalAlpha = a1;
        const st = t < T.status ? ['open', 'open', 0] : ['open', 'progress', clamp(sp(t - T.status, 'snap'))];
        ticketCard(pen, 0, 0, r.w, hero, { status: t > T.cardIn - 1 ? st : null, h: r.h });
        pen.c.restore();
      }
    },
  };
}

// ── MCP panel (scene 2 layer) ────────────────────────────────────────────

export const MCPP = { w: 1100, h: 690 };

export function mcpPainter(copy, imgs) {
  return {
    key: () => 0,
    draw(pen) {
      const { w, h } = MCPP;
      const c = pen.c;
      pen.fillRR(0, 0, w, h, 22, '#0d191c');
      pen.strokeRR(0, 0, w, h, 22, Z.borderStrong, 1);
      c.save();
      pen.rr(28, 26, 30, 30, 7);
      c.clip();
      c.drawImage(imgs.zorg, 28, 26, 30, 30);
      c.restore();
      pen.font(17, 600, FONT.display).text('zorg', 70, 41, Z.text);
      pen.font(13, 500, FONT.mono).text('MCP · Streamable HTTP · OAuth 2.1', 70 + pen.font(17, 600, FONT.display).w('zorg') + 14, 42, Z.faint);
      pen.rect(28, 76, w - 56, 1, Z.border);
      const mono = (s, x, y, col, wgt = 400) => pen.font(16, wgt, FONT.mono).text(s, x, y, col);
      let y = 112;
      mono('→', 28, y, Z.primary, 700);
      mono('{"method":"tools/call","params":{"name":"show_ticket",', 56, y, Z.muted);
      y += 26;
      mono(' "arguments":{"ticket":"ZORG-128"}}}', 56, y, Z.muted);
      y += 46;
      mono('←', 28, y, Z.st.done, 700);
      mono(copy.mcp.head, 56, y, Z.text, 700);
      y += 34;
      copy.mcp.rows.forEach((row) => {
        mono(row.replace(/\*\*/g, ''), 56, y, Z.muted);
        y += 28;
      });
      y += 14;
      mono('## Description', 56, y, Z.text, 700);
      y += 30;
      pen.font(16, 400, FONT.mono);
      pen.wrap(copy.zorg.detail.descText, w - 120).forEach((l) => { mono(l, 56, y, Z.muted); y += 26; });
    },
  };
}

/** Where the ZORG-128 mention sits on each layer (css px), for the thread of light. */
export const MCP_ANCHOR = { x: 56, y: 184 };

// ── in-world label ───────────────────────────────────────────────────────

export function labelPainter(title, sub, align = 'left', w = 520) {
  const x = align === 'right' ? w - 6 : 4;
  return {
    key: () => 0,
    draw(pen) {
      pen.font(36, 600, FONT.display, -0.02).text(title, x, 32, '#e4f1f1', align);
      pen.font(20, 500, FONT.ui, 0).text(sub, x, 72, '#95afb2', align);
    },
  };
}

// ── pre-commit hook panel ────────────────────────────────────────────────

export const HOOK = { w: 560, h: 330 };

export function hookPainter(copy) {
  const hk = copy.hook;
  return {
    key(t) {
      if (t < T.gate - 0.2) return 0;
      if (t > T.checks[2] + 1) return T.checks[2] + 1;
      return t;
    },
    draw(pen, t) {
      const { w, h } = HOOK;
      pen.fillRR(0, 0, w, h, 20, '#0d191c');
      pen.strokeRR(0, 0, w, h, 20, Z.borderStrong, 1);
      pen.icon('shield-check', 26, 20, 22, Z.primary, 2);
      pen.font(18, 600, FONT.mono).text(hk.title, 60, 31, Z.text);
      pen.font(13, 400, FONT.mono).text('.githooks/pre-commit', w - 26, 31, Z.faint, 'right');
      pen.font(13.5, 450, FONT.ui).text(hk.sub, 60, 52, Z.muted);
      pen.rect(26, 68, w - 52, 1, Z.border);
      hk.checks.forEach((label, i) => {
        const y = 104 + i * 54;
        const k = sp(t - T.checks[i], 'snap');
        const scan = clamp(inv(T.gate + i * 0.5, T.checks[i], t));
        if (k <= 0) {
          // scanning: a dashed ring that turns
          pen.c.save();
          pen.c.translate(42, y);
          pen.c.rotate(t * 5);
          pen.c.setLineDash([4, 4]);
          pen.ring(0, 0, 13, rgba(Z.primary, 0.3 + 0.5 * scan), 2);
          pen.c.restore();
        } else {
          pen.circle(42, y, 13 * (0.7 + 0.3 * k), Z.st.done);
          pen.icon('check', 34, y - 8, 16, Z.onPrimary, 3);
        }
        pen.font(19, 550, FONT.ui).text(label, 72, y, k > 0 ? Z.text : Z.muted);
      });
      const kf = sp(t - (T.checks[2] + 0.5), 'snap');
      pen.c.save();
      pen.c.globalAlpha = clamp(kf * 2);
      pen.fillRR(26, h - 54, w - 52, 34, 10, rgba(Z.st.done, 0.14));
      pen.font(14, 600, FONT.ui).text(hk.ok, w / 2, h - 37, Z.st.done, 'center');
      pen.c.restore();
    },
  };
}

// ── commit card ──────────────────────────────────────────────────────────

export const COMMIT = { w: 640, h: 150 };

export function commitPainter(copy) {
  const hk = copy.hook, op = copy.op;
  return {
    key(t) {
      if (t < T.stamp - 0.05) return 0;
      if (t > T.stamp + 0.8) return T.stamp + 0.8;
      return t;
    },
    draw(pen, t) {
      const { w, h } = COMMIT;
      pen.fillRR(0, 0, w, h, 18, '#13252a');
      pen.strokeRR(0, 0, w, h, 18, Z.borderStrong, 1);
      pen.icon('git-commit-horizontal', 24, 26, 22, Z.muted, 2);
      const signed = t >= T.stamp;
      pen.font(15, 600, FONT.mono).text(signed ? '7c1e9a2' : '·······', 58, 38, signed ? AMBER_L : Z.faint);
      pen.font(13, 400, FONT.mono).text('main', 140, 38.5, CX.ansi.green);
      pen.font(19, 600, FONT.ui);
      const lines = pen.wrap(hk.commitMsg, w - 48);
      lines.forEach((l, i) => pen.text(l, 24, 80 + i * 26, Z.text));
      pen.font(13, 500, FONT.mono).text('ZORG-128', 24, 86 + lines.length * 26, Z.primary);
      pen.font(13, 400, FONT.ui).text(hk.files, 24 + pen.font(13, 500, FONT.mono).w('ZORG-128') + 14, 86 + lines.length * 26, Z.faint);
      // signature badge, stamped at T.stamp
      const k = sp(t - T.stamp, 'snap');
      if (k > 0) {
        const bw = 170, bx = w - 24 - bw, by = 18;
        pen.c.save();
        pen.c.globalAlpha = clamp(k * 3);
        pen.fillRR(bx, by, bw, 36, 18, rgba(AMBER, 0.16));
        pen.strokeRR(bx, by, bw, 36, 18, rgba(AMBER, 0.6), 1.5);
        pen.icon('badge-check', bx + 12, by + 7, 22, AMBER_L, 2);
        pen.font(14, 650, FONT.ui).text(op.signed + ' · ' + op.verified, bx + 42, by + 18.5, AMBER_L);
        pen.c.restore();
      }
    },
  };
}

// ── 1Password request ────────────────────────────────────────────────────

export const OP = { w: 520, h: 330 };

export function opPainter(copy, cursor) {
  const op = copy.op;
  return {
    key(t) {
      if (t < T.op - 0.3) return 0;
      if (t > T.stamp + 0.2) return T.stamp + 0.2;
      return t;
    },
    draw(pen, t) {
      const { w, h } = OP;
      const c = pen.c;
      pen.fillRR(0, 0, w, h, 16, '#1d1f23');
      pen.strokeRR(0, 0, w, h, 16, 'rgba(255,255,255,0.10)', 1);
      // app mark (simplified: a blue disc with a key slot)
      pen.circle(44, 42, 16, '#1a73e8');
      pen.fillRR(41.5, 31, 5, 22, 2.5, '#ffffff');
      pen.font(14, 600, FONT.ui).text(op.app, 70, 42, '#9aa0a6');
      pen.font(19, 700, FONT.ui);
      const tl = pen.wrap(op.title, w - 56);
      tl.forEach((l, i) => pen.text(l, 28, 86 + i * 25, '#f1f3f4'));
      pen.font(14.5, 450, FONT.ui).text(op.body, 28, 86 + tl.length * 25 + 8, '#c9cdd2');
      // key row
      pen.fillRR(28, 172, w - 56, 54, 12, '#26292e');
      pen.icon('key-round', 44, 188, 22, '#c9cdd2', 2);
      pen.font(15, 600, FONT.ui).text(op.key, 80, 192, '#f1f3f4');
      pen.font(12.5, 450, FONT.mono).text(op.keyType, 80, 211, '#9aa0a6');
      // buttons
      const press = sp(t - (T.click - 0.06), 'snap') - sp(t - (T.click + 0.1), 'snap');
      const bw = (w - 56 - 12) / 2;
      pen.fillRR(28, h - 74, bw, 46, 10, '#2f3237');
      pen.font(15, 600, FONT.ui).text(op.deny, 28 + bw / 2, h - 51, '#e8eaed', 'center');
      c.save();
      const ox = 28 + bw + 12 + bw / 2, oy = h - 51;
      c.translate(ox, oy);
      c.scale(1 - 0.05 * press, 1 - 0.05 * press);
      const hover = clamp(inv(T.cursor + 0.5, T.click - 0.1, t));
      pen.fillRR(-bw / 2, -23, bw, 46, 10, hover > 0 ? '#2b7de9' : '#1a73e8');
      pen.font(15, 650, FONT.ui).text(op.ok, 0, 0.5, '#ffffff', 'center');
      c.restore();
      // cursor
      const cp = cursor(t);
      if (cp) {
        c.save();
        c.translate(cp[0], cp[1]);
        c.scale(1.25 - 0.1 * press, 1.25 - 0.1 * press);
        const p = new Path2D('M0 0 L0 17 L4.2 13 L7.2 19.6 L10 18.4 L7 11.9 L12.6 11.6 Z');
        c.fillStyle = '#ffffff';
        c.strokeStyle = '#111111';
        c.lineWidth = 1.2;
        c.lineJoin = 'round';
        c.fill(p);
        c.stroke(p);
        c.restore();
      }
    },
  };
}

// ── signature seal ───────────────────────────────────────────────────────

export function sealPainter(copy) {
  return {
    key: () => 0,
    draw(pen) {
      const s = 200;
      pen.circle(s / 2, s / 2, s / 2 - 4, '#2a2410');
      pen.ring(s / 2, s / 2, s / 2 - 4, AMBER, 5);
      pen.ring(s / 2, s / 2, s / 2 - 18, rgba(AMBER, 0.45), 2);
      pen.icon('key-round', s / 2 - 30, s / 2 - 44, 60, AMBER_L, 2.2);
      pen.font(24, 700, FONT.display, 0.04).text(copy.op.signed.toUpperCase(), s / 2, s / 2 + 42, AMBER_L, 'center');
    },
  };
}

// ── the document (skill "documents") ────────────────────────────────────

export const DOC = { w: 620, h: 877 };

export function docPainter(copy) {
  const d = copy.doc;
  return {
    key(t) { return t < T.doc + 1.6 ? t : T.doc + 1.6; },
    draw(pen, t) {
      const { w, h } = DOC;
      const ink = '#1b2427', soft = '#5b6a6e', line = '#d9dedd', teal = '#0d9488';
      pen.rect(0, 0, w, h, '#fbfaf7');
      // cover band
      pen.rect(0, 0, w, 300, '#f1efe8');
      pen.rect(56, 64, 40, 4, teal);
      pen.font(12, 700, FONT.ui, 0.12).text(d.eyebrow, 56, 96, teal);
      pen.font(46, 700, FONT.display, -0.02).text(d.title, 56, 150, ink);
      pen.font(16, 450, FONT.ui, 0);
      pen.wrap(d.sub, w - 112).forEach((l, i) => pen.text(l, 56, 196 + i * 24, soft));
      pen.font(12.5, 500, FONT.mono).text(d.meta.join('   ·   '), 56, 262, soft);
      // contents
      pen.font(13, 700, FONT.ui, 0.06).text(d.toc.toUpperCase(), 56, 348, ink);
      pen.font(13, 700, FONT.ui, 0);
      d.sections.forEach((s, i) => {
        const y = 380 + i * 28;
        pen.font(14, 500, FONT.ui).text(`${i + 1}.  ${s}`, 56, y, ink);
        const tw = pen.w(`${i + 1}.  ${s}`);
        pen.c.setLineDash([2, 4]);
        pen.line(66 + tw, y + 4, w - 90, y + 4, line, 1);
        pen.c.setLineDash([]);
        pen.font(13, 500, FONT.mono).text(String(i + 2), w - 56, y, soft, 'right');
      });
      // sections
      let y = 500;
      d.sections.forEach((s, i) => {
        const k = sp(t - (T.doc + 0.3 + i * 0.35), 'snap');
        pen.c.save();
        pen.c.globalAlpha = clamp(0.25 + k);
        pen.font(19, 650, FONT.display).text(`${i + 1}. ${s}`, 56, y, ink);
        y += 30;
        pen.font(14.5, 450, FONT.ui);
        pen.wrap(d.body[i], w - 112).forEach((l) => { pen.text(l, 56, y, soft); y += 22; });
        pen.c.restore();
        y += 26;
      });
      pen.rect(56, h - 54, w - 112, 1, line);
      pen.font(11.5, 500, FONT.ui).text('Toolbox · documents', 56, h - 34, soft);
      pen.font(11.5, 500, FONT.mono).text('1 / 3', w - 56, h - 34, soft, 'right');
    },
  };
}

// ── the diagram (skill "diagrams") ───────────────────────────────────────

export const DIA = { w: 980, h: 600 };

export function diagramPainter(copy) {
  const d = copy.diagram;
  return {
    key(t) { return t < T.links[3] + 0.8 ? t : T.links[3] + 0.8; },
    draw(pen, t) {
      const { w, h } = DIA;
      const ink = '#1b2427', soft = '#5b6a6e', frame = '#9aa7a9', teal = '#0d9488';
      pen.rect(0, 0, w, h, '#fbfaf7');
      pen.font(22, 700, FONT.display, -0.01).text(d.title, 40, 44, ink);
      // zones
      const zones = [
        [40, 92, 200, 190, d.zones[0]],
        [270, 92, 230, 400, d.zones[1]],
        [530, 92, 410, 250, d.zones[2]],
        [530, 372, 410, 120, d.zones[3]],
      ];
      for (const [x, y, zw, zh, name] of zones) {
        pen.strokeRR(x, y, zw, zh, 4, frame, 1.5);
        pen.font(11.5, 700, FONT.ui, 0.1).text(name, x + 14, y + 20, soft);
        pen.font(11.5, 700, FONT.ui, 0);
      }
      const block = (x, y, bw, label, strong) => {
        pen.fillRR(x, y, bw, 46, 4, strong ? '#e6f4f2' : '#ffffff');
        pen.strokeRR(x, y, bw, 46, 4, strong ? teal : ink, 1.6);
        pen.font(14, 600, FONT.ui).text(label, x + bw / 2, y + 23.5, ink, 'center');
      };
      const B = d.blocks;
      block(66, 150, 148, B[0], true);
      block(296, 130, 178, B[1]);
      block(296, 230, 178, B[2], true);
      block(296, 330, 178, B[3]);
      block(560, 150, 160, B[4], true);
      block(750, 150, 160, B[5]);
      block(750, 250, 160, B[6]);
      block(560, 410, 350, B[7], true);
      // orthogonal links, drawn on the beats
      const link = (pts, k, label, lx, ly) => {
        if (k <= 0) return;
        const c = pen.c;
        // total length
        let L = 0;
        for (let i = 1; i < pts.length; i++) L += Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]);
        let left = L * k;
        c.beginPath();
        c.moveTo(pts[0][0], pts[0][1]);
        let end = pts[0];
        for (let i = 1; i < pts.length && left > 0; i++) {
          const seg = Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]);
          const f = Math.min(1, left / seg);
          end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
          c.lineTo(end[0], end[1]);
          left -= seg;
        }
        c.strokeStyle = ink;
        c.lineWidth = 1.6;
        c.stroke();
        if (k >= 1) {
          // arrow head
          const a = pts[pts.length - 1], b = pts[pts.length - 2];
          const ang = Math.atan2(a[1] - b[1], a[0] - b[0]);
          c.beginPath();
          c.moveTo(a[0], a[1]);
          c.lineTo(a[0] - 9 * Math.cos(ang - 0.45), a[1] - 9 * Math.sin(ang - 0.45));
          c.lineTo(a[0] - 9 * Math.cos(ang + 0.45), a[1] - 9 * Math.sin(ang + 0.45));
          c.closePath();
          c.fillStyle = ink;
          c.fill();
        }
        const kl = clamp((k - 0.6) / 0.4);
        if (kl > 0) {
          pen.font(12, 600, FONT.ui);
          const tw = pen.w(label) + 12;
          c.save();
          c.globalAlpha = kl;
          pen.fillRR(lx - tw / 2, ly - 10, tw, 20, 4, '#fbfaf7');
          pen.text(label, lx, ly + 0.5, teal, 'center');
          c.restore();
        }
      };
      const L = d.links;
      const kk = (i) => clamp(sp(t - T.links[i], 'base') * 1.02);
      link([[214, 173], [296, 153]].length ? [[214, 173], [255, 173], [255, 153], [296, 153]] : [], kk(0), L[0], 255, 163);
      link([[474, 253], [517, 253], [517, 173], [560, 173]], kk(1), L[1], 517, 213);
      link([[720, 173], [750, 173]], kk(2), L[2], 735, 128);
      link([[830, 196], [830, 250]], kk(3), L[3], 868, 223);
      // legend
      pen.font(11.5, 700, FONT.ui, 0.1).text(d.legend.toUpperCase(), 40, h - 64, soft);
      pen.font(11.5, 700, FONT.ui, 0);
      pen.fillRR(40, h - 46, 22, 14, 3, '#e6f4f2');
      pen.strokeRR(40, h - 46, 22, 14, 3, teal, 1.4);
      pen.font(12, 500, FONT.ui).text(copy.lang === 'fr' ? 'mes outils' : 'my tools', 70, h - 39, soft);
      pen.fillRR(170, h - 46, 22, 14, 3, '#ffffff');
      pen.strokeRR(170, h - 46, 22, 14, 3, ink, 1.4);
      pen.font(12, 500, FONT.ui).text(copy.lang === 'fr' ? 'garde-fous et services' : 'guardrails and services', 200, h - 39, soft);
    },
  };
}

// ── final title words ────────────────────────────────────────────────────

/** Geometry of a title made of lines (\n-separated), at font size `size` (css px). */
export function titleBox(text, size = 150) {
  const c = document.createElement('canvas').getContext('2d');
  c.font = `700 ${size}px ${FONT.display}`;
  c.letterSpacing = '-0.03em';
  const lines = text.split('\n');
  const w = Math.ceil(Math.max(...lines.map((l) => c.measureText(l).width))) + 32;
  const lineH = size * 1.12;
  const top = size * 0.34; // accents rise ~0.95 em above the baseline
  const base = lines.map((_, i) => top + size * 0.74 + i * lineH);
  const h = Math.ceil(base[base.length - 1] + size * 0.34); // descenders
  // optical centre: halfway through the x-height band of the lines
  const optical = (base[0] - size * 0.36 + base[base.length - 1] - size * 0.36) / 2 + (lines.length > 1 ? 0 : 0);
  return { lines, w, h, base, optical, size };
}

export function wordPainter(text, size = 150, color = '#eef6f6', weight = 700) {
  const b = titleBox(text, size);
  return {
    key: () => 0,
    draw(pen) {
      pen.font(size, weight, FONT.display, -0.03);
      b.lines.forEach((l, i) => pen.text(l, b.w / 2, b.base[i], color, 'center', 'alphabetic'));
    },
  };
}


// ── the diagram, composed for 9:16 (vertical flow, larger type) ──────────

export const DIA_P = { w: 560, h: 720 };

export function diagramPainterPort(copy) {
  const d = copy.diagram;
  return {
    key(t) { return t < T.links[3] + 0.8 ? t : T.links[3] + 0.8; },
    draw(pen, t) {
      const { w, h } = DIA_P;
      const ink = '#1b2427', soft = '#5b6a6e', frame = '#9aa7a9', teal = '#0d9488';
      pen.rect(0, 0, w, h, '#fbfaf7');
      pen.font(26, 700, FONT.display, -0.01).text(d.title, 30, 42, ink);
      const zone = (y, zh, name) => {
        pen.strokeRR(30, y, w - 60, zh, 4, frame, 1.5);
        pen.font(13, 700, FONT.ui, 0.1).text(name, 44, y + 20, soft);
        pen.font(13, 700, FONT.ui, 0);
      };
      zone(76, 108, d.zones[0]);
      zone(206, 136, d.zones[1]);
      zone(364, 136, d.zones[2]);
      zone(522, 104, d.zones[3]);
      const block = (x, y, bw, label, strong) => {
        pen.fillRR(x, y, bw, 52, 4, strong ? '#e6f4f2' : '#ffffff');
        pen.strokeRR(x, y, bw, 52, 4, strong ? teal : ink, 1.8);
        pen.font(18, 600, FONT.ui).text(label, x + bw / 2, y + 26.5, ink, 'center');
      };
      const B = d.blocks;
      block(190, 116, 180, B[0], true);
      block(44, 270, 150, B[1]);
      block(205, 270, 150, B[2], true);
      block(366, 270, 150, B[3]);
      block(44, 428, 150, B[4], true);
      block(205, 428, 150, B[5]);
      block(366, 428, 150, B[6]);
      block(150, 560, 260, B[7], true);
      const c = pen.c;
      const link = (pts, k, label, lx, ly) => {
        if (k <= 0) return;
        let total = 0;
        for (let i = 1; i < pts.length; i++) total += Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]);
        let left = total * k;
        c.beginPath();
        c.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length && left > 0; i++) {
          const seg = Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]);
          const f = Math.min(1, left / seg);
          c.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f));
          left -= seg;
        }
        c.strokeStyle = ink;
        c.lineWidth = 1.8;
        c.stroke();
        if (k >= 1) {
          const a = pts[pts.length - 1], b = pts[pts.length - 2];
          const ang = Math.atan2(a[1] - b[1], a[0] - b[0]);
          c.beginPath();
          c.moveTo(a[0], a[1]);
          c.lineTo(a[0] - 10 * Math.cos(ang - 0.45), a[1] - 10 * Math.sin(ang - 0.45));
          c.lineTo(a[0] - 10 * Math.cos(ang + 0.45), a[1] - 10 * Math.sin(ang + 0.45));
          c.closePath();
          c.fillStyle = ink;
          c.fill();
        }
        const kl = clamp((k - 0.6) / 0.4);
        if (kl > 0) {
          pen.font(15, 600, FONT.ui);
          const tw = pen.w(label) + 14;
          c.save();
          c.globalAlpha = kl;
          pen.fillRR(lx - tw / 2, ly - 12, tw, 24, 4, '#fbfaf7');
          pen.text(label, lx, ly + 0.5, teal, 'center');
          c.restore();
        }
      };
      const L = d.links;
      const kk = (i) => clamp(sp(t - T.links[i], 'base') * 1.02);
      link([[280, 168], [280, 196], [119, 196], [119, 270]], kk(0), L[0], 200, 196);
      link([[441, 322], [441, 352], [119, 352], [119, 428]], kk(1), L[1], 280, 352);
      link([[194, 454], [205, 454]], kk(2), L[2], 200, 412);
      link([[441, 480], [441, 540], [380, 540], [380, 560]], kk(3), L[3], 470, 510);
      pen.font(13, 700, FONT.ui, 0.1).text(d.legend.toUpperCase(), 30, h - 50, soft);
      pen.font(13, 700, FONT.ui, 0);
      pen.fillRR(30, h - 34, 24, 15, 3, '#e6f4f2');
      pen.strokeRR(30, h - 34, 24, 15, 3, teal, 1.4);
      pen.font(14, 500, FONT.ui).text(copy.lang === 'fr' ? 'mes outils' : 'my tools', 62, h - 26, soft);
      pen.fillRR(200, h - 34, 24, 15, 3, '#ffffff');
      pen.strokeRR(200, h - 34, 24, 15, 3, ink, 1.4);
      pen.font(14, 500, FONT.ui).text(copy.lang === 'fr' ? 'garde-fous et services' : 'guardrails and services', 232, h - 26, soft);
    },
  };
}
