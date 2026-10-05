// Tiles stills into one sheet: node tools/sheet.mjs <dir> <out.png> [cols] [width]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [dir, out, cols = 3, w = 640] = process.argv.slice(2);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png')).sort();
const list = path.join(dir, '_list.txt');
const fwd = (p) => p.split(path.sep).join('/');
fs.writeFileSync(list, files.map((f) => `file '${fwd(path.resolve(dir, f))}'\nduration 1`).join('\n'));
const rows = Math.ceil(files.length / cols);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-vf', `scale=${w}:-1,tile=${cols}x${rows}:padding=4:color=white`, '-frames:v', '1', out]);
fs.unlinkSync(list);
console.log(out, files.length);
