// Shot framing. A shot names its subject (screens, or a rect inside a screen); the camera is placed so the
// whole subject fits the frame, centred, with air around it, for the current aspect ratio. Static shots are
// measured once (the scene is posed at the shot's time), then joined by a closed spline whose keys all have
// zero velocity: the camera settles on every shot and moves between them with an ease in and out.
import * as THREE from 'three';
import { closedSpline, clamp, inv, lerp, smoother } from './engine/motion.js';

const V = () => new THREE.Vector3();

/** World corners of a rect (css px of the screen's canvas) on a Screen. Defaults to its visible rect. */
export function rectPoints(screen, rect) {
  const r = rect || (() => { const u = screen.uniforms.uRect.value; return [u.x, u.y, u.z, u.w]; })();
  const [x, y, w, h] = r;
  const sx = screen.w / screen.px, sy = screen.h / screen.py;
  screen.mesh.updateWorldMatrix(true, false);
  return [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([px, py]) =>
    screen.mesh.localToWorld(new THREE.Vector3((px - screen.px / 2) * sx, (screen.py / 2 - py) * sy, 0)),
  );
}

/** The screen's facing direction in world space (+Z of its mesh). */
export function normalOf(screen) {
  screen.mesh.updateWorldMatrix(true, false);
  return new THREE.Vector3(0, 0, 1).transformDirection(screen.mesh.matrixWorld).normalize();
}

/**
 * Camera pose that frames `points` seen along `dir` (pointing from the subject toward the camera).
 * fill = [horizontal, vertical] fraction of the frame the subject may use.
 * Returns [px, py, pz, lx, ly, lz].
 */
export function framePose(points, dir, fovDeg, aspect, fill) {
  const d0 = dir.clone().normalize();
  const up0 = Math.abs(d0.y) > 0.95 ? new THREE.Vector3(0, 0, -1) : new THREE.Vector3(0, 1, 0);
  const fwd = d0.clone().negate();
  const right = V().crossVectors(fwd, up0).normalize();
  const up = V().crossVectors(right, fwd).normalize();
  const c0 = V();
  points.forEach((p) => c0.add(p));
  c0.multiplyScalar(1 / points.length);
  let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
  for (const p of points) {
    const q = p.clone().sub(c0);
    const x = q.dot(right), y = q.dot(up);
    xmin = Math.min(xmin, x); xmax = Math.max(xmax, x);
    ymin = Math.min(ymin, y); ymax = Math.max(ymax, y);
  }
  const c = c0.clone().addScaledVector(right, (xmin + xmax) / 2).addScaledVector(up, (ymin + ymax) / 2);
  const tv = Math.tan((fovDeg * Math.PI) / 360);
  const th = tv * aspect;
  let d = 0.5;
  for (const p of points) {
    const q = p.clone().sub(c);
    const x = Math.abs(q.dot(right)), y = Math.abs(q.dot(up)), z = q.dot(d0);
    d = Math.max(d, x / (th * fill[0]) + z, y / (tv * fill[1]) + z);
  }
  const pos = c.clone().addScaledVector(d0, d);
  return [pos.x, pos.y, pos.z, c.x, c.y, c.z];
}

/** Direction `n` turned by yaw (around world up) and pitch (around its right axis), in degrees. */
export function turn(n, yaw = 0, pitch = 0) {
  const d = n.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), (yaw * Math.PI) / 180);
  const right = V().crossVectors(new THREE.Vector3(0, 1, 0), d).normalize();
  return d.applyAxisAngle(right, (-pitch * Math.PI) / 180).normalize();
}

/**
 * Builds the camera from a shot list.
 *   static shot:  { t: [a, b], subj: () => points, dir: () => Vector3, fill, push, ap, at }
 *   follow shot:  { t: [a, b], follow: true, subj, dir, fill, ease, ap }  (measured every frame)
 * `pose(t)` must place the scene at time t (pure). Returns camera(t) → [pos3, look3, fov, aperture].
 */
export function buildCamera(shots, { dur, fov, aspect, baseFill, pose }) {
  const fillOf = (s, k = 1) => [baseFill[0] * (s.fill ?? 1) * k, baseFill[1] * (s.fill ?? 1) * k];
  const keys = [];
  for (const s of shots.filter((x) => !x.follow)) {
    pose(s.at ?? s.t[1]);
    const pts = s.subj();
    const dir = s.dir();
    const end = framePose(pts, dir, fov, aspect, fillOf(s));
    const start = framePose(pts, dir, fov, aspect, fillOf(s, 1 - (s.push ?? 0.05)));
    const ap = s.ap ?? 0;
    keys.push([s.t[0], [...start, fov, ap], 'hold']);
    keys.push([s.t[1], [...end, fov, ap], 'hold']);
  }
  keys.sort((a, b) => a[0] - b[0]);
  const spline = closedSpline(keys, dur);
  const follows = shots.filter((x) => x.follow);
  return (t) => {
    const c = spline(t);
    for (const f of follows) {
      const e = f.ease ?? 0.5;
      const w = smoother(clamp(inv(f.t[0], f.t[0] + e, t))) * (1 - smoother(clamp(inv(f.t[1] - e, f.t[1], t))));
      if (w <= 0) continue;
      const p = framePose(f.subj(t), f.dir(t), fov, aspect, fillOf(f));
      for (let i = 0; i < 6; i++) c[i] = lerp(c[i], p[i], w);
      c[7] = lerp(c[7], f.ap ?? 0, w);
    }
    return c;
  };
}
