/**
 * The film's timeline. Everything is measured from the DOM once (layout positions, unaffected by transforms),
 * then expressed as GSAP tweens on transform and opacity, so the whole film can be played, paused and scrubbed.
 * Text that changes over time (typing, counters, the status line) is a pure function of the playhead: `hud(t)`.
 */
import gsap from 'gsap';
import {SIZES, type Mode} from './Stage';

export const SCENES = [0, 9, 17, 29, 41, 50];
export const END = 58;

/** The time at which each scene is "complete": used as a still frame (reduced motion, debug). */
export const POSTERS = [8.6, 16.6, 28.6, 40.6, 49.8, END];

type Box = {x: number; y: number; w: number; h: number};

export function buildFilm(root: HTMLElement, mode: Mode) {
  const q = (name: string) => root.querySelector<HTMLElement>(`[data-f="${name}"]`)!;
  const qa = (name: string) => Array.from(root.querySelectorAll<HTMLElement>(`[data-f="${name}"]`));
  const {w: W, h: H} = SIZES[mode];
  const L = mode === 'L';

  const world = q('world');
  const board = q('board');
  const term = q('term');
  const tcard = q('tcard');

  /** Position of `el` in the coordinates of `ancestor`, from layout offsets. */
  const box = (el: HTMLElement, ancestor: HTMLElement = world): Box => {
    let x = 0;
    let y = 0;
    let e: HTMLElement | null = el;
    while (e && e !== ancestor) {
      x += e.offsetLeft;
      y += e.offsetTop;
      e = e.offsetParent as HTMLElement | null;
    }
    return {x, y, w: el.offsetWidth, h: el.offsetHeight};
  };
  const union = (...bs: Box[]): Box => {
    const x = Math.min(...bs.map((b) => b.x));
    const y = Math.min(...bs.map((b) => b.y));
    const r = Math.max(...bs.map((b) => b.x + b.w));
    const btm = Math.max(...bs.map((b) => b.y + b.h));
    return {x, y, w: r - x, h: btm - y};
  };
  const pad = L ? {t: 78, r: 56, b: 36, l: 56} : {t: 64, r: 12, b: 20, l: 12};
  const frame = (b: Box, max = 1.05) => {
    const aw = W - pad.l - pad.r;
    const ah = H - pad.t - pad.b;
    const scale = Math.min(aw / b.w, ah / b.h, max);
    return {
      x: pad.l + aw / 2 - (b.x + b.w / 2) * scale,
      y: pad.t + ah / 2 - (b.y + b.h / 2) * scale,
      scale,
    };
  };

  const tl = gsap.timeline({paused: true, defaults: {ease: 'power3.out', duration: 0.6}});
  const cam = (at: number, b: Box, dur = 1.4, max?: number) =>
    tl.to(world, {...frame(b, max), duration: dur, ease: 'power3.inOut'}, at);
  const show = (target: gsap.TweenTarget, at: number, vars: gsap.TweenVars & {from?: gsap.TweenVars} = {}) => {
    const {from = {}, ...to} = vars;
    return tl.fromTo(target, {autoAlpha: 0, y: 10, ...from}, {autoAlpha: 1, y: 0, ...to}, at);
  };
  const hide = (target: gsap.TweenTarget, at: number, vars: gsap.TweenVars = {}) =>
    tl.to(target, {autoAlpha: 0, duration: 0.35, ease: 'power2.in', ...vars}, at);

  // ── Initial state ─────────────────────────────────────────────────────────────────────────────
  const hidden = [
    'phUser', 'phThink', 'phTool', 'phAnswer', 'phEmbed', 'phWave', 'board', 'surfaces', 'term', 'codex',
    'approve', 'doc', 'diagram', 'cursor', 'const', 'tcard', 'zComment', 'tabWeb', 'tabCodex', 'toast',
    'banner', 'bannerDone', 'tcProg', 'tcDone', 'ccBottom', 'tl-head', 'signedLine', 'webOk', 'dict', 'phone',
    'dockTag',
  ];
  tl.set(hidden.map(q), {autoAlpha: 0}, 0);
  tl.set(qa('stamp'), {autoAlpha: 0, yPercent: 100}, 0);
  tl.set(world, {transformOrigin: '0 0'}, 0);

  const phone = box(q('phone'));
  const dict = box(q('dict'));
  const boardBox = box(board);
  const termBox = box(term);

  // Scene stamps ("01 The idea"…): the outgoing one slides up, the next one slides in from below.
  const stamps = qa('stamp');
  SCENES.forEach((at, i) => {
    if (i > 0) tl.to(stamps[i - 1], {autoAlpha: 0, yPercent: -100, duration: 0.45, ease: 'power2.in'}, at);
    tl.to(stamps[i], {autoAlpha: 1, yPercent: 0, duration: 0.7, ease: 'expo.out'}, at + (i ? 0.4 : 0.3));
  });

  // ── 1 · The idea ──────────────────────────────────────────────────────────────────────────────
  tl.set(world, frame(union(phone, dict), 1), 0);
  tl.fromTo(q('phone'), {y: 60, rotate: L ? -4 : 0, autoAlpha: 0}, {y: 0, rotate: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out'}, 0);
  tl.to(q('phMic'), {scale: 1.15, duration: 0.3, ease: 'back.out(3)'}, 0.9);
  hide(q('phPlaceholder'), 0.9, {duration: 0.2});
  show(q('phWave'), 1.0, {from: {y: 0, scaleX: 0.4}, scaleX: 1, duration: 0.4});
  show(q('dict'), 1.0, {from: {y: 0}, duration: 0.3});
  tl.fromTo(
    qa('dictWord'),
    {autoAlpha: 0, yPercent: 60, rotateX: -50},
    {autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 0.6, ease: 'expo.out', stagger: 0.19},
    1.2,
  );
  // The spoken sentence condenses into the chat bubble.
  tl.to(q('phMic'), {scale: 1, duration: 0.3}, 4.0);
  hide(q('phWave'), 4.0, {duration: 0.25});
  tl.to(q('phPlaceholder'), {autoAlpha: 1, duration: 0.3}, 4.25);
  tl.to(
    q('dict'),
    {x: phone.x + phone.w * 0.55 - dict.x, y: phone.y + 130 - dict.y, scale: 0.3, autoAlpha: 0, duration: 0.75, ease: 'power3.in', transformOrigin: '0 0'},
    4.0,
  );
  show(q('phUser'), 4.5, {from: {y: 16, scale: 0.94}, scale: 1, transformOrigin: '100% 100%', ease: 'back.out(1.6)'});
  show(q('phThink'), 5.0, {duration: 0.3});
  hide(q('phThink'), 5.7, {duration: 0.2});
  show(q('phTool'), 5.8, {from: {x: -10, y: 0}, x: 0});
  show(q('phAnswer'), 6.3);
  show(q('phEmbed'), 6.9, {from: {y: 14, scale: 0.92}, scale: 1, ease: 'back.out(1.7)', duration: 0.7});

  // ── 2 · The ticket ────────────────────────────────────────────────────────────────────────────
  const S2 = SCENES[1];
  const embed = box(q('phEmbed'));
  const slotOpen = box(q('slot-open'), board);
  const slotProg = box(q('slot-prog'), board);
  const slotDone = box(q('slot-done'), board);
  tcard.style.width = `${slotOpen.w}px`;
  const cardH = tcard.offsetHeight;
  const gap = 8;

  tl.fromTo(board, {x: L ? 140 : 0, y: L ? 0 : 80, autoAlpha: 0}, {x: 0, y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out'}, S2);
  cam(S2, L ? union(phone, boardBox) : boardBox, 1.3);
  hide(q('dict'), S2, {duration: 0.01});

  // The card leaves the phone and lands at the top of the "Open" column.
  const from = {x: embed.x - boardBox.x, y: embed.y - boardBox.y, scale: embed.w / slotOpen.w};
  const F = S2 + 1.1;
  tl.set(tcard, {...from, autoAlpha: 1, transformOrigin: '0 0', rotate: 0}, F);
  tl.to(q('phEmbed'), {autoAlpha: 0.25, duration: 0.3}, F);
  tl.to(tcard, {x: slotOpen.x, duration: 1.15, ease: 'power2.inOut'}, F);
  tl.to(tcard, {y: slotOpen.y, duration: 1.15, ease: L ? 'back.in(1.2)' : 'power2.inOut'}, F);
  tl.to(tcard, {scale: 1, duration: 1.15, ease: 'power1.inOut'}, F);
  tl.to(tcard, {rotate: L ? -7 : -4, duration: 0.55, ease: 'sine.out'}, F);
  tl.to(tcard, {rotate: 0, duration: 0.6, ease: 'back.out(3)'}, F + 0.55);
  tl.to(q('rest-open'), {y: cardH + gap, duration: 0.55, ease: 'power3.out'}, F + 0.75);
  tl.fromTo(q('tcGlow'), {autoAlpha: 0.9, scale: 1}, {autoAlpha: 0, scale: 1.12, duration: 1.3, ease: 'power2.out'}, F + 1.15);
  tl.fromTo(qa('surface'), {autoAlpha: 0, y: 16}, {autoAlpha: 1, y: 0, stagger: 0.14, duration: 0.6, ease: 'back.out(1.8)'}, S2 + 3.2);
  tl.set(q('surfaces'), {autoAlpha: 1}, S2 + 3.2);

  // ── 3 · The agent ─────────────────────────────────────────────────────────────────────────────
  const S3 = SCENES[2];
  const ds = L ? 0.46 : 1;
  const dock = {x: termBox.x + termBox.w + 22, y: termBox.y + 34};
  const dockBox: Box = {x: dock.x, y: dock.y, w: boardBox.w * ds, h: boardBox.h * ds};
  const comment = q('zComment');

  hide(q('surfaces'), S3, {duration: 0.3});
  tl.fromTo(term, {autoAlpha: 0, y: 120}, {autoAlpha: 1, y: 0, duration: 1.2, ease: 'expo.out'}, S3 + 0.2);
  if (L) {
    tl.to(board, {x: dock.x - boardBox.x, y: dock.y - boardBox.y, scale: ds, transformOrigin: '0 0', duration: 1.3, ease: 'power3.inOut'}, S3);
    tl.to(q('phone'), {autoAlpha: 0, duration: 0.6}, S3 + 0.4);
    cam(S3, union(termBox, dockBox), 1.4);
    show(q('dockTag'), S3 + 1.2, {from: {y: 8}});
  } else {
    cam(S3, termBox, 1.3);
  }

  // Terminal lines: shown one by one, the pane scrolls to keep the last one in view.
  const tLines = q('tLines');
  const viewH = q('tScroll').clientHeight;
  let scroll = 0;
  const reveal = (id: string, at: number) => {
    const el = q(id);
    const bottom = el.offsetTop + el.offsetHeight;
    const target = Math.max(0, bottom - viewH + 10);
    if (target > scroll) {
      tl.to(tLines, {y: -target, duration: 0.45, ease: 'power2.out'}, at);
      scroll = target;
    }
    show(el, at, {from: {y: 6}, duration: 0.35});
    return el.offsetTop - scroll;
  };
  const toolOk = (id: string, at: number) => {
    tl.fromTo(q(`ok-${id}`), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.2, ease: 'none'}, at);
    show(q(`res-${id}`), at, {from: {y: 4}, duration: 0.3});
  };

  // Every tool line starts hidden, with its result.
  root.querySelectorAll<HTMLElement>('[data-f^="tl-"]').forEach((el) => {
    if (el.dataset.f !== 'tl-prompt') tl.set(el, {autoAlpha: 0}, 0);
  });
  root.querySelectorAll<HTMLElement>('[data-f^="ok-"], [data-f^="res-"]').forEach((el) => tl.set(el, {autoAlpha: 0}, 0));

  const T = {
    cc: S3 + 1.5,
    enterCc: S3 + 2.0,
    take: S3 + 2.8,
    enterTake: S3 + 4.0,
    skill: S3 + 4.4,
    show: S3 + 5.4,
    move: S3 + 7.0,
    read: SCENES[3] + 0.3,
    edit: SCENES[3] + 1.3,
    serve: SCENES[3] + 2.9,
    build: SCENES[3] + 4.5,
    commit: SCENES[3] + 6.6,
    signed: SCENES[3] + 9.3,
    comment: SCENES[4] + 0.3,
    close: SCENES[4] + 1.6,
    final: SCENES[4] + 3.0,
    codex: SCENES[4] + 3.4,
    docs: SCENES[4] + 5.8,
  };

  const paneBox = box(q('tScroll'));
  // A beam: a faint trail from the end of the command to its target in Zorg, and a bright streak along it.
  const beam = (name: string, lineId: string, startY: number, to: {x: number; y: number}, at: number) => {
    const arg = q(`tl-${lineId}`).querySelector<HTMLElement>('[class*="tArg"]');
    const end = arg ? Math.min(arg.offsetLeft + arg.offsetWidth, paneBox.w - 10) : paneBox.w - 10;
    const a = {x: paneBox.x + end + 10, y: paneBox.y + startY + 10};
    const d = `M${a.x} ${a.y} C${a.x + 120} ${a.y - 30}, ${to.x - 120} ${to.y}, ${to.x} ${to.y}`;
    const p = q(name);
    const trail = q(`${name}T`);
    p.setAttribute('d', d);
    trail.setAttribute('d', d);
    tl.fromTo(trail, {autoAlpha: 0, strokeDashoffset: 1}, {autoAlpha: 0.55, strokeDashoffset: 0, duration: 0.7, ease: 'power2.out'}, at);
    tl.fromTo(p, {autoAlpha: 1, strokeDashoffset: 0.3}, {strokeDashoffset: -1, duration: 1.1, ease: 'power2.inOut'}, at + 0.15);
    tl.set(p, {autoAlpha: 0}, at + 1.26);
    tl.to(trail, {autoAlpha: 0, duration: 0.5}, at + 1.3);
  };
  tl.set(['beam', 'beam2', 'beam3', 'beamT', 'beam2T', 'beam3T'].map(q), {autoAlpha: 0}, 0);
  const cardAt = (slot: Box) => ({x: dock.x + slot.x * ds, y: dock.y + (slot.y + cardH / 2) * ds});

  tl.to(q('caretCc'), {autoAlpha: 0, duration: 0.05}, T.enterCc);
  reveal('tl-head', T.enterCc + 0.15);
  show(q('ccBottom'), T.enterCc + 0.3, {from: {y: 12}});
  tl.set(q('caretTake'), {autoAlpha: 1}, 0);
  hide(q('typeTake'), T.enterTake, {duration: 0.1});
  reveal('tl-user', T.enterTake + 0.05);
  reveal('tl-skill', T.skill);
  toolOk('skill', T.skill + 0.6);
  const yShow = reveal('tl-show', T.show);
  if (L) beam('beam', 'show', yShow, cardAt(slotOpen), T.show + 0.25);
  tl.fromTo(q('tcGlow'), {autoAlpha: 0.9, scale: 1}, {autoAlpha: 0, scale: 1.12, duration: 1, ease: 'power2.out'}, T.show + 1.05);
  toolOk('show', T.show + 1.1);
  const yMove = reveal('tl-move', T.move);
  if (L) beam('beam2', 'move', yMove, cardAt(slotOpen), T.move + 0.15);
  tl.to(tcard, {x: slotProg.x, y: slotProg.y, duration: 0.8, ease: 'power3.inOut'}, T.move + 0.6);
  tl.to(q('rest-open'), {y: 0, duration: 0.5}, T.move + 0.7);
  tl.to(q('rest-prog'), {y: cardH + gap, duration: 0.5}, T.move + 0.6);
  show(q('tcProg'), T.move + 1.0, {from: {y: 0, scale: 0.4}, scale: 1, duration: 0.4, ease: 'back.out(2)'});
  toolOk('move', T.move + 1.0);
  show(q('banner'), T.move + 1.1, {from: {y: 8}});

  // ── 4 · The work ──────────────────────────────────────────────────────────────────────────────
  const S4 = SCENES[3];
  if (L) cam(S4, union(termBox, dockBox), 1.2, 1.1);
  reveal('tl-read', T.read);
  toolOk('read', T.read + 0.6);
  reveal('tl-edit', T.edit);
  toolOk('edit', T.edit + 0.7);
  reveal('tl-serve', T.serve);
  if (L) show(q('tabWeb'), T.serve + 0.2, {from: {x: -14, y: 0}, x: 0});
  show(q('webOk'), T.serve + 1.1, {from: {y: 0, scale: 0}, scale: 1, ease: 'back.out(3)'});
  hide(q('webSpin'), T.serve + 1.1, {duration: 0.1});
  toolOk('serve', T.serve + 1.1);
  reveal('tl-build', T.build);
  toolOk('build', T.build + 1.3);
  tl.fromTo(q('toast'), {autoAlpha: 0, y: 24, scale: 0.96}, {autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)'}, T.build + 1.4);
  hide(q('toast'), T.build + 3.6, {y: 12});
  reveal('tl-commit', T.commit);
  show(q('res-commit'), T.commit + 0.7, {from: {y: 4}});

  // The password manager asks before signing: the cursor approves.
  const approve = q('approve');
  const okBtn = box(q('approveOk'));
  const cursor = q('cursor');
  const cur = box(cursor);
  const A = T.commit + 1.0;
  tl.fromTo(approve, {autoAlpha: 0, scale: 0.9, y: 10}, {autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)'}, A);
  tl.fromTo(
    cursor,
    {autoAlpha: 0, x: okBtn.x - cur.x + 170, y: okBtn.y - cur.y + 150},
    {autoAlpha: 1, duration: 0.2},
    A + 0.2,
  );
  tl.to(cursor, {x: okBtn.x - cur.x + okBtn.w * 0.45, y: okBtn.y - cur.y + okBtn.h * 0.4, duration: 0.9, ease: 'power3.inOut'}, A + 0.3);
  tl.to(cursor, {scale: 0.82, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut'}, A + 1.3);
  tl.to(q('approveOk'), {scale: 0.94, duration: 0.1, yoyo: true, repeat: 1}, A + 1.3);
  tl.fromTo(q('ripple'), {autoAlpha: 0.8, scale: 0.2}, {autoAlpha: 0, scale: 1.6, duration: 0.6, ease: 'power2.out'}, A + 1.35);
  hide(approve, A + 1.7, {scale: 0.96});
  hide(cursor, A + 1.9);
  show(q('signedLine'), T.signed - 0.6);
  toolOk('commit', T.signed - 0.6);

  // ── 5 · The trail ─────────────────────────────────────────────────────────────────────────────
  const S5 = SCENES[4];
  const commentBox = box(comment);
  if (!L) cam(S5, union(boardBox, commentBox), 1.2);
  const yComment = reveal('tl-comment', T.comment);
  if (L) beam('beam3', 'comment', yComment, {x: commentBox.x, y: commentBox.y + 26}, T.comment + 0.15);
  show(comment, T.comment + 0.9, {from: {y: 14, scale: 0.96}, scale: 1, transformOrigin: '0 0', ease: 'back.out(1.6)'});
  toolOk('comment', T.comment + 0.9);
  reveal('tl-close', T.close);
  tl.to(tcard, {x: slotDone.x, y: slotDone.y, duration: 0.8, ease: 'power3.inOut'}, T.close + 0.4);
  tl.to(q('rest-prog'), {y: 0, duration: 0.5}, T.close + 0.5);
  tl.to(q('rest-done'), {y: cardH + gap, duration: 0.5}, T.close + 0.4);
  show(q('tcDone'), T.close + 0.9, {from: {y: 0, scale: 0.3}, scale: 1, duration: 0.45, ease: 'back.out(2.5)'});
  tl.fromTo(q('tcGlow'), {autoAlpha: 0.9, scale: 1}, {autoAlpha: 0, scale: 1.14, duration: 1.1}, T.close + 1.0);
  hide(q('bannerProg'), T.close + 0.9, {y: -8, duration: 0.25});
  show(q('bannerDone'), T.close + 1.05, {from: {y: 8}, duration: 0.35});
  toolOk('close', T.close + 0.9);
  reveal('tl-final', T.final);

  // Codex reviews.
  const codexBox = box(q('codex'));
  if (!L) cam(T.codex - 0.3, union(codexBox, {...termBox, y: termBox.y + termBox.h - 220, h: 220}), 1.1);
  if (L) show(q('tabCodex'), T.codex, {from: {x: -14, y: 0}, x: 0});
  show(q('codex'), T.codex + 0.2, {from: {y: 20, scale: 0.97}, scale: 1, ease: 'back.out(1.5)'});
  show(q('codexRes'), T.codex + 1.9, {from: {y: 6}});
  tl.set(q('codexRes'), {autoAlpha: 0}, 0);

  // Skills produce a document and a diagram.
  const docBox = box(q('doc'));
  const diaBox = box(q('diagram'));
  cam(T.docs, union(docBox, diaBox), 1.5, 1);
  tl.fromTo(q('doc'), {autoAlpha: 0, y: 50, rotate: L ? 3 : 0}, {autoAlpha: 1, y: 0, rotate: L ? -1.5 : 0, duration: 1, ease: 'expo.out'}, T.docs + 0.3);
  tl.fromTo(q('diagram'), {autoAlpha: 0, y: 50, rotate: L ? -3 : 0}, {autoAlpha: 1, y: 0, rotate: L ? 1 : 0, duration: 1, ease: 'expo.out'}, T.docs + 0.6);
  tl.fromTo([q('docSkill'), q('diaSkill')], {autoAlpha: 0, scale: 0.6}, {autoAlpha: 1, scale: 1, stagger: 0.25, ease: 'back.out(2.5)', duration: 0.5}, T.docs + 0.9);
  tl.fromTo(qa('docSection'), {autoAlpha: 0, y: 12}, {autoAlpha: 1, y: 0, stagger: 0.32, duration: 0.5}, T.docs + 1.1);
  tl.fromTo(qa('diaZone'), {autoAlpha: 0}, {autoAlpha: 1, stagger: 0.15, duration: 0.4}, T.docs + 1.1);
  tl.fromTo(qa('diaBlock'), {autoAlpha: 0, scale: 0.85, transformOrigin: '50% 50%'}, {autoAlpha: 1, scale: 1, stagger: 0.14, duration: 0.45, ease: 'back.out(2)'}, T.docs + 1.4);
  tl.fromTo(qa('diaArrow'), {strokeDashoffset: 1}, {strokeDashoffset: 0, stagger: 0.22, duration: 0.5, ease: 'power2.inOut'}, T.docs + 2.0);
  tl.fromTo(qa('diaLabel'), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.4}, T.docs + 2.6);

  // ── 6 · The environment ───────────────────────────────────────────────────────────────────────
  const S6 = SCENES[5];
  tl.to(world, {autoAlpha: 0, scale: `-=${L ? 0.12 : 0.08}`, duration: 0.9, ease: 'power2.in'}, S6);
  tl.set(q('const'), {autoAlpha: 1}, S6 + 0.5);
  tl.fromTo(q('cCenter'), {scale: 0, autoAlpha: 0}, {scale: 1, autoAlpha: 1, duration: 1, ease: 'back.out(1.8)'}, S6 + 0.6);
  tl.fromTo(qa('cLine'), {strokeDashoffset: 1}, {strokeDashoffset: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out'}, S6 + 1.0);
  tl.fromTo(qa('cNode'), {scale: 0, autoAlpha: 0}, {scale: 1, autoAlpha: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(2)'}, S6 + 1.1);
  tl.fromTo(qa('cLineOuter'), {strokeDashoffset: 1}, {strokeDashoffset: 0, stagger: 0.04, duration: 0.6}, S6 + 1.8);
  tl.fromTo(qa('cTool'), {scale: 0, autoAlpha: 0}, {scale: 1, autoAlpha: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(2)'}, S6 + 1.9);
  tl.fromTo(qa('cPacket'), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.5}, S6 + 2.4);
  tl.fromTo(qa('finale'), {yPercent: 110}, {yPercent: 0, stagger: 0.35, duration: 0.9, ease: 'expo.out'}, S6 + 2.6);
  tl.set({}, {}, END);

  // ── Text driven by the playhead ───────────────────────────────────────────────────────────────
  const typers = [
    {el: q('typeCc'), at: T.cc, cps: 8},
    {el: q('typeTake'), at: T.take, cps: 20},
    {el: q('typeCodex'), at: T.codex + 0.7, cps: 24},
  ].map((t) => ({...t, full: t.el.dataset.type ?? ''}));

  const set = (() => {
    const cache = new Map<HTMLElement, string>();
    return (el: HTMLElement, text: string) => {
      if (cache.get(el) !== text) {
        cache.set(el, text);
        el.textContent = text;
      }
    };
  })();
  const lerp = (t: number, t0: number, t1: number, a: number, b: number) =>
    a + (b - a) * Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));

  const slBar = q('slBar');
  const backdrop = root.querySelector<HTMLElement>('[data-f="backdrop"]');
  const els = {
    open: q('count-open'),
    prog: q('count-prog'),
    done: q('count-done'),
    ctx: q('slCtx'),
    cost: q('slCost'),
    time: q('slTime'),
    plus: q('slPlus'),
    minus: q('slMinus'),
    dirty: q('slDirty'),
    agents: q('agentsCount'),
  };
  const landed = F + 1.1;
  const hud = (t: number) => {
    for (const ty of typers) {
      const n = Math.max(0, Math.min(ty.full.length, Math.floor((t - ty.at) * ty.cps)));
      set(ty.el, ty.full.slice(0, n));
    }
    set(els.open, String(t < landed ? 2 : t < T.move + 0.8 ? 3 : 2));
    set(els.prog, String(t < T.move + 0.8 ? 1 : t < T.close + 0.8 ? 2 : 1));
    set(els.done, String(t < T.close + 0.8 ? 2 : 3));
    const ctx = Math.round(lerp(t, S3 + 3, T.final, 8, 31));
    set(els.ctx, `${ctx}% · ${ctx * 2}k/200k`);
    slBar.style.transform = `scaleX(${ctx / 100})`;
    set(els.cost, `💰 $${lerp(t, S3 + 3, T.final, 0.04, 0.71).toFixed(2)}`);
    set(els.time, `⏱ ${Math.round(lerp(t, S3 + 3, T.final, 0, 14))}m`);
    const edited = t >= T.edit + 0.7;
    set(els.plus, edited ? '+18' : '+0');
    set(els.minus, edited ? '−2' : '−0');
    set(els.dirty, edited && t < T.signed - 0.6 ? '*1' : '✓');
    set(els.agents, t >= T.codex ? '2' : '1');
    if (backdrop) {
      const wx = Number(gsap.getProperty(world, 'x')) || 0;
      const wy = Number(gsap.getProperty(world, 'y')) || 0;
      backdrop.style.transform = `translate3d(${(wx * 0.06).toFixed(1)}px, ${(wy * 0.06).toFixed(1)}px, 0)`;
    }
  };

  return {tl, hud};
}
