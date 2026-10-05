// Entry point. Exposes window.seekFrame(f): paints frame f as a pure function of time.
import * as THREE from 'three';
import { World } from './engine/world.js';
import { Post } from './engine/post.js';
import { loadFonts, loadImage } from './engine/canvas.js';
import { loopT } from './engine/motion.js';
import { COPY } from './copy.js';
import { DUR } from './timeline.js';
import { buildFilm } from './film.js';
import { rectPoints, normalOf, framePose, turn } from './camera.js';

const q = new URLSearchParams(location.search);
const lang = q.get('lang') || 'fr';
const aspect = q.get('aspect') || 'land';
const SUB = +(q.get('sub') || 4);
const FPS = +(q.get('fps') || 60);
const SHUTTER = 0.2; // 72° on settled shots: interface text stays as sharp as a screenshot
// Output size: 2560 × 1440 for wide screens (1440p displays show it 1:1), 1080 × 1920 for tall ones.
// The scene renders supersampled (ss × each dimension) and is reduced with a Lanczos filter.
const [W, H] = aspect === 'land' ? (q.get('res') === '1080' ? [1920, 1080] : [2560, 1440]) : [1080, 1920];
const SS = +(q.get('ss') || (aspect === 'land' ? 1.5 : 2));

const canvas = document.getElementById('c');
canvas.width = W;
canvas.height = H;
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';

await loadFonts('./assets/fonts');
const imgs = {
  claude: await loadImage('./assets/img/claude.png'),
  zorg: await loadImage('./assets/img/zorg.png'),
  cortx: await loadImage('./assets/img/cortx.png'),
  toolbox: await loadImage('./assets/img/toolbox.svg'),
};

const world = new World(canvas, W, H, SS);
const post = new Post(world);
const film = buildFilm(world, post, { copy: COPY[lang], lang, aspect, portrait: aspect === 'port', imgs, W, H });

/**
 * Texture density per screen, measured: the whole timeline is posed (every 3rd frame) and each screen's
 * largest on-screen size, in output pixels per css pixel, is recorded. Its canvas is then painted at twice
 * that (so text never gets magnified), within a memory cap. Deterministic: same poses, same result.
 */
function sizeTextures() {
  const best = new Map();
  const v = new THREE.Vector3();
  const shown = (o) => {
    for (; o; o = o.parent) if (!o.visible) return false;
    return true;
  };
  for (let f = 0; f < DUR * FPS; f += 3) {
    film.update(f / FPS);
    const cam = world.camera;
    cam.updateMatrixWorld();
    for (const s of world.screens) {
      if (!shown(s.mesh) || s.uniforms.uOpacity.value * s.uniforms.uFade.value < 0.05) continue;
      const u = s.uniforms.uRect.value;
      const pts = rectPoints(s, [u.x, u.y, u.z, u.w]).map((p) => {
        v.copy(p).project(cam);
        return [(v.x + 1) * 0.5 * W, (1 - v.y) * 0.5 * H, v.z];
      });
      if (pts.some((p) => p[2] > 1 || p[2] < -1)) continue;
      // skip screens entirely off frame
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      if (Math.max(...xs) < 0 || Math.min(...xs) > W || Math.max(...ys) < 0 || Math.min(...ys) > H) continue;
      const top = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]) / u.z;
      const left = Math.hypot(pts[2][0] - pts[0][0], pts[2][1] - pts[0][1]) / u.w;
      const r = Math.max(top, left);
      if (r > (best.get(s) || 0)) best.set(s, r);
    }
  }
  const report = [];
  for (const s of world.screens) {
    const r = best.get(s) || 0.5;
    const cap = Math.min(8192 / Math.max(s.px, s.py), Math.sqrt(24e6 / (s.px * s.py)));
    const d = Math.max(1, Math.min(cap, Math.ceil(2 * r * 4) / 4));
    s.setDpr(d);
    report.push([s.name, +r.toFixed(2), d]);
  }
  return report;
}
window.__dpr = sizeTextures();

/**
 * Shutter per frame, from the camera's speed at t (deterministic): 72° and SUB sub-frames on settled
 * shots, so text stays crisp; up to 360° and 3 × SUB sub-frames on fast moves, so fine detail sliding
 * across the frame is smoothed instead of strobing.
 */
function shutterAt(t) {
  if (SUB <= 1) return [0, 1];
  const m = film.motion(loopT(t, DUR), FPS);
  const k = Math.min(1, Math.max(0, (m - 0.008) / (0.03 - 0.008)));
  const e = k * k * (3 - 2 * k);
  return [SHUTTER + (1 - SHUTTER) * e, Math.round(SUB * (1 + 2 * e))];
}

function frameAt(t, frame) {
  const [shutter, n] = shutterAt(t);
  for (let i = 0; i < n; i++) {
    const off = n > 1 ? ((i + 0.5) / n - 0.5) * (shutter / FPS) : 0;
    const ts = loopT(t + off, DUR);
    film.update(ts);
    world.update(ts);
    post.sub(i, n);
  }
  post.present(frame);
  const gl = world.renderer.getContext();
  gl.finish();
}

window.seekFrame = (f) => frameAt(f / FPS, f);
window.seek = (t) => frameAt(t, Math.round(t * FPS));

// Warm-up: paint a few frames so shaders compile and textures upload before the first capture.
for (const t of [0, 10, 20, 30, 40, 50]) frameAt(t, 0);
window.__world = world;
window.__motion = (t) => film.motion(t, FPS);
window.filmReady = true;

// Critique helper (not used by the render): a close-up of one screen, square on or at an angle on a corner.
window.closeup = (name, t, yaw, corner) => {
  film.update(t);
  world.update(t);
  const s = world.screens.find((x) => x.name === name);
  const u = s.uniforms.uRect.value;
  const rect = corner ? [u.x + u.z * 0.74, u.y - u.w * 0.05, u.z * 0.34, u.w * 0.32] : null;
  const pts = rectPoints(s, rect);
  const c = framePose(pts, turn(normalOf(s), yaw, corner ? 14 : 0), world.camera.fov, W / H, [0.8, 0.7]);
  const cam = world.camera;
  cam.position.set(c[0], c[1], c[2]);
  cam.lookAt(c[3], c[4], c[5]);
  cam.clearViewOffset();
  cam.updateProjectionMatrix();
  post.params.aperture = 0;
  post.sub(0, 1);
  post.present(0);
  world.renderer.getContext().finish();
  return canvas.toDataURL('image/png');
};
