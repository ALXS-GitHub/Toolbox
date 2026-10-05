// Extracts a few lucide icons (ISC licence) from a local lucide-react install into src/engine/icons.js.
// Usage: node tools/extract-icons.mjs <path to lucide-react/dist/esm/icons>
import fs from 'node:fs';
import path from 'node:path';
const dir = process.argv[2];
const names = ['layout-grid','file-text','bell','calendar-days','folder-cog','settings','search','funnel','filter','list','table-2','flag','plus','message-square','paperclip','align-left','sparkles','square-terminal','terminal','circle-check','chevron-down','chevron-right','x','mic','arrow-up','menu','square-pen','audio-lines','check','key-round','fingerprint','history','rocket','monitor','globe','bot','panel-left-close','loader-circle','git-commit-horizontal','shield-check','file-code','lock','git-branch','layers','inbox','moon','log-out','calendar-clock','copy','wrench','plug','sliders-horizontal','ellipsis','pin','folder','notebook-text','workflow','book-open','scan-line','minus','square','columns-2','gauge','circle-dot','send','plug-zap','zap','user','server','hammer','shield','file-check','flame','archive','circle-check-big','star','asterisk','arrow-right','corner-down-right','key','badge-check','scan','square-dashed','braces','git-merge','list-checks'];
const out = {};
for (const n of names) {
  const f = path.join(dir, n + '.js');
  if (!fs.existsSync(f)) { console.error('missing', n); continue; }
  const src = fs.readFileSync(f, 'utf8');
  const m = src.match(/createLucideIcon\("[^"]+",\s*(\[[\s\S]*\])\);/);
  const arr = Function('return ' + m[1])();
  out[n] = arr.map(([tag, a]) => { const o = { ...a }; delete o.key; return [tag, o]; });
}
const header = '// Lucide icons (ISC licence, https://lucide.dev), extracted by tools/extract-icons.mjs.\n';
fs.writeFileSync('src/engine/icons.js', header + 'export const ICONS = ' + JSON.stringify(out) + ';\n');
console.log(Object.keys(out).length, 'icons');
