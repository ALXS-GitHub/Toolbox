// Renders the film frame by frame: Playwright calls window.seek(t) for every frame, ffmpeg encodes.
//
//   node render.mjs --lang fr --aspect land                 full master (segments + concat)
//   node render.mjs --lang fr --aspect land --only 12,13    re-render only the segments holding these seconds
//   node render.mjs --lang fr --aspect port --stills 0,2.5  still PNGs into out/stills
//
// Sub-frames (motion blur) are accumulated inside the page, so each captured frame is final.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { serve } from './tools/serve.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
    return acc;
  }, []),
);
const lang = args.lang || 'fr';
const aspect = args.aspect || 'land';
const fps = +(args.fps || 60);
const sub = +(args.sub || 4);
const DUR = 56;
const SEG = 4; // seconds per segment
const res = args.res || '';
const [W, H] = aspect === 'land' ? (res === '1080' ? [1920, 1080] : [2560, 1440]) : [1080, 1920];
const ssArg = args.ss ? `&ss=${args.ss}` : '';
const resArg = res ? `&res=${res}` : '';
const workers = +(args.workers || 4);
const variant = `${lang}-${aspect}`;
const segDir = path.join('out', 'seg', variant);
fs.mkdirSync(segDir, { recursive: true });

const LAUNCH = { headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--disable-gpu-vsync', '--force-color-profile=srgb'] };

async function openPage(browser, port) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('[page]', m.text()); });
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));
  await page.goto(`http://127.0.0.1:${port}/index.html?lang=${lang}&aspect=${aspect}&sub=${sub}&fps=${fps}${ssArg}${resArg}`);
  await page.waitForFunction(() => window.filmReady === true, null, { timeout: 300000 });
  const cdp = await page.context().newCDPSession(page);
  return { page, cdp };
}

async function grab(cdp) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true, fromSurface: true });
  return Buffer.from(data, 'base64');
}

async function renderSegment({ page, cdp }, from, to, out) {
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-g', String(fps), '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const f0 = Math.round(from * fps), f1 = Math.round(to * fps);
  for (let f = f0; f < f1; f++) {
    await page.evaluate((f) => window.seekFrame(f), f);
    const png = await grab(cdp);
    if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((r, j) => ff.on('close', (c) => (c === 0 ? r() : j(new Error('ffmpeg ' + c)))));
}

const srv = await serve(0);
const port = srv.address().port;

if (args.stills) {
  const browser = await chromium.launch(LAUNCH);
  const p = await openPage(browser, port);
  const dir = args.outdir || path.join('out', 'stills', variant);
  fs.mkdirSync(dir, { recursive: true });
  for (const s of String(args.stills).split(',')) {
    const t = +s;
    await p.page.evaluate((f) => window.seekFrame(f), Math.round(t * fps));
    const png = await grab(p.cdp);
    const name = path.join(dir, `${args.prefix || ''}t${t.toFixed(3).padStart(6, '0')}.png`);
    fs.writeFileSync(name, png);
    console.log(name);
  }
  await browser.close();
  srv.close();
  process.exit(0);
}

// Segment list
let segs = [];
for (let s = 0; s < DUR; s += SEG) segs.push([s, Math.min(DUR, s + SEG)]);
if (args.only) {
  const secs = String(args.only).split(',').map(Number);
  segs = segs.filter(([a, b]) => secs.some((x) => x >= a && x < b));
}
if (args.from !== undefined) segs = segs.filter(([a]) => a >= +args.from && a < +(args.to ?? DUR));

const t0 = Date.now();
const queue = segs.slice();
const browsers = [];
await Promise.all(
  Array.from({ length: Math.min(workers, queue.length) }, async (_, wi) => {
    const browser = await chromium.launch(LAUNCH);
    browsers.push(browser);
    const p = await openPage(browser, port);
    while (queue.length) {
      const [a, b] = queue.shift();
      const out = path.join(segDir, `${String(a).padStart(2, '0')}.mp4`);
      const ts = Date.now();
      await renderSegment(p, a, b, out);
      console.log(`[w${wi}] ${variant} ${a}-${b}s in ${((Date.now() - ts) / 1000).toFixed(1)}s`);
    }
  }),
);
for (const b of browsers) await b.close();

// Concat every segment into the master
const list = [];
for (let s = 0; s < DUR; s += SEG) {
  const f = path.join(segDir, `${String(s).padStart(2, '0')}.mp4`);
  if (fs.existsSync(f)) list.push(`file '${path.resolve(f).replace(/\\/g, '/')}'`);
}
fs.writeFileSync(path.join(segDir, 'list.txt'), list.join('\n'));
if (list.length === Math.ceil(DUR / SEG)) {
  const master = path.join('out', `master-${variant}.mp4`);
  await new Promise((r, j) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(segDir, 'list.txt'), '-c', 'copy', master], { stdio: 'inherit' }).on('close', (c) => (c ? j(new Error('concat')) : r())));
  console.log('master', master);
}
console.log(`done in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
srv.close();
