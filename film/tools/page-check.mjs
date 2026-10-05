// Looks at the home page as a visitor would: screenshots and the state of the film's video.
//   node tools/page-check.mjs [http://localhost:3211/fr/] [--reduced]
import { chromium } from 'playwright';
import fs from 'node:fs';

const url = process.argv[2] || 'http://localhost:3211/Toolbox/fr/';
const reduced = process.argv.includes('--reduced');
const locale = process.argv.includes('--en') ? 'en-US' : 'fr-FR';
fs.mkdirSync('out/page', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--autoplay-policy=no-user-gesture-required', '--use-angle=d3d11'] });
for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }]]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.deviceScaleFactor || 1, isMobile: !!vp.isMobile, locale, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(3500);
  const st = await page.evaluate(() => {
    const v = document.querySelector('video');
    const cap = document.querySelector('[class*="caption"]');
    return v ? { url: location.pathname, paused: v.paused, t: +v.currentTime.toFixed(2), src: v.currentSrc.split('/').pop(), ready: v.readyState, caption: cap ? cap.textContent.slice(0, 80) : null } : null;
  });
  console.log(name, JSON.stringify(st));
  await page.screenshot({ path: `out/page/${name}${reduced ? '-reduced' : ''}.png` });
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `out/page/${name}${reduced ? '-reduced' : ''}-below.png` });
  await ctx.close();
}
await browser.close();
