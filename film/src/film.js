// The choreography: one continuous world. Each scene is a station on a loop; the ticket travels between
// them, the amber thread draws its route, and the camera never cuts. Every shot names its subject and the
// camera frames it whole (src/camera.js).
import * as THREE from 'three';
import { makeDome, Screen, shadowQuad } from './engine/world.js';
import { FONT } from './engine/canvas.js';
import { clamp, inv, lerp, sp, smoother, trackV } from './engine/motion.js';
import { DUR, T } from './timeline.js';
import { makePhone, UPP as PUPP } from './stations/phone.js';
import { cardRect, PH } from './ui/phone.js';
import { BOARD, boardPainter, boardSlot, cardHeight, desktopPainter, detailPainter, detailPainterPort, DETAIL, DETAIL_P, MOBILE, mobilePainter, mobileSlot } from './ui/zorg.js';
import { cortxPainter, cortxGeom, blockRect, inputRect } from './ui/cortx.js';
import { CARD, cardLooks, cardPainter, MCPP, mcpPainter, labelPainter, HOOK, hookPainter, COMMIT, commitPainter, OP, opPainter, sealPainter, DOC, docPainter, DIA, DIA_P, diagramPainter, diagramPainterPort, wordPainter, titleBox } from './ui/misc.js';
import { layouts, UPW } from './layout.js';
import { makeToolboxLogo } from './stations/toolbox.js';
import { buildCamera, rectPoints, normalOf, turn } from './camera.js';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
export { UPW };

/** 0 → 1 over [t0, t1] with a critically damped spring shape, exactly 1 at t1. */
export function arrive(t, t0, t1, w0 = 2.2) {
  if (t <= t0) return 0;
  if (t >= t1) return 1;
  const s = (x) => 1 - (1 + w0 * x) * Math.exp(-w0 * x);
  return s(t - t0) / s(t1 - t0);
}

/** Cubic Bézier between 3D points. */
function bez(p0, p1, p2, p3, u) {
  const a = 1 - u;
  return p0.clone().multiplyScalar(a * a * a)
    .add(p1.clone().multiplyScalar(3 * a * a * u))
    .add(p2.clone().multiplyScalar(3 * a * u * u))
    .add(p3.clone().multiplyScalar(u * u * u));
}

