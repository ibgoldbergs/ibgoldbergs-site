import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { fixtures, harness, request, load } from './cms-harness.mjs';
const slugs = posts => Array.from(posts, p => p.slug).sort();

test('listing, feed and sitemap project only required fields and exclude private/unlisted posts', async () => {
  const records = fixtures();
  const listed = records.find(d => d._id === 'post-hello-world');
  records.push({ ...listed, _id: 'drafts.private', slug: { current: 'private' } },
    { ...listed, _id: 'legacy', draft: true, slug: { current: 'legacy' } });
  const { posts, calls } = harness(records, { preview: true });
  const listing = await posts.getAllPosts();
  assert.deepEqual(slugs(listing), ['hello-world']);
  assert.deepEqual(Object.keys(listing[0]).sort(), ['date', 'description', 'slug', 'title']);
  assert.deepEqual(slugs((await posts.getPostsByYear())['2026']), ['hello-world']);
  const feed = await posts.getFeedPosts();
  assert.deepEqual(Object.keys(feed[0]).sort(), ['date', 'description', 'slug', 'text', 'title']);
  assert.equal(feed[0].text, posts.plainText(listed.body));
  assert.deepEqual(Object.keys((await posts.getSitemapPosts())[0]).sort(), ['_updatedAt', 'date', 'slug']);
  for (const call of calls) {
    assert.equal(call.options.perspective, 'published');
    assert.equal(call.options.token, undefined);
    assert.equal(call.options.useCdn, false);
    assert.equal(call.fetchOptions.cache, 'no-store');
  }
});

test('direct slug reads allow unlisted, resolve new slugs and reflect withdrawals on the next request', async () => {
  const records = fixtures();
  const { posts } = harness(records);
  assert.equal((await posts.getPostBySlug('small-industries-deserve-great-software')).unlisted, true);
  assert.equal(await posts.getPostBySlug('new-slug'), null);
  const added = { ...records.find(d => d._id === 'post-hello-world'), _id: 'new', slug: { current: 'new-slug' } };
  records.push(added);
  await request(async () => assert.equal((await posts.getPostBySlug('new-slug')).slug, 'new-slug'));
  added.unlisted = true;
  await request(async () => assert.ok(!slugs(await posts.getAllPosts()).includes('new-slug')));
  records.splice(records.indexOf(added), 1);
  await request(async () => assert.equal(await posts.getPostBySlug('new-slug'), null));
});

test('draft preview requires enabled Draft Mode and a server token and cannot contaminate public reads', async () => {
  const records = fixtures();
  records.push({ ...records.find(d => d._id === 'post-hello-world'), _id: 'drafts.private', slug: { current: 'private' } });
  const anonymous = harness(records);
  assert.equal(await anonymous.posts.getPostBySlug('private'), null);
  const authenticated = harness(records, { preview: true });
  await request(async () => {
    assert.equal((await authenticated.posts.getPostBySlug('private')).slug, 'private');
    assert.equal(await authenticated.posts.getPostBySlug('private', false), null);
    assert.ok(!slugs(await authenticated.posts.getAllPosts()).includes('private'));
  });
  assert.equal(authenticated.calls[0].options.perspective, 'drafts');
  assert.equal(authenticated.calls[0].options.token, 'test-only-token');
  assert.equal(authenticated.calls[0].fetchOptions.cache, 'no-store');
  const missingToken = harness(records, { preview: true, token: '' });
  await assert.rejects(missingToken.posts.getPostBySlug('private'), /token is not configured/);
  assert.equal(missingToken.calls.length, 0);
  assert.match(fs.readFileSync('lib/cms.ts', 'utf8'), /import 'server-only'/);
});

test('actual metadata and page calls share one slug/settings read per React request, never across requests', async () => {
  const { cms, posts, calls } = harness(fixtures());
  const page = load('app/writing/[slug]/page.tsx', {
    'react/jsx-runtime': { jsx: () => null, jsxs: () => null },
    '@/lib/metadata': { socialMetadata: () => ({}) }, '@/components/rich-text': {},
    'next/headers': { draftMode: async () => ({ isEnabled: false }) },
    'next/navigation': { notFound: () => { throw Error('404'); } }, 'next/link': {},
    '@/components/animate-in': {}, '@/lib/mdx': posts, '@/lib/cms': cms,
  });
  const render = () => Promise.all([
    page.generateMetadata({ params: Promise.resolve({ slug: 'hello-world' }) }),
    page.default({ params: Promise.resolve({ slug: 'hello-world' }) }),
    cms.settings(), cms.documents('settings', true),
  ]);
  await request(render);
  assert.equal(calls.length, 2);
  assert.equal(calls.filter(c => c.params.slug === 'hello-world').length, 1);
  await request(render);
  assert.equal(calls.length, 4);
});
