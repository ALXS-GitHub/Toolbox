// Where everything sits, per aspect ratio. The stations lie on a loop:
// phone → Zorg → CortX → gate → detail → skills → phone. The final pull-back shows the whole loop.
// Nothing overlaps by accident: every panel sits on its station's plane, aligned with its neighbours.
// The camera is not here: shots name their subject and are framed automatically (src/camera.js).

export const UPW = 1 / 300;

export function layouts(portrait) {
  return portrait ? port() : land();
}

function land() {
  const L = {
    fov: 32,
    lensShift: 0.05,
    fill: [0.8, 0.72], // share of the frame a subject may use (the lower band is kept for the captions)
    phone: {
      pos: [-11, -2.0, 1.5],
      rot: [0, 0.32, 0],
      big: { size: 0.082, z: 0.42, x0: -0.33, y0: -0.08, maxW: 0.82, lh: 0.104, barStep: 0.021, barW: 0.011 },
    },
    zorg: { pos: [-7.0, 4.2, -1.5], rot: [0, 0.18, 0] },
    cortx: { pos: [2.5, 5.4, -0.5], rot: [0, -0.04, 0] },
    gate: { pos: [10.5, 1.0, 1.0], rot: [0, -0.25, 0] },
    detail: { pos: [6.8, -4.6, 0.5], rot: [0, -0.16, 0] },
    skills: { pos: [-0.6, -5.6, 1.0], rot: [0, 0.06, 0] },
    fly1: [1.4, 1.8, 2.2],
    fly2: [-1.0, -0.4, 2.0],
    // the ticket waits beside the CortX window (right edge, top aligned), never on it
    cardPark: (G, cw, ch) => [(G.w * UPW) / 2 + 0.25 + cw / 2, (G.h * UPW) / 2 - ch / 2, 0],
    stack: {
      scale: () => 1,
      // a staircase toward the camera: each layer comes forward and down, one per beat
      // a diagonal staircase toward the camera: each layer comes forward, right and down, one per beat
      layer: (i, k) => [1.15 * i * k, -0.6 * i * k, -0.06 + 1.1 * i * k],
      labelAlign: 'left',
      // label to the right of the layer, level with its top edge (the next layer starts lower)
      label: (i, w, h) => {
        const p = [1.15 * i, -0.6 * i, 1.1 * i];
        return [p[0] + w / 2 + 0.18 + (520 * UPW) / 2, p[1] + h / 2 - 0.16, p[2] + 0.01];
      },
    },
    code: { width: 3.5, top: 0.55, z: 0.9, from: (i) => [-0.2, -0.3 - i * 0.075, 0.03] },
    gateLay: {
      hook: [0, 1.0, 0],
      op: [0, 1.0, 0.3],
      commitIn: [-3.2, -0.45, 0.1],
      commit: [0, -0.45, 0.1],
    },
    skillsLay: { doc: [-1.65, 0, 0], dia: [2.4, 0, 0] },
    final: { row: true, logo: 2.3, gap: 0.5, wordScale: 1 / 72, subScale: 0.42, subGap: 0.55, z: 0.6 },
    threadZ: -2.3,
    // per-shot direction tweaks (degrees)
    stackView: [-16, 8],
  };
  L.threadPts = [L.phone, L.zorg, L.cortx, L.gate, L.detail, L.skills].map((s) => [s.pos[0], s.pos[1], s.pos[2] + L.threadZ]);
  return L;
}

function port() {
  // Composed for 9:16: a vertical loop, mobile Zorg, a narrow CortX, stacked panels.
  const L = land();
  L.fov = 48;
  L.lensShift = 0.09;
  L.fill = [0.86, 0.6];
  L.phone = {
    pos: [-2.6, -6.0, 1.5],
    rot: [0, 0.22, 0],
    big: { size: 0.088, z: 0.42, x0: -0.3, y0: 0.06, maxW: 0.62, lh: 0.112, barStep: 0.021, barW: 0.011 },
  };
  L.zorg = { pos: [-3.2, 1.6, -1.0], rot: [0, 0.15, 0] };
  L.cortx = { pos: [0.8, 8.4, -0.5], rot: [0, -0.05, 0] };
  L.gate = { pos: [3.9, 2.4, 1.0], rot: [0, -0.2, 0] };
  L.detail = { pos: [3.4, -4.2, 0.5], rot: [0, -0.14, 0] };
  L.skills = { pos: [0.6, -9.6, 1.0], rot: [0, 0.05, 0] };
  L.fly1 = [0.8, 2.0, 1.8];
  L.fly2 = [0.6, -1.6, 1.8];
  // above the CortX window, centred
  L.cardPark = (G, cw, ch) => [0, (G.h * UPW) / 2 + 0.25 + ch / 2, 0];
  // a 2 × 2 grid: the four surfaces come out from behind the mobile board, each with its label above
  const SC = [1, 0.32, 0.55, 0.44];
  const REL = [[0, 0, 0], [1.9, 0.95, 0.3], [1.9, -1.2, 0.6], [0, -2.5, 0.9]];
  L.stack = {
    scale: (i) => SC[i],
    layer: (i, k) => [REL[i][0] * k, REL[i][1] * k, -0.06 + (REL[i][2] + 0.06) * k],
    labelAlign: 'left',
    label: (i, w, h) => {
      const p = REL[i];
      return [p[0] - w / 2 + (520 * UPW) / 2 - 0.02, p[1] + h / 2 + 0.22, p[2] + 0.01];
    },
  };
  L.code = { width: 2.5, top: 0.9, z: 0.9, from: (i) => [-0.6, 0.1 - i * 0.075, 0.03] };
  L.gateLay = {
    hook: [0, 1.0, 0],
    op: [0, 1.0, 0.3],
    commitIn: [-2.4, -0.45, 0.1],
    commit: [0, -0.45, 0.1],
  };
  L.skillsLay = { doc: [0, 1.15, 0], dia: [0, -2.35, 0] };
  // set a little above the ring's centre, where the loop leaves the widest clear space
  L.final = { row: false, logo: 2.1, gap: 0.36, wordScale: 1 / 132, subScale: 0.48, subGap: 0.34, z: 6, dy: 0.9 };
  L.stackView = [-6, 4];
  L.threadPts = [L.phone, L.zorg, L.cortx, L.gate, L.detail, L.skills].map((q) => [q.pos[0], q.pos[1], q.pos[2] + L.threadZ]);
  return L;
}
