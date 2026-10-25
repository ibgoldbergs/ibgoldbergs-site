// Run with QA_BASE and PLAYWRIGHT_MODULE pointing to an installed Playwright module.
// Browser tooling is deliberately kept outside the site's runtime dependencies.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.QA_BASE || 'http://127.0.0.1:3107';
const baseline = process.env.QA_BASELINE === '1';
const output = process.env.QA_OUTPUT || '/tmp/task7-accessibility';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const report = [];
const focus = () => page.evaluate(() => ({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim(), label: document.activeElement?.getAttribute('aria-label'), id: document.activeElement?.id }));
const luminance = rgb => rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126,.7152,.0722][i], 0);
const contrast = (a,b) => (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
try {
  for (const width of [1280, 375]) {
    await page.setViewportSize({width, height: 900});
    for (const path of ['/', '/projects', '/learnings', '/writing', '/writing/hello-world']) {
      await page.goto(base + path);
      await page.locator('main').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => [...document.querySelectorAll('main [style]')].every(n => getComputedStyle(n).opacity === '1'));
      const headings = await page.locator('main :is(h1,h2,h3)').evaluateAll(nodes => nodes.map(n => ({level: +n.tagName[1], text: n.textContent})));
      if (!baseline) {
        assert.equal(headings.filter(h => h.level === 1).length, 1, path);
        assert.equal(headings[0].level, 1, path);
        for (let i=1;i<headings.length;i++) assert.ok(headings[i].level <= headings[i-1].level + 1, path);
      }
      const colors = await page.locator('.text-dim').evaluateAll(nodes => nodes.filter(n => !n.closest('dialog') && n.getAttribute('aria-hidden') !== 'true').map(n => {
        let parent = n, bg;
        while (parent) { bg = getComputedStyle(parent).backgroundColor; if (bg !== 'rgba(0, 0, 0, 0)') break; parent = parent.parentElement; }
        return {text:n.textContent?.trim(), color:getComputedStyle(n).color, background:bg};
      }));
      for (const entry of colors) {
        entry.ratio = contrast(entry.color.match(/[\d.]+/g).slice(0,3).map(Number),entry.background.match(/[\d.]+/g).slice(0,3).map(Number));
        if (!baseline) assert.ok(entry.ratio >= 4.5, JSON.stringify(entry));
      }
      report.push({width,path,headings,colors});
      await page.screenshot({path:`${output}/${width}-${path.replaceAll('/','_') || 'home'}.png`,fullPage:true});
    }
  }
  await page.goto(base);
  const opener = page.getByRole('button', {name:'Open menu', exact:true});
  await opener.click();
  await page.screenshot({path:`${output}/mobile-menu.png`});
  if (baseline) { console.log('Baseline screenshots and contrast captured'); }
  else {
    const dialog = page.getByRole('dialog', {name:'Main navigation'});
    await dialog.waitFor();
    assert.equal((await focus()).label, 'Close menu');
    assert.equal(await page.locator('button[aria-controls="mobile-navigation"]').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Shift+Tab');
    assert.equal((await focus()).text,'writing');
    await page.keyboard.press('Tab');
    assert.equal((await focus()).label,'Close menu');
    for (let i=0;i<15;i++) { await page.keyboard.press('Tab'); assert.ok(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement))); }
    for (let i=0;i<15;i++) { await page.keyboard.press('Shift+Tab'); assert.ok(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement))); }
    await page.locator('main a').first().evaluate(n=>n.focus());
    assert.ok(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), 'Background must be inert');
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).overflow),'hidden');
    const coveredLink = await page.locator('main a').first().boundingBox();
    await page.mouse.click(coveredLink.x + 2, coveredLink.y + 2);
    assert.equal(page.url(), base + '/');
    assert.equal(await dialog.isVisible(),true);
    await page.keyboard.press('Escape');
    await dialog.waitFor({state:'hidden'});
    await page.waitForFunction(() => document.querySelector('button[aria-controls]').getAttribute('aria-expanded') === 'false');
    assert.equal((await focus()).label,'Open menu');
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow),'hidden');
    for (let i=0;i<3;i++) {
      await page.keyboard.press('Enter'); await dialog.waitFor();
      await dialog.getByRole('button',{name:'Close menu'}).click();
      await dialog.waitFor({state:'hidden'});
    await page.waitForFunction(() => document.querySelector('button[aria-controls]').getAttribute('aria-expanded') === 'false');
      assert.equal((await focus()).label,'Open menu');
    }
    for (const path of ['/projects','/learnings','/writing','/']) {
      await opener.click();
      await dialog.locator(`a[href="${path}"]`).click();
      await page.waitForURL(base + path);
      await page.waitForFunction(() => document.activeElement?.id === 'main');
      assert.equal(await dialog.isVisible(),false);
    }
    // Selecting the current page also closes the menu and returns to its opener.
    await opener.click(); await dialog.locator('a[href="/"]').click();
    await dialog.waitFor({state:'hidden'});
    await page.waitForFunction(() => document.querySelector('button[aria-controls]').getAttribute('aria-expanded') === 'false');
    assert.equal((await focus()).label,'Open menu');
    await opener.click(); await page.goBack();
    await page.waitForURL(base + '/writing'); await dialog.waitFor({state:'hidden'});
    await page.waitForFunction(() => document.querySelector('button[aria-controls]').getAttribute('aria-expanded') === 'false');
    await opener.click(); await page.goForward();
    await page.waitForURL(base + '/'); await dialog.waitFor({state:'hidden'});
    await page.waitForFunction(() => document.querySelector('button[aria-controls]').getAttribute('aria-expanded') === 'false');
    await opener.click(); await page.setViewportSize({width:1280,height:900});
    await dialog.waitFor({state:'hidden'});
    await page.waitForFunction(() => document.querySelector('button[aria-controls]').getAttribute('aria-expanded') === 'false');
    assert.equal((await focus()).text,'Ian Goldberg');
    await page.keyboard.press('Tab'); assert.equal((await focus()).text,'projects');
    const outline = await page.evaluate(() => { const s=getComputedStyle(document.activeElement);return {style:s.outlineStyle,width:s.outlineWidth,color:s.outlineColor}; });
    assert.equal(outline.style,'solid'); assert.equal(outline.width,'2px');
    await page.waitForFunction(() => [...document.querySelectorAll('main [style]')].every(n => getComputedStyle(n).opacity === '1'));
    await page.screenshot({path:`${output}/desktop-keyboard-focus.png`});
    await page.keyboard.press('Enter'); await page.waitForURL(base + '/projects');
    await page.setViewportSize({width:320,height:568});
    await opener.click(); await dialog.waitFor(); await page.keyboard.press('Escape');
    await opener.waitFor();
    assert.equal((await focus()).label,'Open menu');
    await opener.click(); await dialog.waitFor();
    await page.screenshot({path:`${output}/320-mobile-menu.png`});
    await page.keyboard.press('Escape');
    report.push({flows:'Tab/Shift+Tab wrap, inert background, scroll lock, Escape and focus return, three repeated close/open cycles, all menu routes, same-page close, back/forward while open, desktop breakpoint close and focus, desktop keyboard navigation, 320px menu',outline});
    console.log('All browser accessibility assertions passed');
  }
  await fs.writeFile(`${output}/report.json`,JSON.stringify(report,null,2));
} finally { await browser.close(); }
