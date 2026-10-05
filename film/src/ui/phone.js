// claude.ai on a phone, dark theme. A generic recreation: layout and colours, fictional content.
import { FONT, maskedText, rgba } from '../engine/canvas.js';
import { clamp, on, sp, swap, lerp, noise1, inv, track } from '../engine/motion.js';
import { T } from '../timeline.js';

export const PH = { w: 390, h: 844 };
const C = {
  bg: '#262624',
  surface: '#30302e',
  border: '#3d3d3a',
  text: '#faf9f5',
  muted: '#a6a39b',
  faint: '#77756e',
  bubble: '#141413',
  clay: '#d97757',
  clayDeep: '#c6613f',
  zorg: '#2dd4bf',
};

/** Layout shared with the choreography (positions in screen css px). */
export function phoneLayout(copy) {
  const L = {};
  L.composer = { x: 12, y: 664, w: 366, h: 118, r: 26 };
  L.field = { x: 30, y: 684, w: 330, lh: 23, size: 17 };
  L.bubble = { right: 374, y: 120, maxW: 292, pad: 14, lh: 23, size: 16 };
  L.sparkY = 0; // computed in draw
  L.tool = { x: 18, w: 354, h: 46 };
  L.card = { x: 18, w: 354, h: 132, r: 14 };
  return L;
}

function bubbleLines(pen, copy, L) {
  pen.font(L.bubble.size, 450, FONT.ui);
  return pen.wrap(copy.dictation, L.bubble.maxW - L.bubble.pad * 2);
}

/** Where the result card sits on screen (needed by the flying card). */
export function cardRect(pen, copy) {
  const L = phoneLayout(copy);
  const lines = bubbleLines(pen, copy, L);
  const bh = lines.length * L.bubble.lh + L.bubble.pad * 2 - 4;
  const y0 = L.bubble.y + bh + 26; // claude block
  const toolY = y0;
  const cardY = toolY + L.tool.h + 10;
  return { x: L.card.x, y: cardY, w: L.card.w, h: L.card.h, r: L.card.r, toolY, blockY: y0, bubbleH: bh };
}

/** Claude's spark: drawn from the logo image, rotating while Claude works. */
function spark(pen, img, x, y, size, rot) {
  const c = pen.c;
  c.save();
  c.translate(x, y);
  c.rotate(rot);
  c.drawImage(img, -size / 2, -size / 2, size, size);
  c.restore();
}

function statusBar(pen) {
  pen.font(15, 600, FONT.ui).text('9:41', 44, 27, C.text, 'left');
  // signal, wifi, battery
  for (let i = 0; i < 4; i++) pen.fillRR(286 + i * 6, 31 - (4 + i * 2.6), 3.6, 4 + i * 2.6, 1, C.text);
  pen.c.save();
  pen.c.strokeStyle = C.text;
  pen.c.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    pen.c.beginPath();
    pen.c.arc(323, 33, 3 + i * 4, -Math.PI * 0.75, -Math.PI * 0.25);
    pen.c.stroke();
  }
  pen.c.restore();
  pen.strokeRR(340, 20, 26, 13, 4, rgba(C.text, 0.45), 1.2);
  pen.fillRR(342, 22, 19, 9, 2.5, C.text);
  pen.fillRR(367.5, 24.5, 1.8, 4, 1, rgba(C.text, 0.45));
}