export function buildFilm(world, post, ctx) {
  const { copy, imgs, portrait } = ctx;
  const L = layouts(portrait);
  const scene = world.scene;

  // ── light and space ──
  const dome = makeDome();
  world.add(dome);
  const key = new THREE.DirectionalLight('#ffffff', 2.0);
  key.position.set(-6, 9, 10);
  world.add(key);
  const rim = new THREE.DirectionalLight('#2dd4bf', 1.4);
  rim.position.set(8, 3, -8);
  world.add(rim);
  const warm = new THREE.DirectionalLight('#d97757', 0.9);
  warm.position.set(-10, -4, 4);
  world.add(warm);

  const station = (p) => {
    const g = new THREE.Group();
    g.position.set(...p.pos);
    g.rotation.set(...(p.rot || [0, 0, 0]));
    world.add(g);
    return g;
  };
  const win = (painter, px, py, opts = {}) =>
    new Screen(world, { w: px * UPW, h: py * UPW, px, py, dpr: opts.dpr || 2, radius: opts.radius ?? 16, painter, slab: opts.slab ?? 0.05, slabColor: opts.slabColor, name: opts.name || '' });
  const qOf = (o) => o.getWorldQuaternion(new THREE.Quaternion());

  // ── 1. phone ──
  const phone = makePhone(world, ctx, L.phone);

  // ── 2. Zorg: board (or mobile list) + the three other surfaces ──
  const gZ = station(L.zorg);
  const boardW = portrait ? MOBILE.w : BOARD.w, boardH = portrait ? MOBILE.h : BOARD.h;
  const board = win(portrait ? mobilePainter(copy, imgs) : boardPainter(copy, imgs), boardW, boardH, { radius: portrait ? 34 : 14, name: 'board', dpr: 2.4 });
  gZ.add(board.group);
  const desk = win(desktopPainter(copy, imgs), BOARD.w, BOARD.h, { radius: 10, name: 'desk', dpr: 1.6 });
  gZ.add(desk.group);
  const mcp = win(mcpPainter(copy, imgs), MCPP.w, MCPP.h, { radius: 22, name: 'mcp', dpr: 1.6 });
  gZ.add(mcp.group);
  const labels = copy.zorg.surfaces.map((s, i) => {
    const l = new Screen(world, { w: 520 * UPW, h: 90 * UPW, px: 520, py: 90, dpr: 2, radius: 0, painter: labelPainter(s, copy.zorg.surfaceSub[i], L.stack.labelAlign), name: 'label' });
    gZ.add(l.group);
    return l;
  });

  // ── 3. CortX (it is also the CLI layer of scene 2) ──
  const G = cortxGeom(portrait);
  const gC = station(L.cortx);
  const cortx = win(cortxPainter(copy, imgs, portrait), G.w, G.h, { radius: 10, name: 'cortx', dpr: 2.2 });
  scene.add(cortx.group); // positioned by hand: it flies from the Zorg stack to its station
  const layerWH = [
    [boardW * UPW, boardH * UPW],
    [BOARD.w * UPW * L.stack.scale(1), BOARD.h * UPW * L.stack.scale(1)],
    [(G.w - G.rail) * UPW * L.stack.scale(2), (G.h - G.title) * UPW * L.stack.scale(2)],
    [MCPP.w * UPW * L.stack.scale(3), MCPP.h * UPW * L.stack.scale(3)],
  ];

  // ── the travelling ticket card ──
  const zw = portrait ? mobileSlot(board.pen, copy).w : boardSlot(board.pen, copy).w;
  const morph = (t) => (t < 50 ? smoother(clamp(inv(T.fly - 0.6, T.land - 0.5, t))) : 0);
  const card = new Screen(world, { w: CARD.w, h: CARD.h, px: CARD.w, py: CARD.h, dpr: 4, radius: 14, painter: cardPainter(copy, zw, morph), name: 'card', order: 3, slab: 4, slabColor: '#121a1c' });
  scene.add(card.group);
  const cardShadow = shadowQuad(1, 1, 0.12, 0.5);
  scene.add(cardShadow);
  const zorgCardH = cardHeight(card.pen, copy.ticket.title, zw);

  // ── 4. code lines, pre-commit, commit card, 1Password, seal ──
  const codeLines = ["+ .order('pinned', { ascending: false })", '+ <PinButton note={note} />', '+ pinned: boolean'].map((s) => {
    const c = document.createElement('canvas').getContext('2d');
    c.font = `500 64px ${FONT.mono}`;
    const tw = Math.ceil(c.measureText(s).width) + 40;
    const scr = new Screen(world, {
      w: tw, h: 100, px: tw, py: 100, dpr: 1, radius: 0, name: 'code',
      painter: {
        key: () => 0,
        draw(pen) {
          pen.font(64, 500, FONT.mono);
          let x = 20 + pen.text('+', 20, 52, '#2dd4bf');
          for (const tok of s.slice(1).split(/(\s+|[{}()<>/.,:='"]+)/).filter(Boolean)) {
            const col = /^['"]/.test(tok) || tok === 'pinned' ? '#f5b73a' : /^[{}()<>/.,:='"]+$/.test(tok) ? '#95afb2' : /^[A-Z]/.test(tok) ? '#5fd7e6' : tok === 'boolean' ? '#c792ea' : '#e5f1f1';
            x += pen.text(tok, x, 52, col);
          }
        },
      },
    });
    scr.tw = tw;
    scene.add(scr.group);
    return scr;
  });
  const codeScale = L.code.width / Math.max(...codeLines.map((s) => s.tw));

  const gG = station(L.gate);
  const g = L.gateLay;
  const hook = new Screen(world, { w: HOOK.w * UPW, h: HOOK.h * UPW, px: HOOK.w, py: HOOK.h, dpr: 2.5, radius: 20, painter: hookPainter(copy), slab: 0.04, name: 'hook' });
  hook.group.position.set(...g.hook);
  gG.add(hook.group);
  const commit = new Screen(world, { w: COMMIT.w * UPW, h: COMMIT.h * UPW, px: COMMIT.w, py: COMMIT.h, dpr: 3, radius: 18, painter: commitPainter(copy), slab: 0.04, name: 'commit' });
  scene.add(commit.group);
  const gate = makeGate((COMMIT.w * UPW) / 2 + 0.12, COMMIT.h * UPW + 0.3);
  gate.group.position.set(...g.commit);
  gG.add(gate.group);
  const cursorAt = (t) => {
    if (t < T.cursor - 0.1) return null;
    return trackV(t, [[T.cursor - 0.1, [OP.w + 60, OP.h + 80]], [T.cursor, [OP.w * 0.62, OP.h - 30], 'base'], [T.click - 0.25, [OP.w * 0.77, OP.h - 52], 'snap']]);
  };
  const op = new Screen(world, { w: (OP.w + 80) * UPW, h: (OP.h + 100) * UPW, px: OP.w + 80, py: OP.h + 100, dpr: 3, radius: 16, painter: opPainter(copy, cursorAt), slab: 0.03, name: 'op' });
  op.setRect(0, 0, OP.w, OP.h, 16);
  // the canvas has room for the cursor; centre the dialog on the group origin
  op.mesh.position.set(40 * UPW, -50 * UPW, 0);
  gG.add(op.group);
  const seal = new Screen(world, { w: 200 * UPW, h: 200 * UPW, px: 200, py: 200, dpr: 3, radius: 100, painter: sealPainter(copy), name: 'seal', order: 6 });
  scene.add(seal.group);

  // ── 5. ticket detail, document, diagram ──
  const gD = station(L.detail);
  const DD = portrait ? DETAIL_P : DETAIL;
  const detail = new Screen(world, { w: DD.w * UPW, h: DD.h * UPW, px: DD.w, py: DD.h, dpr: 2.4, radius: portrait ? 28 : 22, painter: portrait ? detailPainterPort(copy) : detailPainter(copy, imgs), slab: 0.04, name: 'detail' });
  gD.add(detail.group);
  const gK = station(L.skills);
  const doc = new Screen(world, { w: DOC.w * UPW, h: DOC.h * UPW, px: DOC.w, py: DOC.h, dpr: 2.4, radius: 6, painter: docPainter(copy), slab: 0.015, slabColor: '#d8d4ca', name: 'doc' });
  gK.add(doc.group);
  const DG = portrait ? DIA_P : DIA;
  const dia = new Screen(world, { w: DG.w * UPW, h: DG.h * UPW, px: DG.w, py: DG.h, dpr: 2.4, radius: 6, painter: portrait ? diagramPainterPort(copy) : diagramPainter(copy), slab: 0.015, slabColor: '#d8d4ca', name: 'dia' });
  gK.add(dia.group);

  // ── 6. the climax: the ring collapses into the Toolbox logo, then the word ──
  const C = (() => {
    const c = V();
    const st = [L.phone, L.zorg, L.cortx, L.gate, L.detail, L.skills];
    st.forEach((s) => c.add(V(...s.pos)));
    return c.multiplyScalar(1 / st.length);
  })();
  const F = L.final;
  const logo = makeToolboxLogo(F.logo);
  scene.add(logo.group);
  // The title: the case, then "Toolbox" in large type; under it, smaller, the subtitle ("My ecosystem").
  // 16:9: case and word side by side, the subtitle centred under both. 9:16: case, word, subtitle stacked.
  const TB = titleBox(copy.finale);
  const SB = titleBox(copy.finaleSub);
  const word = new Screen(world, { w: TB.w, h: TB.h, px: TB.w, py: TB.h, dpr: 1, radius: 0, painter: wordPainter(copy.finale), name: 'word6', order: 8 });
  const subw = new Screen(world, { w: SB.w, h: SB.h, px: SB.w, py: SB.h, dpr: 1, radius: 0, painter: wordPainter(copy.finaleSub, 150, '#a9c3c5', 600), name: 'word6', order: 8 });
  scene.add(word.group);
  scene.add(subw.group);
  const ws = F.wordScale, ss2 = F.wordScale * F.subScale;
  const capTopOf = (B) => B.base[0] - B.size * 0.72;  // canvas y of the cap top
  const groupY = (B, scale, capTopY) => capTopY - (B.h / 2 - capTopOf(B)) * scale; // group y that puts the cap top at capTopY
  const capH = (B, scale) => B.size * 0.72 * scale;
  const wordWorld = (TB.w - 32) * ws;
  const logoH = F.logo * 0.75;
  const cy = C.y + (F.dy || 0);
  let logoAt, wordAt, subAt;
  if (F.row) {
    // row = case + word, sharing a centre line; the subtitle below; the whole block centred on cy
    const rowH = Math.max(logoH, capH(TB, ws));
    const total = rowH + F.subGap + capH(SB, ss2);
    const rowMid = cy + total / 2 - rowH / 2;
    logoAt = V(C.x - (F.logo + F.gap + wordWorld) / 2 + F.logo / 2, rowMid, C.z + F.z);
    wordAt = V(logoAt.x + F.logo / 2 + F.gap + wordWorld / 2, groupY(TB, ws, rowMid + capH(TB, ws) / 2), C.z + F.z);
    subAt = V(C.x, groupY(SB, ss2, rowMid - rowH / 2 - F.subGap), C.z + F.z);
  } else {
    const total = logoH + F.gap + capH(TB, ws) + F.subGap + capH(SB, ss2);
    const top = cy + total / 2;
    logoAt = V(C.x, top - logoH / 2, C.z + F.z);
    const wordTop = top - logoH - F.gap;
    wordAt = V(C.x, groupY(TB, ws, wordTop), C.z + F.z);
    subAt = V(C.x, groupY(SB, ss2, wordTop - capH(TB, ws) - F.subGap), C.z + F.z);
  }
  const converging = [phone.group, gZ, gC, gG, gD, gK];
  const baseOf = new Map(converging.map((o) => [o, o.position.clone()]));

  // ── the light thread through ZORG-128 on every surface (scene 2) ──
  const skewer = makeSkewer();
  scene.add(skewer.mesh);

  // ── the amber thread ──
  scene.updateMatrixWorld(true);
  const thread = makeThread(L.threadPts.map((p) => V(...p)));
  scene.add(thread.mesh);

  // ── anchors (world space) ──
  const phoneCard = (() => {
    const R = cardRect(phone.screen.pen, copy);
    return { pos: phone.worldOf(R.x + R.w / 2, R.y + R.h / 2, 0.03), quat: qOf(phone.group), scale: PUPP };
  })();
  const slot = portrait ? mobileSlot(board.pen, copy) : boardSlot(board.pen, copy);
  const boardCard = {
    pos: gZ.localToWorld(V((slot.x + slot.w / 2 - boardW / 2) * UPW, (boardH / 2 - slot.y - slot.h / 2) * UPW, 0.012)),
    quat: qOf(gZ),
    scale: UPW,
  };
  const parkScale = UPW * 1.25;
  const parkC = { pos: gC.localToWorld(V(...L.cardPark(G, zw * parkScale, zorgCardH * parkScale))), quat: qOf(gC), scale: parkScale };
  const detailCenter = { pos: gD.localToWorld(V(0, 0, 0.01)), quat: qOf(gD), scale: UPW };

  function placeCard(t) {
    // The card's transform is defined for every t (the camera reads it even when hidden).
    let pos, quat, scale, vis = true, opa = 1;
    const lift = arrive(t, T.lift, T.fly, 3.0);
    if (t < T.lift) {
      vis = false;
      pos = phoneCard.pos.clone();
      quat = phoneCard.quat.clone();
      scale = phoneCard.scale;
    } else if (t < T.impact) {
      // lift off the screen, then fly to the board along a curve that swings toward the camera
      const u = arrive(t, T.fly - 0.6, T.land + 0.25, 1.7);
      const n = V(0, 0, 1).applyQuaternion(phoneCard.quat);
      const pLift = phoneCard.pos.clone().addScaledVector(n, 0.32 * lift).add(V(0, 0.08 * lift, 0));
      const p3 = boardCard.pos;
      pos = u <= 0 ? pLift : bez(pLift, pLift.clone().add(V(...L.fly1)), p3.clone().add(V(...L.fly2)), p3, u);
      const q = phoneCard.quat.clone().slerp(boardCard.quat, smoother(u));
      const fl = Math.sin(Math.PI * smoother(u)) * 0.35;
      quat = q.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.15 * fl, 0.4 * fl, 0.05 * fl)));
      scale = lerp(phoneCard.scale * (1 + 0.25 * lift), boardCard.scale, smoother(u));
    } else {
      // second journey: off the board → beside CortX (scenes 3–4) → into the ticket detail
      vis = t >= T.cardIn && t < T.detail + 0.15;
      const a = arrive(t, T.cardIn, T.cardIn + 0.9, 2.6);
      const c = arrive(t, T.rejoin, T.detail - 0.05, 2.4);
      pos = boardCard.pos.clone().lerp(parkC.pos, a).lerp(detailCenter.pos, c);
      if (a > 0 && a < 1) pos.add(V(0, 0, 1.0 * Math.sin(Math.PI * a)));
      if (c > 0 && c < 1) pos.add(V(0, 0, 1.2 * Math.sin(Math.PI * c)));
      quat = boardCard.quat.clone().slerp(parkC.quat, a).slerp(detailCenter.quat, c);
      scale = lerp(lerp(boardCard.scale, parkC.scale, a), detailCenter.scale, c);
      opa = 1 - clamp(inv(T.detail - 0.05, T.detail + 0.12, t));
    }
    card.group.position.copy(pos);
    card.group.quaternion.copy(quat);
    card.group.scale.setScalar(scale);
    const m = morph(t);
    const Lk = cardLooks(card.pen, copy, zw);
    const w = lerp(Lk.chat.w, Lk.zorg.w, m), h = lerp(Lk.chat.h, Lk.zorg.h, m);
    card.setRect(0, 0, w, h, lerp(14, 12, m));
    card.mesh.position.set(CARD.w / 2 - w / 2, h / 2 - CARD.h / 2, 0);
    card.group.visible = vis;
    cardShadow.visible = vis && t < T.fly + 0.4;
    if (!vis) return;
    card.opacity = opa;
    if (cardShadow.visible) {
      const n = V(0, 0, 1).applyQuaternion(phoneCard.quat);
      cardShadow.position.copy(phoneCard.pos).addScaledVector(n, 0.004).add(V(0.02 * lift, -0.03 * lift, 0));
      cardShadow.quaternion.copy(phoneCard.quat);
      cardShadow.scale.set(354 * PUPP * (1 + lift * 0.1), 132 * PUPP * (1 + lift * 0.1), 1);
      cardShadow.material.uniforms.uK.value = 0.6 * Math.sin(Math.PI * clamp(lift * 0.999)) * (1 - clamp(inv(T.fly - 0.2, T.fly + 0.3, t)));
      cardShadow.material.uniforms.uSoft.value = 0.03 + 0.12 * lift;
    }
  }

  function placeStack(t) {
    // exploded view: desktop, CLI (= CortX pane), MCP come out of the board, one per beat
    const ks = [0, 1, 2].map((i) => sp(t - (T.explode + T.layerStep * (i + 1)), 'base'));
    const back = clamp(inv(T.dive + 0.6, T.morphCortx, t));
    const kb = sp(t - T.explode, 'base');
    const S = L.stack;
    const fadeOut = 1 - clamp(inv(T.dive + 0.4, T.morphCortx, t));
    const labelOn = (i, k) => {
      const l = labels[i];
      l.group.position.set(...S.label(i, ...layerWH[i]));
      l.group.visible = k > 0.01 && t < T.dive + 1.2;
      l.uniforms.uShift.value.set(0, (1 - clamp(k)) * 70);
      l.opacity = clamp(k * 3) * (1 - clamp(inv(T.dive, T.dive + 0.6, t)));
    };
    labelOn(0, kb);
    desk.group.visible = t > T.explode && t < T.morphCortx + 0.6;
    desk.group.position.set(...S.layer(1, ks[0] * (1 - back)));
    desk.group.scale.setScalar(S.scale(1));
    desk.opacity = clamp(ks[0] * 4) * fadeOut;
    labelOn(1, ks[0]);
    labelOn(2, ks[1]);
    mcp.group.visible = t > T.explode && t < T.morphCortx + 0.6;
    mcp.group.position.set(...S.layer(3, ks[2] * (1 - back)));
    mcp.group.scale.setScalar(S.scale(3));
    mcp.opacity = clamp(ks[2] * 4) * fadeOut;
    labelOn(3, ks[2]);
    return ks;
  }

  function placeSkewer(t) {
    // the ZORG-128 mention on each surface, threaded by one line of light
    if (t > T.skewer - 0.1 && t < T.dive + 0.8) {
      const pt = (scr, x, y) => rectPoints(scr, [x, y, 0, 0])[0];
      const a0 = pt(board, slot.x + 30, slot.y + 20);
      const a1 = pt(desk, BOARD.side + 24 + 40, 36 + 100);
      const a2 = pt(cortx, G.rail + G.pad + 20, G.title + G.pad + G.lh * 1.5);
      const a3 = pt(mcp, 80, 184);
      skewer.set([a0, a1, a2, a3]);
    }
    skewer.update(t);
  }

  function placeCortx(t, ks) {
    // Scene 2: the CortX window is the CLI layer, clipped to its terminal pane.
    // Scene 2c: it leaves the stack, flies to its station and its chrome unfolds around the pane.
    const pane = { x: G.rail, y: G.title, w: G.w - G.rail, h: G.h - G.title };
    const reveal = t >= 46 ? 1 : smoother(clamp(inv(T.morphCortx - 0.3, T.cortxFormed, t)));
    const fly = t >= 46 ? 1 : arrive(t, T.dive, T.cortxFormed, 1.9);
    const rx = lerp(pane.x, 0, reveal), ry = lerp(pane.y, 0, reveal), rw = lerp(pane.w, G.w, reveal), rh = lerp(pane.h, G.h, reveal);
    cortx.setRect(rx, ry, rw, rh, lerp(16, 10, reveal));
    // keep the visible rect centred on the group origin, the slab under it
    const cx = (rx + rw / 2 - G.w / 2) * UPW, cy = (G.h / 2 - (ry + rh / 2)) * UPW;
    cortx.mesh.position.set(-cx, -cy, 0);
    const inStack = gZ.localToWorld(V(...L.stack.layer(2, ks[1])));
    const atStation = gC.localToWorld(V(0, 0, 0));
    const pos = inStack.clone().lerp(atStation, fly);
    pos.z += Math.sin(Math.PI * fly) * 1.0;
    cortx.group.position.copy(pos);
    cortx.group.quaternion.copy(qOf(gZ).slerp(qOf(gC), fly));
    cortx.group.scale.setScalar(lerp(L.stack.scale(2), 1, fly));
    cortx.group.visible = t > T.explode + 0.4;
    cortx.opacity = t < T.dive ? clamp(ks[1] * 4) : 1;
  }

  function placeCode(t) {
    // the three added lines rise out of the diff and settle in one left-aligned column, centred on the window
    const lay = L.code;
    const step = 100 * codeScale * 1.35;
    codeLines.forEach((s, i) => {
      const t0 = T.diffLift + i * 0.25;
      const k = arrive(t, t0, t0 + 1.2, 2.6);
      const out = clamp(inv(T.backToTerm, T.backToTerm + 0.7, t));
      s.group.visible = t > t0 && t < T.backToTerm + 0.8;
      const from = gC.localToWorld(V(...lay.from(i)));
      const x = -lay.width / 2 + (s.tw * codeScale) / 2;
      const to = gC.localToWorld(V(x, lay.top - i * step, lay.z));
      s.group.position.copy(from.clone().lerp(to, k).lerp(from, smoother(out)));
      s.group.quaternion.copy(qOf(gC));
      s.group.scale.setScalar(lerp((16 * UPW) / 64, codeScale, k) * lerp(1, 0.4, smoother(out)));
      s.opacity = clamp(k * 3) * (1 - out);
    });
    // the terminal steps back while the lines are read
    const dim = smoother(clamp(inv(T.diffLift, T.diffLift + 0.6, t))) * (1 - smoother(clamp(inv(T.backToTerm, T.backToTerm + 0.6, t))));
    cortx.uniforms.uBright.value = lerp(1, portrait ? 0.14 : 0.24, dim);
  }

  function placeGate(t) {
    // the commit card slides in under the hook panel; the gate's blade scans it while the checks light up
    const enter = arrive(t, T.gate - 0.9, T.gate - 0.05, 2.6);
    const away = t >= 46 ? 0 : arrive(t, T.rejoin, T.detail - 0.05, 2.4);
    let p = gG.localToWorld(V(...g.commitIn)).lerp(gG.localToWorld(V(...g.commit)), t >= 46 ? 1 : enter);
    p.lerp(gD.localToWorld(V(0, 0, -0.25)), away);
    commit.group.position.copy(p);
    commit.group.quaternion.copy(qOf(gG).slerp(qOf(gD), away));
    commit.group.visible = (t > T.gate - 1 && t < T.detail + 0.3) || t > 46;
    commit.opacity = t > 46 ? 1 : 1 - clamp(inv(T.detail - 0.3, T.detail, t));
    commit.group.scale.setScalar(lerp(1, 0.5, away));
    gate.update(t);
    // the hook panel gives its place to the 1Password request, and comes back for the finale
    const hookOut = t >= 46 ? 0 : smoother(clamp(inv(T.op - 0.25, T.op + 0.1, t)));
    hook.opacity = 1 - hookOut;
    hook.group.visible = hookOut < 0.999;
    hook.group.scale.setScalar(lerp(1, 0.92, hookOut));
    // 1Password request: rises in place, collapses into the seal after the click
    const rise = arrive(t, T.op, T.op + 0.6, 2.8);
    const fold = smoother(clamp(inv(T.click + 0.1, T.seal + 0.55, t)));
    op.group.visible = t > T.op && t < T.seal + 0.6;
    op.group.position.set(g.op[0], lerp(g.op[1] - 0.35, g.op[1], rise), g.op[2]);
    op.group.scale.setScalar(lerp(0.96, 1, rise) * lerp(1, 0.25, fold));
    op.opacity = clamp(rise * 3) * (1 - fold);
    // the seal: born where the dialog folds, flies onto the commit badge, stamps on T.stamp
    const born = smoother(clamp(inv(T.click + 0.25, T.seal + 0.5, t)));
    const fly = arrive(t, T.seal + 0.45, T.stamp, 2.2);
    seal.group.visible = t > T.click + 0.25 && t < T.stamp + 0.35;
    if (seal.group.visible) {
      commit.group.updateMatrixWorld(true);
      const pOp = gG.localToWorld(V(g.op[0], g.op[1], g.op[2] + 0.05));
      const badge = commit.group.localToWorld(V((COMMIT.w - 24 - 85 - COMMIT.w / 2) * UPW, (COMMIT.h / 2 - 36) * UPW, 0.04));
      const p0 = pOp.clone().lerp(badge.clone().add(V(0, 0.15, 0.5)), fly);
      const press = sp(t - T.stamp, 'snap');
      seal.group.position.copy(p0.lerp(badge, clamp(press)));
      seal.group.quaternion.copy(qOf(gG));
      seal.group.scale.setScalar(lerp(0.4, 1.0, born) * lerp(1, 0.28, clamp(press)));
      seal.opacity = born * (1 - clamp(inv(T.stamp + 0.08, T.stamp + 0.3, t)));
    }
  }

  function placeDetail(t) {
    // the modal opens out of the card: its visible rect grows from the card size
    const k = t >= 46 || t < 1 ? 1 : arrive(t, T.detail - 0.1, T.detail + 0.5, 3.2);
    const w = lerp(zw, DD.w, k), h = lerp(112, DD.h, k);
    detail.setRect((DD.w - w) / 2, (DD.h - h) / 2, w, h, lerp(12, portrait ? 28 : 22, k));
    detail.group.visible = t > T.detail - 0.12;
    detail.uniforms.uTint.value.set('#18272a');
    detail.uniforms.uTintK.value = t >= 46 ? 0 : 1 - clamp(inv(T.detail + 0.05, T.detail + 0.25, t));
    // document and diagram leave the detail and settle side by side (stacked in 9:16), aligned
    const kd = t >= 46 ? 1 : arrive(t, T.doc - 0.3, T.doc + 0.7, 2.6);
    const kg = t >= 46 ? 1 : arrive(t, T.diagram - 0.3, T.diagram + 0.7, 2.6);
    const sk = L.skillsLay;
    const from = gK.worldToLocal(gD.localToWorld(V(0, 0, -0.05)));
    doc.group.visible = t > T.doc - 0.3;
    dia.group.visible = t > T.diagram - 0.3;
    const lift = (k) => V(0, 0, 0.8 * Math.sin(Math.PI * k));
    doc.group.position.copy(from.clone().lerp(V(...sk.doc), kd).add(lift(kd)));
    dia.group.position.copy(from.clone().lerp(V(...sk.dia), kg).add(lift(kg)));
    doc.group.rotation.set(0, lerp(-0.9, 0, kd), 0);
    dia.group.rotation.set(0, lerp(0.9, 0, kg), 0);
    doc.group.scale.setScalar(lerp(0.3, 1, kd));
    dia.group.scale.setScalar(lerp(0.3, 1, kg));
  }

  function placeFinale(t) {
    // The ring stays: the whole loop remains on screen, dimmed, while the amber pulse keeps running
    // round it (see dimStations and the thread). The title sits in the empty centre of the ring.
    for (const s of world.screens) s.uniforms.uFade.value = 1;
    // the logo is born in the centre of the ring on a heavy spring, turning to face us
    const kl = sp(t - T.logo, 'heavy');
    const out = smoother(clamp(inv(T.unfold, T.unfold + 0.5, t)));
    logo.group.visible = t > T.logo - 0.02 && out < 0.999;
    // then it makes room for the word
    const slide = sp(t - (T.word - 0.42), 'heavy'); // clear of the text before the text rises
    logo.group.position.copy(V(C.x, logoAt.y, C.z + F.z)).lerp(logoAt, clamp(slide));
    logo.group.scale.setScalar(Math.max(0.0001, clamp(kl, 0, 1.06) * (1 - out)));
    // it turns in from the side and settles three-quarters on, so its volume reads, with a slow sway
    const yaw = lerp(-1.6, -0.34, clamp(kl)) + 0.05 * Math.sin((t - T.logo) * 0.8);
    logo.group.rotation.set(lerp(0.4, 0.16, clamp(kl)), yaw, 0);
    // the word rises through its own line box on the next beat, and leaves the same way
    const kw = sp(t - T.word, 'heavy');
    const wout = smoother(clamp(inv(T.unfold - 0.05, T.unfold + 0.4, t)));
    word.group.visible = t > T.word - 0.02 && wout < 0.999;
    word.uniforms.uShift.value.set(0, (1 - clamp(kw)) * TB.h - wout * (TB.h + 10));
    word.opacity = clamp(kw * 6);
    word.group.position.copy(wordAt);
    word.group.scale.setScalar(ws);
    // the subtitle follows half a beat later, the same way, and leaves just before the word
    const ksub = sp(t - T.subtitle, 'heavy');
    const sout = smoother(clamp(inv(T.unfold - 0.15, T.unfold + 0.3, t)));
    subw.group.visible = t > T.subtitle - 0.02 && sout < 0.999;
    subw.uniforms.uShift.value.set(0, (1 - clamp(ksub)) * SB.h - sout * (SB.h + 10));
    subw.opacity = clamp(ksub * 6);
    subw.group.position.copy(subAt);
    subw.group.scale.setScalar(ss2);
  }

  function dimStations(t) {
    // the loop shot dims the stations a little so the amber thread reads; under the title they step
    // further back (darker), so the word and the logo stay perfectly legible, then come back for the loop
    const loop = clamp(inv(T.pull + 1, T.trace + 2, t));
    const title = smoother(clamp(inv(T.collapse - 0.3, T.logo + 0.2, t)));
    // stay dim through the fast return (white pages sweep past the lens), back to full just before the seam
    const back = 1 - smoother(clamp(inv(55.45, 56, t)));
    const k = lerp(1, lerp(0.55, 0.3, title), loop * back);
    const set = (s) => { s.uniforms.uBright.value = k; };
    set(board); set(phone.screen); set(hook); set(commit); set(doc); set(dia); set(detail);
    if (t >= 40) set(cortx);
  }

  /** Places the whole scene at time t (pure), the camera excepted. */
  function pose(t) {
    // stations back to their base transform first: everything below reads their world matrices
    for (const o of converging) {
      o.position.copy(baseOf.get(o));
      o.scale.setScalar(1);
      o.visible = true;
    }
    scene.updateMatrixWorld(true);
    phone.update(t);
    const ks = placeStack(t);
    placeCortx(t, ks);
    placeSkewer(t);
    placeCard(t);
    placeCode(t);
    placeGate(t);
    placeDetail(t);
    dimStations(t);
    thread.update(t);
    placeFinale(t);
    scene.updateMatrixWorld(true);
  }

  // ── the shots ──
  const pts = (...items) => items.flat();
  const R = (s, rect) => rectPoints(s, rect);
  const nrm = (s, yaw = 0, pitch = 0) => () => turn(normalOf(s), yaw, pitch);
  const fixed = (s, yaw = 0, pitch = 0) => { pose(47); const d = turn(normalOf(s), yaw, pitch); return () => d; };
  const boxPts = (obj) => {
    const b = new THREE.Box3().setFromObject(obj);
    const out = [];
    for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) out.push(V(x, y, z));
    return out;
  };
  const stations = () => pts(R(phone.screen), R(board), R(cortx), R(hook), R(commit), R(detail), R(doc), R(dia));
  const wordPts = () => pts(...phone.words.filter((w) => w.group.visible).map((w) => R(w)));
  const boardTop = portrait ? [0, 0, MOBILE.w, 560] : [BOARD.side, 0, 360, 470];
  const phoneBody = [-14, -14, PH.w + 28, PH.h + 28];
  const chat = [0, 96, PH.w, 470];

  const shots = [
    // 1. the idea
    { t: [0, 2.2], subj: wordPts, dir: nrm(phone.screen), fill: 0.9, ap: 0.003 },
    { t: [2.95, 3.9], subj: () => R(phone.screen, phoneBody), dir: nrm(phone.screen, -6), fill: 0.96, at: 3.6 },
    // 16:9 shows the whole phone (readable as is); 9:16 zooms on the whole conversation
    { t: [4.25, 6.25], subj: () => R(phone.screen, portrait ? chat : phoneBody), dir: nrm(phone.screen, -4), fill: portrait ? 0.98 : 0.96 },
    { t: [6.35, 10.05], follow: true, subj: () => R(card), dir: fixed(board, -6), fill: portrait ? 0.55 : 0.45, ease: 0.7 },
    { t: [10.05, 11.25], subj: () => R(board, boardTop), dir: nrm(board, -4), fill: 0.97 },
    // 2. the ticket
    { t: [12.6, 14.9], subj: () => pts(R(board), R(desk), R(cortx), R(mcp), ...labels.map((l) => R(l))), dir: nrm(board, ...L.stackView), fill: 0.97, at: 14.6, push: 0.08 },
    { t: [15.0, 18.6], follow: true, subj: () => R(cortx), dir: fixed(board, -4), fill: 0.92, ease: 0.8 },
    // 3. the agent
    { t: [18.6, 19.7], subj: () => R(cortx), dir: nrm(cortx), fill: 0.92 },
    // 16:9 keeps the whole window (its text is readable at that size); 9:16 zooms on what is being typed or printed
    { t: [20.0, 21.75], subj: () => R(cortx, portrait ? inputRect(G) : null), dir: nrm(cortx), fill: portrait ? 0.95 : 0.94, push: 0.04 },
    { t: [22.05, 22.95], subj: () => R(cortx, portrait ? blockRect(copy, G, 22.95, T.skill, T.show) : null), dir: nrm(cortx), fill: portrait ? 0.95 : 0.96, push: 0.03 },
    { t: [23.35, 25.05], subj: () => pts(R(cortx), R(card)), dir: nrm(cortx), fill: 0.95 },
    // 4. the work
    { t: [25.95, 28.35], subj: () => pts(...codeLines.map((s) => R(s))), dir: nrm(cortx), fill: 0.92, at: 27.6, ap: 0.014 },
    { t: [28.85, 30.6], subj: () => pts(R(cortx), R(card)), dir: nrm(cortx), fill: 0.95 },
    { t: [31.2, 32.85], subj: () => pts(R(hook), R(commit), boxPts(gate.group)), dir: nrm(hook), fill: 0.95, at: 32.6 },
    { t: [33.25, 37.0], subj: () => pts(R(op), R(commit), boxPts(gate.group)), dir: nrm(hook), fill: 0.95, at: 34.4 },
    // 5. the trace
    { t: [36.85, 37.85], follow: true, subj: () => R(commit), dir: fixed(detail), fill: 0.55, ease: 0.35 },
    ...(portrait
      ? [
          { t: [37.55, 39.3], subj: () => R(detail), dir: nrm(detail), fill: 0.97, at: 39.3 },
          // 9:16: the comments section, whole, close enough to read on a phone
          { t: [39.65, 41.1], subj: () => R(detail, [0, 380, DD.w, 270]), dir: nrm(detail), fill: 0.97, at: 41.1 },
        ]
      : [{ t: [37.55, 41.1], subj: () => R(detail), dir: nrm(detail), fill: 0.97, push: 0.1, at: 41.1 }]),
    { t: [41.2, 42.55], follow: true, subj: () => R(doc), dir: fixed(doc), fill: 0.95, ease: 0.6 },
    ...(portrait
      ? [
          // 9:16: no tilt between two white pages (it reads as a flash): one settled shot holds both
          { t: [42.55, 45.35], subj: () => pts(R(doc), R(dia)), dir: nrm(doc), fill: 0.98, at: 45.35, push: 0.06 },
        ]
      : [
          { t: [42.55, 42.85], subj: () => R(doc), dir: nrm(doc), fill: 0.95, at: 42.85 },
          { t: [43.85, 45.35], subj: () => R(dia), dir: nrm(dia), fill: 0.96 },
        ]),
    // 6. the environment
    { t: [47.3, 49.6], subj: stations, dir: () => V(0, 0, 1), fill: 0.95, at: 49.5 },
    { t: [50.3, 53.85], subj: () => pts(portrait ? pts(R(board), R(phone.screen), R(hook), R(commit), R(detail)) : stations(), boxPts(logo.group), R(word), R(subw)), dir: () => V(0, 0, 1), fill: 0.97, at: 53.0, push: 0.04, ap: 0 },
  ];
  const aspect = ctx.W / ctx.H;
  const camera = buildCamera(shots, { dur: DUR, fov: L.fov, aspect, baseFill: L.fill, pose });

  /**
   * How fast the picture slides at time t, as a fraction of the frame per frame (pure: poses the scene at
   * t ± half a frame). Used to open the shutter on fast moves only.
   */
  function motion(t, fps) {
    const at = (u) => {
      pose(u);
      const c = camera(u);
      return { p: V(c[0], c[1], c[2]), d: V(c[3] - c[0], c[4] - c[1], c[5] - c[2]) };
    };
    const a = at(t - 0.5 / fps), b = at(t + 0.5 / fps);
    const dist = Math.max(0.5, a.d.length());
    const turn = a.d.clone().normalize().angleTo(b.d.clone().normalize());
    const slide = a.p.distanceTo(b.p) / dist;
    return (turn + slide) / ((L.fov * Math.PI) / 180);
  }

  return {
    motion,
    update(t) {
      pose(t);
      const c = camera(t);
      const cam = world.camera;
      // impact kicks as small damped shakes, deterministic
      const kick = (t0, a) => (t > t0 ? a * Math.exp(-(t - t0) * 9) * Math.sin((t - t0) * 48) : 0);
      const shake = kick(T.stamp, 0.012) + kick(T.impact, 0.008) + kick(T.logo, 0.02);
      cam.position.set(c[0], c[1] + shake, c[2]);
      cam.lookAt(c[3], c[4] + shake * 0.5, c[5]);
      cam.fov = c[6];
      // lens shift: the picture sits a little higher, so the lower band (captions) stays quieter
      cam.setViewOffset(ctx.W, ctx.H, 0, ctx.H * L.lensShift, ctx.W, ctx.H);
      cam.updateProjectionMatrix();
      post.params.focus = Math.hypot(c[0] - c[3], c[1] - c[4], c[2] - c[5]);
      post.params.aperture = Math.max(0, c[7]);
      const u = dome.material.uniforms;
      u.uKA.value = 0.6;
      u.uKB.value = t < 10 ? 0.5 : t > 46 ? 0.42 : 0.3;
    },
  };
}

