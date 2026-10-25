// QA_BASE, QA_OUTPUT and PLAYWRIGHT_MODULE allow local or live production checks.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.QA_BASE || 'http://127.0.0.1:3108';
const baseline = process.env.QA_BASELINE === '1';
const output = process.env.QA_OUTPUT || '/tmp/task8-after';
await fs.mkdir(output, {recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const report = [];
try {
  for (const javaScriptEnabled of [true,false]) {
    for (const reducedMotion of ['no-preference','reduce']) {
      for (const width of [1280,375]) {
        const context = await browser.newContext({javaScriptEnabled,reducedMotion,viewport:{width,height:900}});
        const page = await context.newPage();
        for (const path of ['/','/projects','/learnings','/writing','/writing/hello-world']) {
          await page.goto(base+path,{waitUntil:'networkidle'});
          await page.evaluate(()=>document.fonts.ready);
          const result = await page.evaluate(() => {
            const wrappers = [...document.querySelectorAll('main > div')];
            return {
              visible: wrappers.every(n=>getComputedStyle(n).opacity==='1' && getComputedStyle(n).visibility==='visible'),
              animations: document.getAnimations().length,
              overflow:document.documentElement.scrollWidth > innerWidth,
              fontPreloads:document.querySelectorAll('link[rel="preload"][as="font"]').length,
              resources:performance.getEntriesByType('resource').filter(r=> /\.(woff2|js)(\?|$)/.test(r.name)).map(r=>({url:r.name,encoded:r.encodedBodySize,decoded:r.decodedBodySize,transfer:r.transferSize})),
            };
          });
          if (!baseline) {
            assert.ok(result.visible,`${path}: content visible without hydration`);
            assert.ok(!result.overflow,`${path}: no horizontal overflow`);
            assert.equal(result.fontPreloads,0,'Only rendered faces should be fetched');
            const fonts = result.resources.filter(r=>r.url.includes('.woff2'));
            assert.equal(fonts.length,path.startsWith('/writing')?1:0,'Load only the regular face where dates use Maple Mono');
            const entrance = await page.evaluate(() => {
              const node = document.querySelector('.animate-in');
              if (!node) return null;
              node.style.animationDelay = '60s';
              // A delayed animation must never hide content while waiting to start.
              const style = getComputedStyle(node);
              return {opacity:style.opacity,animation:style.animationName};
            });
            if (entrance) {
              assert.equal(entrance.opacity,'1');
              assert.equal(entrance.animation,reducedMotion==='reduce'?'none':'content-enter');
              await page.evaluate(()=>document.querySelector('.animate-in').style.removeProperty('animation-delay'));
            }
            if (reducedMotion==='reduce') assert.equal(result.animations,0);
          }
          report.push({javaScriptEnabled,reducedMotion,width,path,...result});
          if (javaScriptEnabled && reducedMotion==='reduce') await page.screenshot({path:`${output}/${width}-${path.replaceAll('/','_')}.png`,fullPage:true});
        }
        await context.close();
      }
    }
  }
  await fs.writeFile(`${output}/report.json`,JSON.stringify(report,null,2));
  console.log(`${baseline?'Baseline captured':'Delivery assertions passed'}: ${report.length} page configurations`);
} finally { await browser.close(); }
