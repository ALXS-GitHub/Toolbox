// Entry point. Exposes window.seekFrame(f): paints frame f as a pure function of time.
import { World } from './engine/world.js';
import { Post } from './engine/post.js';
import { loadFonts, loadImage } from './engine/canvas.js';
import { loopT } from './engine/motion.js';
import { COPY } from './copy.js';
import { DUR } from './timeline.js';
import { buildFilm } from './film.js';

const q = new URLSearchParams(location.search);
const lang = q.get('lang') || 'fr';
const aspect = q.get('aspect') || 'land';
const SUB = +(q.get('sub') || 4);
const FPS = +(q.get('fps') || 60);
const SHUTTER = 0.3; // 108° shutter: blur on fast moves only, text stays crisp
const [W, H] = aspect === 'land' ? [1920, 1080] : [1080, 1920];

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

const world = new World(canvas, W, H);
const post = new Post(world);
const film = buildFilm(world, post, { copy: COPY[lang], lang, aspect, portrait: aspect === 'port', imgs, W, H });

function frameAt(t, frame) {
  for (let i = 0; i < SUB; i++) {
    const off = SUB > 1 ? ((i + 0.5) / SUB - 0.5) * (SHUTTER / FPS) : 0;
    const ts = loopT(t + off, DUR);
    film.update(ts);
    world.update(ts);
    post.sub(i, SUB);
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
window.filmReady = true;

// Critique helper (not used by the render): a close-up of one screen, square on or at an angle on a corner.
import { rectPoints, normalOf, framePose, turn } from './camera.js';
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
