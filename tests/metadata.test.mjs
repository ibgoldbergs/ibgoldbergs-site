import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync('lib/metadata.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const context = { exports: {}, URL };
vm.runInNewContext(source, context);
const { socialMetadata } = context.exports;
const site = { url: 'https://ibgoldbergs.com', name: 'Ian Goldberg', locale: 'en_US' };

test('every social preview includes the page copy, absolute URL and shared image', () => {
  for (const path of ['/', '/projects', '/learnings', '/writing', '/writing/hello-world']) {
    const result = socialMetadata({ title: `Title for ${path}`, description: `Description for ${path}`, path, site,
      ...(path === '/writing/hello-world' ? { publishedTime: '2026-03-09' } : {}) });
    for (const metadata of [result.openGraph, result.twitter]) {
      assert.equal(metadata.title, `Title for ${path}`);
      assert.equal(metadata.description, `Description for ${path}`);
      assert.equal(metadata.images[0].url, 'https://ibgoldbergs.com/og-image.png');
      assert.equal(metadata.images[0].alt, 'Ian Goldberg, ibgoldbergs.com');
    }
    assert.equal(result.openGraph.url, new URL(path, site.url).href);
    assert.equal(result.openGraph.type, path === '/writing/hello-world' ? 'article' : 'website');
    assert.equal(result.twitter.card, 'summary_large_image');
  }
});

test('the committed social image is a 1200 by 630 PNG matching its metadata', () => {
  const png = fs.readFileSync('public/og-image.png');
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  const image = socialMetadata({ title: site.name, description: '', path: '/', site }).openGraph.images[0];
  assert.equal(png.readUInt32BE(16), image.width);
  assert.equal(png.readUInt32BE(20), image.height);
});