export function phonePainter(copy, imgs) {
  const L = phoneLayout(copy);
  return {
    L,
    key(t) {
      // The phone is static outside its scene and during the finale hold.
      if (t > 8.2 && t < T.ret - 0.2) return 8.2;
      return t;
    },
    draw(pen, t) {
      const c = pen.c;
      pen.rect(0, 0, PH.w, PH.h, C.bg);
      statusBar(pen);
      // Reset to a fresh chat at the end of the loop (54 → 56) so the seam matches t = 0.
      const fresh = t >= T.ret ? clamp((t - T.ret) / 0.5) : 0;
      const tt = fresh > 0 ? 0 : t;

      // Header: menu, title, new chat
      pen.icon('menu', 18, 64, 24, C.text, 2);
      pen.icon('square-pen', 348, 64, 24, C.text, 2);
      const named = sp(tt - (T.tool - 0.2), 'snap');
      pen.font(16, 600, FONT.ui);
      const title = named > 0.5 ? copy.phone.title : 'Claude';
      const ty = 76 + (1 - Math.abs(named - 0.5) * 2) * 0;
      c.save();
      c.globalAlpha = named > 0.5 ? clamp((named - 0.5) * 2) : clamp(1 - named * 2);
      const tw = pen.w(title);
      pen.text(title, 195 - 9, ty, C.text, 'center');
      pen.icon('chevron-down', 195 + tw / 2 - 4, ty - 7, 14, C.muted, 2);
      c.restore();

      const R = cardRect(pen, copy);
      const sent = sp(tt - T.send, 'base');
      const lines = bubbleLines(pen, copy, L);
      const fieldLines = (() => { pen.font(L.field.size, 500, FONT.ui); return pen.wrap(copy.dictation, L.field.w - 40); })();

      // ── chat ──
      if (tt >= T.send) {
        // user bubble: morphs out of the composer field
        const bw = Math.max(...lines.map((l) => { pen.font(L.bubble.size, 450, FONT.ui); return pen.w(l); })) + L.bubble.pad * 2;
        const bx1 = L.bubble.right - bw, by1 = L.bubble.y;
        const bx0 = L.field.x - 10, by0 = L.field.y - 14, bw0 = L.field.w - 30, bh0 = fieldLines.length * L.field.lh + 20;
        const x = lerp(bx0, bx1, sent), y = lerp(by0, by1, sent), w = lerp(bw0, bw, sent), h = lerp(bh0, R.bubbleH, sent);
        pen.fillRR(x, y, w, h, lerp(12, 18, sent), rgba(C.bubble, clamp(sent * 3)));
        const ka = swap(tt, T.send + 0.12);
        if (ka > 0) {
          c.save();
          c.globalAlpha = ka;
          pen.font(L.bubble.size, 450, FONT.ui);
          lines.forEach((l, i) => pen.text(l, x + L.bubble.pad, y + L.bubble.pad + 9 + i * L.bubble.lh, C.text));
          c.restore();
        }
      }

      // Claude block
      if (tt >= T.spark) {
        const by = R.blockY;
        // tool row → result card
        const kTool = sp(tt - T.tool, 'snap');
        if (kTool > 0) {
          const ry = by + (1 - kTool) * 14;
          c.save();
          c.globalAlpha = clamp(kTool * 2.5);
          pen.fillRR(L.tool.x, ry, L.tool.w, L.tool.h, 12, C.surface);
          pen.strokeRR(L.tool.x, ry, L.tool.w, L.tool.h, 12, C.border, 1);
          // Zorg logo as connector icon
          c.save();
          pen.rr(L.tool.x + 12, ry + 11, 24, 24, 6);
          c.clip();
          c.drawImage(imgs.zorg, L.tool.x + 12, ry + 11, 24, 24);
          c.restore();
          pen.font(14, 600, FONT.ui).text(copy.phone.tool, L.tool.x + 46, ry + 23, C.text);
          pen.font(13, 500, FONT.mono).text(copy.phone.toolAction, L.tool.x + 46 + pen.font(14, 600, FONT.ui).w(copy.phone.tool) + 10, ry + 23.5, C.muted);
          const done = sp(tt - T.toolDone, 'snap');
          const cx = L.tool.x + L.tool.w - 26, cy = ry + 23;
          if (done < 1) {
            // spinner
            c.save();
            c.globalAlpha *= 1 - done;
            c.translate(cx, cy);
            c.rotate(tt * 7);
            c.strokeStyle = C.muted; c.lineWidth = 2; c.lineCap = 'round';
            c.beginPath(); c.arc(0, 0, 7, 0, Math.PI * 1.4); c.stroke();
            c.restore();
          }
          if (done > 0) {
            c.save();
            c.globalAlpha *= done;
            pen.circle(cx, cy, 9 * (0.6 + 0.4 * done), C.zorg);
            pen.icon('check', cx - 6, cy - 6, 12, '#06231f', 3);
            c.restore();
          }
          c.restore();
        }
        // result card (lifts off at T.lift: then the slot is empty)
        const kCard = sp(tt - T.toolDone, 'base');
        if (kCard > 0 && tt < T.lift) {
          ticketCardChat(pen, copy, R.x, R.y + (1 - kCard) * 16, R.w, R.h * clamp(kCard * 1.2), clamp(kCard * 2));
        } else if (tt >= T.lift && tt < T.lift + 0.8) {
          // a faint imprint where the card was, closing quickly
          const k = 1 - sp(tt - T.lift, 'snap');
          pen.strokeRR(R.x, R.y, R.w, R.h, R.r, rgba(C.text, 0.12 * k), 1);
        }
        // answer, streamed word by word
        if (tt >= T.answer) {
          pen.font(16, 450, FONT.ui);
          const words = copy.phone.answer.split(' ');
          const shown = Math.floor((tt - T.answer) / 0.07) + 1;
          const al = pen.wrap(copy.phone.answer, 350);
          let idx = 0;
          const ay = R.y + R.h + 26;
          al.forEach((line, i) => {
            const ws = line.split(' ');
            let x = 20;
            ws.forEach((wd) => {
              if (idx < shown) {
                const k = clamp((tt - T.answer - idx * 0.07) / 0.12);
                c.save();
                c.globalAlpha = k;
                pen.text(wd, x, ay + i * 24 + (1 - k) * 4, C.text);
                c.restore();
              }
              x += pen.w(wd + ' ');
              idx++;
            });
          });
          // spark under the message
          const sy = ay + al.length * 24 + 22;
          const working = tt < T.answer + words.length * 0.07 + 0.2;
          spark(pen, imgs.claude, 32, sy, 26, working ? tt * 2.4 : (T.answer + words.length * 0.07 + 0.2) * 2.4);
        } else {
          spark(pen, imgs.claude, 32, by - 4 + (kTool > 0 ? 0 : 0), 26, tt * 2.4);
        }
      }

      // ── composer ──
      const cp = L.composer;
      pen.fillRR(cp.x, cp.y, cp.w, cp.h, cp.r, C.surface);
      pen.strokeRR(cp.x, cp.y, cp.w, cp.h, cp.r, C.border, 1);
      const words = copy.dictWords;
      const nWords = clamp((tt - T.wordsStart) / T.wordStep + 1, 0, words.length);
      const dictating = tt < T.send;
      // The big 3D words land in the field at T.reveal + 0.75; the loop end takes them back out.
      const landed = (t >= T.reveal + 0.76 && t < T.ret + 0.4);
      if (dictating && landed) {
        // transcript appears in the field (only visible once the big words have landed in it)
        pen.font(L.field.size, 500, FONT.ui);
        const s = words.slice(0, Math.floor(nWords)).join(' ');
        const fl = pen.wrap(s, L.field.w - 40);
        fl.forEach((l, i) => pen.text(l, L.field.x, L.field.y + 8 + i * L.field.lh, C.text));
      } else {
        const ph = sp(tt - (T.send + 0.15), 'snap');
        c.save();
        c.globalAlpha = dictating ? 1 : ph;
        const label = dictating ? copy.phone.listening : copy.phone.reply;
        pen.font(L.field.size, 450, FONT.ui).text(label, L.field.x, L.field.y + 8 + (1 - (dictating ? 1 : ph)) * 6, C.faint);
        c.restore();
      }
      // bottom row of the composer
      const ry = cp.y + cp.h - 30;
      pen.ring(cp.x + 30, ry, 16, C.border, 1.2);
      pen.icon('plus', cp.x + 21, ry - 9, 18, C.muted, 2);
      pen.ring(cp.x + 70, ry, 16, C.border, 1.2);
      pen.icon('sliders-horizontal', cp.x + 61, ry - 9, 18, C.muted, 2);
      pen.font(13, 500, FONT.ui).text(copy.phone.model, cp.x + cp.w - 132, ry, C.muted, 'right');
      // mic / waveform while dictating, send button
      const sx = cp.x + cp.w - 30;
      if (dictating && landed) {
        // live waveform next to the send button (the big 3D bars landed here)
        const wx = cp.x + cp.w - 108;
        for (let i = 0; i < 9; i++) {
          const a = voiceLevel(tt, i);
          const h = 3 + a * 16;
          pen.fillRR(wx + i * 6, ry - h / 2, 3, h, 1.5, C.clay);
        }
      } else if (!dictating) {
        pen.icon('mic', cp.x + cp.w - 86, ry - 10, 20, C.muted, 2);
      }
      const press = on(tt, T.send - 0.06, 'snap') - on(tt, T.send + 0.08, 'snap');
      const s = 1 - 0.12 * press;
      c.save();
      c.translate(sx, ry);
      c.scale(s, s);
      pen.fillRR(-16, -16, 32, 32, 10, dictating || tt < T.send + 0.3 ? C.clay : rgba(C.clay, 0.45));
      pen.icon('arrow-up', -9, -9, 18, '#ffffff', 2.4);
      c.restore();
      // home indicator
      pen.fillRR(PH.w / 2 - 67, PH.h - 13, 134, 5, 3, C.text);

      // Fresh chat at the loop end: the previous conversation slides up and away.
      if (fresh > 0) {
        /* drawn above via tt = 0; nothing else to do */
      }
    },
  };
}