/** The pre-commit gate: two posts on both sides of the commit card, and a blade that sweeps across it. */
function makeGate(halfW, H) {
  const group = new THREE.Group();
  const mat = new THREE.MeshPhysicalMaterial({ color: '#1b2c30', metalness: 0.5, roughness: 0.55, envMapIntensity: 0.6 });
  for (const x of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.06, H, 0.12), mat);
    m.position.set(x * halfW, 0, 0);
    group.add(m);
  }
  const blade = new THREE.Mesh(new THREE.PlaneGeometry(0.03, H * 0.92), new THREE.MeshBasicMaterial({ color: new THREE.Color('#2dd4bf').multiplyScalar(2.2), transparent: true, depthWrite: false }));
  blade.position.z = 0.12;
  group.add(blade);
  return {
    group,
    update(t) {
      const on = clamp(inv(T.gate - 0.15, T.gate + 0.1, t)) * (1 - clamp(inv(T.checks[2] + 0.2, T.checks[2] + 0.5, t)));
      blade.material.opacity = 0.85 * on;
      blade.visible = on > 0.01;
      // three passes, one per check
      const u = clamp(inv(T.gate, T.checks[2], t)) * 3;
      const pass = Math.min(2, Math.floor(u));
      const f = smoother(u - pass);
      blade.position.x = (pass % 2 === 0 ? lerp(-halfW + 0.05, halfW - 0.05, f) : lerp(halfW - 0.05, -halfW + 0.05, f));
    },
  };
}

