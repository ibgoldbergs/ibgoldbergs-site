// Offline, reproducible result sizes. No network, credentials or CMS writes.
import { execFileSync } from 'node:child_process';
import { fixtures, harness, request, load } from '../tests/cms-harness.mjs';
const records = fixtures();
const { cms, posts, calls } = harness(records);
const bytes = value => Buffer.byteLength(JSON.stringify(value));
const oldPosts = records.filter(d => d._type === 'post');
const rows = [];
for (const [name, read] of [['listing', posts.getAllPosts], ['RSS', posts.getFeedPosts], ['sitemap posts', posts.getSitemapPosts], ['hello-world detail', () => posts.getPostBySlug('hello-world')]]) {
  const result = await read();
  // Detail reader adds readingTime after transport; measure the GROQ result instead.
  const { parse, evaluate } = await import('groq-js');
  const call = calls.at(-1);
  const projected = await (await evaluate(parse(call.query), { dataset: records, params: call.params })).get();
  rows.push({ route: name, beforeBytes: bytes(oldPosts), afterBytes: bytes(projected) });
  if (!result) throw Error('Missing fixture result');
}
let baselineCalls = 0;
const oldCms = load('lib/cms.ts', {
  'server-only': {}, './constants': load('lib/constants.ts', {}), '@/sanity/fixtures.json': records,
  'next/headers': { draftMode: async () => ({ isEnabled: false }) },
  '@sanity/client': { createClient: () => ({ fetch: async (query, { type }) => {
    baselineCalls++;
    return records.filter(d => d._type === type);
  } }) },
}, { process: { env: { NEXT_PUBLIC_SANITY_PROJECT_ID: 'fixture-project' } } },
execFileSync('git', ['show', 'ce5515b951656266ccfeedd95401481b5498c1b6:lib/cms.ts'], { encoding: 'utf8' }));
await Promise.all([oldCms.settings(), oldCms.settings(), oldCms.documents('post', true), oldCms.documents('post', true)]);
const before = calls.length;
await request(() => Promise.all([cms.settings(), cms.settings(), posts.getPostBySlug('hello-world'), posts.getPostBySlug('hello-world')]));
console.log(JSON.stringify({ fixtureResultBytes: rows, duplicateSettingsAndPostReaderCalls: { before: baselineCalls, after: calls.length - before }, note: 'UTF-8 JSON result bytes, not transfer bytes or production latency. React request dispatcher test scope.' }, null, 2));
