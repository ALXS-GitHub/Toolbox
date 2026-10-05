// Screenshots of the home page sections (Cast, Gallery, ToolBelt), light and dark, desktop and mobile.
//   node tools/section-shots.mjs <outdir> [url]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2] || 'out/sections';
const url = process.argv[3] || 'http://localhost:3211/Toolbox/fr/';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const theme of ['dark', 'light']) {
  for (const [name, vp] of [['desktop', { width: 1440, height: 900, scale: 1 }], ['mobile', { width: 390, height: 844, scale: 2 }]]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.scale, locale: 'fr-FR', colorScheme: theme, reducedMotion: 'no-preference' });
    await ctx.addInitScript((th) => { try { localStorage.setItem('theme', th); } catch {} }, theme);
    const page = await ctx.newPage();
    page.on('pageerror', (e) => console.log('[pageerror]', e.message));
    await page.goto(url + (url.includes('?') ? '&' : '?') + 'reveal=all', { waitUntil: 'load' });
    // scroll down slowly so every reveal fires
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 400) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1200);
    for (const id of (process.env.SECTIONS || 'pieces,projects,toolkit').split(',')) {
      const sec = page.locator(`section:has(h2#${id})`);
      if ((await sec.count()) === 0) continue;
      await sec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await sec.screenshot({ path: path.join(out, `${id}-${theme}-${name}.png`) });
    }
    await ctx.close();
  }
}
await browser.close();
console.log('sections in', out);
