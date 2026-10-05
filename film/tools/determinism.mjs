// Determinism check: the same frames, rendered in two fresh sessions and in different orders,
// must hash the same. A frame that depends on the previous one (state leak) shows up here.
//   node tools/determinism.mjs [lang] [aspect]
import { chromium } from 'playwright';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { serve } from './serve.mjs';

const lang = process.argv[2] || 'fr';
const aspect = process.argv[3] || 'land';
const [W, H] = aspect === 'land' ? [2560, 1440] : [1080, 1920];
const frames = [0, 437, 600, 1203, 1500, 2160, 2400, 2890, 3300];
const srv = await serve(0);

async function run(order) {
  const b = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--force-color-profile=srgb'] });
  const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.goto(`http://127.0.0.1:${srv.address().port}/index.html?lang=${lang}&aspect=${aspect}`);
  await p.waitForFunction(() => window.filmReady === true, null, { timeout: 300000 });
  const cdp = await p.context().newCDPSession(p);
  const out = {};
  for (const f of order) {
    await p.evaluate((f) => window.seekFrame(f), f);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    const buf = Buffer.from(data, 'base64');
    out[f] = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
    if (process.env.DUMP) { fs.mkdirSync('out/det', { recursive: true }); fs.writeFileSync(`out/det/${f}-${order[0] === frames[0] ? 'a' : 'b'}.png`, buf); }
  }
  await b.close();
  return out;
}

const a = await run(frames);
const b = await run(frames.slice().reverse());
let ok = true;
for (const f of frames) {
  const same = a[f] === b[f];
  ok &&= same;
  console.log(String(f).padStart(5), a[f], b[f], same ? 'same' : 'DIFFERENT');
}
console.log(ok ? 'deterministic' : 'NOT deterministic');
srv.close();
process.exit(ok ? 0 : 1);