/** A straight light thread through four points, drawn from the far layer to the near one. */
function makeSkewer() {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uHead: { value: 0 }, uK: { value: 0 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `uniform float uHead, uK; varying vec2 vUv;
      void main(){ float u = vUv.x; if (u > uHead) discard;
        float head = exp(-(uHead - u) * 18.0);
        gl_FragColor = vec4(vec3(1.0, 0.62, 0.05) * (0.8 + 2.4 * head) * uK, 1.0); }`,
  });
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
  let last = null;
  return {
    mesh,
    set(pts) {
      const key = pts.map((p) => p.toArray().map((v) => v.toFixed(4)).join(',')).join(';');
      if (key === last) return;
      last = key;
      // starts a little behind the board, ends on the nearest surface
      const a = pts[0].clone().add(pts[0].clone().sub(pts[1]).setLength(0.5));
      const curve = new THREE.CatmullRomCurve3([a, ...pts], false, 'centripetal');
      mesh.geometry.dispose();
      mesh.geometry = new THREE.TubeGeometry(curve, 160, 0.008, 6, false);
    },
    update(t) {
      const k = clamp(inv(T.skewer - 0.05, T.skewer + 0.05, t)) * (1 - clamp(inv(T.dive, T.dive + 0.5, t)));
      mat.uniforms.uHead.value = smoother(clamp(inv(T.skewer, T.skewer + 0.7, t)));
      mat.uniforms.uK.value = k;
      mesh.visible = k > 0.001;
    },
  };
}