/** The result card inside the chat (claude.ai style), also used for the flying card at m = 0. */
export function ticketCardChat(pen, copy, x, y, w, h, alpha = 1) {
  const c = pen.c;
  c.save();
  c.globalAlpha *= alpha;
  pen.clipRR(x, y, w, h, 14);
  pen.fillRR(x, y, w, h, 14, '#1f1e1d');
  pen.restore();
  pen.strokeRR(x, y, w, Math.max(h, 2), 14, '#4a4945', 1);
  c.save();
  pen.clipRR(x, y, w, h, 14);
  pen.font(12, 600, FONT.mono).text(copy.ticket.ref, x + 16, y + 24, '#2dd4bf');
  const pillW = pen.font(11, 600, FONT.ui).w(copy.phone.toolDone) + 18;
  pen.fillRR(x + w - 16 - pillW, y + 14, pillW, 20, 10, rgba('#2dd4bf', 0.16));
  pen.text(copy.phone.toolDone, x + w - 16 - pillW / 2, y + 24.5, '#2dd4bf', 'center');
  pen.font(16, 600, FONT.ui);
  const tl = pen.wrap(copy.ticket.title, w - 32);
  tl.forEach((l, i) => pen.text(l, x + 16, y + 52 + i * 21, '#faf9f5'));
  const cy = y + 52 + tl.length * 21 + 14;
  priorityGlyph(pen, x + 16, cy, 2, '#f5b73a', '#a6a39b');
  pen.font(12, 500, FONT.ui).text(copy.ticket.priority, x + 34, cy, '#a6a39b');
  const pw = pen.w(copy.ticket.priority);
  chip(pen, copy.ticket.label, x + 46 + pw, cy, '#a78bfa', '#faf9f5');
  c.restore();
  c.restore();
}

