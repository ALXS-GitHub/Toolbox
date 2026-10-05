// Web encodes of a master: AV1 + Opus in WebM, H.264 + AAC in MP4, and a WebP poster.
//   node tools/encode.mjs fr-land [--poster 53.4]
// Output: frontend/static/video/film-<lang>-<framing>.{webm,mp4,webp}
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [variant = 'fr-land', ...rest] = process.argv.slice(2);
const opt = (k, d) => (rest.includes('--' + k) ? rest[rest.indexOf('--' + k) + 1] : d);
const lang = variant.split('-')[0];
const master = path.join('out', `master-${variant}.mp4`);
const mix = path.join('audio', 'out', `mix-${lang}.wav`);
const dest = path.resolve('..', 'frontend', 'static', 'video');
fs.mkdirSync(dest, { recursive: true });
const base = path.join(dest, `film-${variant}`);
const ff = (args) => execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });

const av1Crf = opt('av1crf', '33');
const avcCrf = opt('avccrf', '23');

// AV1: SVT-AV1, capped so a 56 s loop stays near 15 MB
ff(['-i', master, '-i', mix, '-map', '0:v', '-map', '1:a', '-c:v', 'libsvtav1', '-preset', '5', '-crf', av1Crf, '-g', '240',
  '-svtav1-params', 'tune=0:enable-overlays=1:scd=1:mbr=3800', '-pix_fmt', 'yuv420p10le',
  '-c:a', 'libopus', '-b:a', '112k', '-shortest', base + '.webm']);
// H.264 fallback
ff(['-i', master, '-i', mix, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', avcCrf, '-maxrate', '3800k', '-bufsize', '7600k',
  '-profile:v', 'high', '-level', '4.2', '-pix_fmt', 'yuv420p', '-g', '120', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-shortest', base + '.mp4']);
// poster
ff(['-ss', opt('poster', '53.4'), '-i', master, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', base + '.webp']);

for (const ext of ['webm', 'mp4', 'webp']) {
  const st = fs.statSync(`${base}.${ext}`);
  console.log(`film-${variant}.${ext}`, (st.size / 1e6).toFixed(2), 'MB');
}
