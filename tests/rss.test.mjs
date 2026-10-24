import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import readingTime from 'reading-time';

function load(filename, modules, globals = {}) {
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const context = { exports: {}, require: name => {
    assert.ok(name in modules, `Unexpected dependency ${name}`);
    return modules[name];
  }, ...globals };
  vm.runInNewContext(source, context);
  return context.exports;
}

test('RSS is never cached and reflects listing changes without exposing preview drafts', async () => {
  const fixtures = JSON.parse(fs.readFileSync('sanity/fixtures.json', 'utf8'));
  fixtures.find(d => d._type === 'settings').url = 'https://ibgoldbergs.com/';
  const listed = structuredClone(fixtures.find(d => d._id === 'post-hello-world'));
  listed.title = 'RSS <test> & ]]> escaping';
  const privateDraft = { ...listed, _id: 'drafts.private', title: 'PRIVATE_DRAFT_SENTINEL', slug: { current: 'private-draft' } };
  const records = [...fixtures.filter(d => d._id !== listed._id), listed, privateDraft];
  const cms = load('lib/cms.ts', {
    'server-only': {},
    './constants': load('lib/constants.ts', {}),
    '@/sanity/fixtures.json': fixtures,
    'next/headers': { draftMode: async () => { throw Error('Public RSS must not consult draft preview'); } },
    '@sanity/client': { createClient: options => {
      assert.equal(options.perspective, 'published');
      assert.equal(options.token, undefined);
      assert.equal(options.useCdn, false);
      return { fetch: async (query, params, requestOptions) => {
        assert.equal(requestOptions.cache, 'no-store');
        return records.filter(d => d._type === params.type && !d._id.startsWith('drafts.'));
      } };
    } },
  }, { process: { env: { NEXT_PUBLIC_SANITY_PROJECT_ID: 'fixture-project', NEXT_PUBLIC_SANITY_DATASET: 'production', SANITY_API_READ_TOKEN: 'must-not-be-used' } } });
  const posts = load('lib/mdx.ts', { './cms': cms, 'reading-time': readingTime });
  const route = load('app/feed.xml/route.ts', { '@/lib/mdx': posts, '@/lib/cms': cms }, { Response });
  const first = await route.GET();
  assert.equal(first.headers.get('cache-control'), 'no-store');
  assert.equal(first.headers.get('content-type'), 'application/xml; charset=utf-8');
  const firstXml = await first.text();
  assert.ok(firstXml.includes('https://www.ibgoldbergs.com/writing/hello-world'));
  assert.ok(firstXml.includes('https://www.ibgoldbergs.com/feed.xml'));
  assert.ok(!firstXml.includes('https://ibgoldbergs.com'));
  const sitemap = load('app/sitemap.ts', { '@/lib/mdx': posts, '@/lib/cms': cms });
  const entries = await sitemap.default();
  assert.ok(entries.every(entry => entry.url.startsWith('https://www.ibgoldbergs.com')));
  assert.ok(!entries.some(entry => entry.url.includes('small-industries-deserve-great-software')));
  assert.ok(!firstXml.includes('small-industries-deserve-great-software'));
  assert.ok(!firstXml.includes('PRIVATE_DRAFT_SENTINEL'));
  assert.ok(firstXml.includes(']]]]><![CDATA[>'));
  listed.unlisted = true;
  const withdrawn = await route.GET();
  assert.equal(withdrawn.headers.get('cache-control'), 'no-store');
  const withdrawnXml = await withdrawn.text();
  assert.ok(!withdrawnXml.includes('/writing/hello-world'));
  assert.ok(!withdrawnXml.includes('PRIVATE_DRAFT_SENTINEL'));
});
