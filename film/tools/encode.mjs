// Web encodes of a master: AV1 + Opus in WebM, H.264 + AAC in MP4, and a WebP poster.
//   node tools/encode.mjs fr-land [--poster 53.4]
// 16:9 masters are 2560 × 1440: they give a 1440p pair (film-<lang>-land-1440.*) for large screens and a
// 1080p pair (film-<lang>-land.*, reduced with Lanczos) for the others. 9:16 masters are 1080 × 1920.
// Output: frontend/static/video/
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [variant = 'fr-land', ...rest] = process.argv.slice(2);
const opt = (k, d) => (rest.includes('--' + k) ? rest[rest.indexOf('--' + k) + 1] : d);
const lang = variant.split('-')[0];
const land = variant.endsWith('land');
const master = path.join('out', `master-${variant}.mp4`);
const mix = path.join('audio', 'out', `mix-${lang}.wav`);
const dest = path.resolve('..', 'frontend', 'static', 'video');
fs.mkdirSync(dest, { recursive: true });
const ff = (args) => execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });

// AV1 (SVT) and H.264, capped so fine interface text survives without blowing the size
function encode(base, scale, av1, avc) {
  const vf = scale ? ['-vf', `scale=${scale}:flags=lanczos`] : [];
  ff(['-i', master, '-i', mix, '-map', '0:v', '-map', '1:a', ...vf, '-c:v', 'libsvtav1', '-preset', '5', '-crf', av1.crf, '-g', '240',
    '-svtav1-params', `tune=0:enable-overlays=1:scd=1:mbr=${av1.mbr}`, '-pix_fmt', 'yuv420p10le',
    '-c:a', 'libopus', '-b:a', '112k', '-shortest', base + '.webm']);
  ff(['-i', master, '-i', mix, '-map', '0:v', '-map', '1:a', ...vf, '-c:v', 'libx264', '-preset', 'slow', '-crf', avc.crf,
    '-maxrate', avc.max, '-bufsize', avc.buf, '-profile:v', 'high', '-level', '5.1', '-pix_fmt', 'yuv420p', '-g', '120',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-shortest', base + '.mp4']);
}

const outs = [];
if (land) {
  const hd = path.join(dest, `film-${variant}-1440`);
  encode(hd, null, { crf: opt('av1crf', '30'), mbr: '7000' }, { crf: opt('avccrf', '22'), max: '6000k', buf: '12000k' });
  const sd = path.join(dest, `film-${variant}`);
  encode(sd, '1920:1080', { crf: '31', mbr: '4500' }, { crf: '22', max: '4500k', buf: '9000k' });
  outs.push(hd, sd);
  ff(['-ss', opt('poster', '53.4'), '-i', master, '-frames:v', '1', '-vf', 'scale=1920:1080:flags=lanczos', '-c:v', 'libwebp', '-quality', '82', sd + '.webp']);
} else {
  const sd = path.join(dest, `film-${variant}`);
  encode(sd, null, { crf: '30', mbr: '5000' }, { crf: '21', max: '5000k', buf: '10000k' });
  outs.push(sd);
  ff(['-ss', opt('poster', '53.4'), '-i', master, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', sd + '.webp']);
}
for (const base of outs) {
  for (const ext of ['webm', 'mp4', 'webp']) {
    if (!fs.existsSync(`${base}.${ext}`)) continue;
    console.log(path.basename(base) + '.' + ext, (fs.statSync(`${base}.${ext}`).size / 1e6).toFixed(2), 'MB');
  }
}
