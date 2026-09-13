// Renders the OG image + PNG favicons, and optionally page screenshots.
// Usage (with a local server on :8765 serving the repo root):
//   NODE_PATH=<dir with playwright>/node_modules node tools/render.cjs [--shots <outdir>]
const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:8765';
const ROOT = path.resolve(__dirname, '..');

(async () => {
  const browser = await chromium.launch();

  const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og.goto(`${BASE}/tools/og-image.html`);
  await og.waitForSelector('body[data-ready="1"]');
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: path.join(ROOT, 'assets/og-image.png') });

  for (const [size, file] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png']]) {
    const p = await browser.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<style>html,body{margin:0;background:#f7f3ec}</style><img src="${BASE}/favicon.svg" width="${size}" height="${size}">`);
    await p.waitForLoadState('networkidle');
    await p.screenshot({ path: path.join(ROOT, file) });
  }

  const i = process.argv.indexOf('--shots');
  if (i > -1) {
    const out = process.argv[i + 1];
    for (const [name, width, height] of [['desktop', 1366, 900], ['mobile', 390, 844]]) {
      const p = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      await p.goto(`${BASE}/`);
      await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(out, `${name}-full.png`), fullPage: true });
      await p.screenshot({ path: path.join(out, `${name}-top.png`) });
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      console.log(`${name}: horizontal overflow = ${overflow}px`);
    }
  }
  await browser.close();
})();
