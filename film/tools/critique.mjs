// Critique material for a rendered master:
//   node tools/critique.mjs fr-land
// writes out/critique/<variant>/: contact.png (2 fps, 6 per row), phone.png (360 px wide, 1 fps),
// loop.png (the 8 frames on each side of the loop seam, played twice), preview.mp4 (with sound),
// and strip-<t>.png for any extra times passed (12 consecutive frames).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [variant = 'fr-land', ...strips] = process.argv.slice(2);
const lang = variant.split('-')[0];
const master = path.join('out', `master-${variant}.mp4`);
const dir = path.join('out', 'critique', variant);
fs.mkdirSync(dir, { recursive: true });
const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]);
const port = variant.endsWith('port');

ff(['-i', master, '-vf', `fps=2,scale=${port ? 180 : 320}:-1,tile=6x${Math.ceil(112 / 6)}:padding=2:color=white`, '-frames:v', '1', path.join(dir, 'contact.png')]);
ff(['-i', master, '-vf', `fps=1,scale=360:-1,tile=${port ? 8 : 4}x${port ? 7 : 14}:padding=2:color=white`, '-frames:v', '1', path.join(dir, 'phone.png')]);

// loop seam: the video twice in a row, frames 55.866 .. 56.133
const twice = path.join(dir, 'twice.mp4');
fs.writeFileSync(path.join(dir, 'twice.txt'), `file '${path.resolve(master).split(path.sep).join('/')}'\nfile '${path.resolve(master).split(path.sep).join('/')}'\n`);
ff(['-f', 'concat', '-safe', '0', '-i', path.join(dir, 'twice.txt'), '-c', 'copy', twice]);
ff(['-ss', '55.866', '-i', twice, '-vf', `scale=${port ? 240 : 480}:-1,tile=8x2:padding=2:color=white`, '-frames:v', '1', path.join(dir, 'loop.png')]);

for (const s of strips) {
  ff(['-ss', String(s), '-i', master, '-vf', `scale=${port ? 200 : 400}:-1,tile=6x2:padding=2:color=white`, '-frames:v', '1', path.join(dir, `strip-${s}.png`)]);
}

const mix = path.join('audio', 'out', `mix-${lang}.wav`);
if (fs.existsSync(mix)) ff(['-i', master, '-i', mix, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', path.join(dir, 'preview.mp4')]);
console.log('critique in', dir);