/** The amber thread: a tube along the route, drawn up to a head parameter. */
function makeThread(points) {
  const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal');
  const geo = new THREE.TubeGeometry(curve, 1200, 0.014, 8, true);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uHead: { value: 0 }, uTail: { value: 0 }, uGlow: { value: 1 }, uPing: { value: -1 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `uniform float uHead, uTail, uGlow, uPing; varying vec2 vUv;
      void main(){
        float u = vUv.x;
        if (u > uHead || u < uTail) discard;
        float head = exp(-(uHead - u) * 70.0);
        float ping = uPing >= 0.0 ? exp(-abs(u - uPing) * 45.0) : 0.0;
        vec3 amber = vec3(1.0, 0.6, 0.04);
        gl_FragColor = vec4(amber * (0.42 + 2.8 * head + 3.2 * ping) * uGlow, 1.0);
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  // TubeGeometry samples the curve by arc length: convert each station index into an arc fraction
  const n = points.length;
  const N = 3000;
  const lens = curve.getLengths(N);
  const at = (i) => lens[Math.round((i / n) * N)] / lens[N];
  const keys = [
    [0, 0], [T.lift, 0], [T.impact, at(1)], [T.dive, at(1)], [T.cortxFormed, at(2)],
    [T.gate - 0.8, at(2)], [T.gate + 0.4, at(3)], [T.rejoin, at(3)], [T.detail, at(4)],
    [T.doc - 0.3, at(4)], [T.diagram + 0.7, at(5)], [T.trace, at(5)], [T.closed, 1],
  ];
  return {
    mesh,
    update(t) {
      const u = mat.uniforms;
      let head = 0;
      for (let i = 1; i < keys.length; i++) {
        if (t >= keys[i - 1][0]) head = lerp(keys[i - 1][1], keys[i][1], smoother(clamp(inv(keys[i - 1][0], keys[i][0], t))));
      }
      u.uHead.value = t >= T.closed ? 1.001 : head;
      // the tail chases the head at the loop end, so t = 0 starts with no thread
      u.uTail.value = smoother(clamp(inv(T.ret, 55.6, t))) * 1.002;
      u.uGlow.value = lerp(0.5, 1.5, clamp(inv(T.pull, T.trace + 1, t)));
      u.uPing.value = t > T.closed && t < T.ret + 0.6 ? ((t - T.closed) / 2.0) % 1 : -1;
      mesh.visible = t > T.lift - 0.1 && t < 55.7;
    },
  };
}
