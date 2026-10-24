import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const source = ts.transpileModule(fs.readFileSync('lib/mdx.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;

function loadPosts(env) {
  const fixtures = {
    'listed.mdx': 'draft: false',
    'unlisted.mdx': 'draft: false\nunlisted: true',
    'draft.mdx': 'draft: true',
    'unlisted-draft.mdx': 'draft: true\nunlisted: true',
  };
  const fakeFs = {
    existsSync: () => true,
    readdirSync: () => Object.keys(fixtures),
    readFileSync: (filename) => `---\ntitle: Test\ndate: "2026-10-24"\n${fixtures[path.basename(filename)]}\n---\nBody`,
  };
  const context = {
    exports: {},
    require: (name) => ({ fs: fakeFs, path, 'gray-matter': matter, 'reading-time': readingTime })[name],
    process: { env, cwd: () => '/fixture' },
  };
  vm.runInNewContext(source, context);
  return context.exports;
}

const slugs = (posts) => Array.from(posts, (post) => post.slug).sort();
for (const env of [{ NODE_ENV: 'production' }, { NODE_ENV: 'development', VERCEL_ENV: 'production' }]) {
  test(`production excludes drafts and keeps unlisted out of listings: ${JSON.stringify(env)}`, () => {
    const api = loadPosts(env);
    assert.deepEqual(slugs(api.getAllPosts()), ['listed']);
    assert.deepEqual(slugs(api.getAllPosts({ includeUnlisted: true })), ['listed', 'unlisted']);
    assert.deepEqual(slugs(api.getPostsByYear()['2026']), ['listed']);
  });
}
test('development preserves draft access but unlisted requires explicit access', () => {
  const api = loadPosts({ NODE_ENV: 'development' });
  assert.deepEqual(slugs(api.getAllPosts()), ['draft', 'listed']);
  assert.deepEqual(slugs(api.getAllPosts({ includeUnlisted: true })), ['draft', 'listed', 'unlisted', 'unlisted-draft']);
});
