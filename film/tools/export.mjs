// Exports the timeline for the sound and the site: audio/cues-<lang>.json, audio/beats.json and the
// caption windows used by the home page (frontend/src/components/Landing/Film/captions.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BPM, BEAT, BAR, DUR, T, CAPTIONS, SCENES, cues } from '../src/timeline.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const audio = path.join(root, 'audio');
fs.mkdirSync(audio, { recursive: true });

for (const lang of ['en', 'fr']) {
  fs.writeFileSync(path.join(audio, `cues-${lang}.json`), JSON.stringify(cues(lang).map(([t, v, g]) => ({ t: +t.toFixed(4), voice: v, gain: g })), null, 1));
}

const beats = [];
for (let t = 0; t < DUR - 1e-6; t += BEAT) beats.push(+t.toFixed(3));
const downbeats = beats.filter((_, i) => i % 4 === 0);
const hits = cues('fr').filter(([, v]) => ['thump', 'impact', 'hit'].includes(v)).map(([t]) => t);
fs.writeFileSync(path.join(audio, 'beats.json'), JSON.stringify({ bpm: BPM, beat: BEAT, bar: BAR, duration: DUR, beats, downbeats, hits, scenes: SCENES }, null, 1));

const site = path.resolve(root, '..', 'frontend', 'src', 'components', 'Landing', 'Film');
if (fs.existsSync(site)) {
  fs.writeFileSync(path.join(site, 'captions.json'), JSON.stringify({ duration: DUR, captions: CAPTIONS }, null, 2) + '\n');
}
console.log('cues, beats', fs.existsSync(site) ? 'and captions' : '', 'written');
