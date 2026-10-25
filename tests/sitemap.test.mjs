import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import { load, harness } from './cms-harness.mjs';

test('sitemap dates come from published content and stay stable as request time advances', async () => {
  const fixtures = JSON.parse(fs.readFileSync('sanity/fixtures.json', 'utf8'));
  fixtures.find(d => d._type === 'home')._updatedAt = '2026-06-01T12:00:00Z';
  fixtures.find(d => d._type === 'projects')._updatedAt = 'invalid';
  delete fixtures.find(d => d._type === 'learnings')._updatedAt;
  const listed = fixtures.find(d => d._id === 'post-hello-world');
  listed._updatedAt = '2026-07-01T12:00:00Z';
  const records = [...fixtures,
    { ...listed, _id: 'drafts.private', slug: { current: 'private-draft' } },
    { ...listed, _id: 'flagged-draft', draft: true, slug: { current: 'flagged-draft' } },
  ];
  const { cms, posts } = harness(records, { preview: true });
  let now = '2026-08-01T00:00:00Z';
  class Clock extends Date { constructor(value) { super(value === undefined ? now : value); } }
  const sitemap = load('app/sitemap.ts', { '@/lib/mdx': posts, '@/lib/cms': cms }, { Date: Clock });
  const first = await sitemap.default();
  now = '2026-09-01T00:00:00Z';
  assert.deepEqual(await sitemap.default(), first);
  const entry = path => first.find(d => d.url === `https://www.ibgoldbergs.com${path}`);
  assert.equal(entry('').lastModified.toISOString(), '2026-06-01T12:00:00.000Z');
  for (const path of ['/projects', '/learnings', '/writing']) assert.equal(entry(path).lastModified, undefined);
  assert.equal(entry('/writing/hello-world').lastModified.toISOString(), '2026-07-01T12:00:00.000Z');
  assert.ok(first.every(d => d.url.startsWith('https://www.ibgoldbergs.com')));
  for (const slug of ['small-industries-deserve-great-software', 'private-draft', 'flagged-draft']) {
    assert.ok(!first.some(d => d.url.endsWith(`/${slug}`)));
  }
  for (const update of [undefined, 'invalid']) {
    listed._updatedAt = update;
    const fallback = (await sitemap.default()).find(d => d.url.endsWith('/hello-world'));
    assert.equal(fallback.lastModified.toISOString(), new Date(listed.date).toISOString());
  }
  listed.unlisted = true;
  assert.ok(!(await sitemap.default()).some(d => d.url.endsWith('/hello-world')));
});