/** Zorg priority glyph: three bars 3 px wide, 4/8/12 px high, unlit bars at 26 %. */
export function priorityGlyph(pen, x, cy, level, color, off) {
  for (let i = 0; i < 3; i++) {
    const h = 4 + i * 4;
    const lit = i < level + (level >= 3 ? 1 : 0) || (level === 3);
    pen.c.save();
    pen.c.globalAlpha *= i < level ? 1 : 0.26;
    pen.fillRR(x + i * 5, cy + 6 - h, 3, h, 1, i < level ? color : off);
    pen.c.restore();
  }
}

/** Zorg label chip: pill, 7 px dot, colour at 14 % fill and 36 % border. */
export function chip(pen, label, x, cy, color, text, size = 11) {
  pen.font(size, 500, FONT.ui);
  const w = pen.w(label) + 26;
  const h = size + 9;
  pen.fillRR(x, cy - h / 2, w, h, h / 2, rgba(color, 0.14));
  pen.strokeRR(x, cy - h / 2, w, h, h / 2, rgba(color, 0.36), 1);
  pen.circle(x + 10, cy, 3.5, color);
  pen.text(label, x + 18, cy + 0.5, text);
  return w;
}

/** A deterministic voice envelope for the dictation waveform (bar i at time t), 0..1. */
export function voiceLevel(t, i) {
  const env = clamp(inv(-0.1, 0.15, t)) * (1 - clamp(inv(T.reveal + 0.6, T.send, t)));
  const base = 0.3 + 0.7 * noise1(t * 4.1 + i * 0.61, 11);
  const syll = 0.55 + 0.45 * Math.sin(t * 11 + i * 0.8);
  const loop = clamp(inv(T.ret + 0.6, 56, t)); // loop end: the waveform comes back
  return clamp(base * syll * Math.max(env, loop) * 1.3);
}
