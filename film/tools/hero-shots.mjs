// The hero title (under the film), light and dark, 1440 and 390 px: checks that nothing is clipped.
//   node tools/hero-shots.mjs <outdir> <url> [en]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const [out, url, lang = 'fr'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
for (const theme of ['light', 'dark']) {
  for (const [name, w, h, sc] of [['1440', 1440, 900, 1], ['390', 390, 844, 3]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: sc, colorScheme: theme, locale: lang === 'en' ? 'en-US' : 'fr-FR' });
    await ctx.addInitScript((th) => { try { localStorage.setItem('theme', th); } catch {} }, theme);
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    const hero = p.locator('header:has(h1)').first();
    await hero.scrollIntoViewIfNeeded();
    await p.waitForTimeout(1800);
    await p.locator('h1').first().screenshot({ path: path.join(out, `h1-${lang}-${theme}-${name}.png`) });
    await ctx.close();
  }
}
await b.close();
console.log('hero in', out);
