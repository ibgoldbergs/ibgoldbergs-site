import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { createRequire } from 'node:module';
import { AsyncLocalStorage } from 'node:async_hooks';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { parse, evaluate } from 'groq-js';
import readingTime from 'reading-time';
const require = createRequire(import.meta.url);
const react = require(path.join(path.dirname(require.resolve('react')), 'react.react-server.js'));
const scope = new AsyncLocalStorage();
react.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.A = {
  getCacheForType(factory) {
    const request = scope.getStore();
    if (!request) return factory();
    if (!request.has(factory)) request.set(factory, factory());
    return request.get(factory);
  },
};
export const request = fn => scope.run(new Map(), fn);
export function load(filename, modules, globals = {}, sourceText = fs.readFileSync(filename, 'utf8')) {
  const source = ts.transpileModule(sourceText, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const context = { exports: {}, require: name => {
    assert.ok(name in modules, `Unexpected dependency ${name}`);
    return modules[name];
  }, ...globals };
  vm.runInNewContext(source, context);
  return context.exports;
}
export function harness(records, { preview = false, token = 'test-only-token' } = {}) {
  const calls = [];
  const cms = load('lib/cms.ts', {
    react, 'server-only': {},
    './constants': load('lib/constants.ts', {}),
    '@/sanity/fixtures.json': records,
    'next/headers': { draftMode: async () => ({ isEnabled: preview }) },
    '@sanity/client': { createClient: options => ({ fetch: async (query, params, fetchOptions) => {
      calls.push({ query, params, options, fetchOptions });
      let dataset = records.filter(d => !d._id.startsWith('versions.'));
      if (options.perspective === 'published') dataset = dataset.filter(d => !d._id.startsWith('drafts.'));
      else dataset = dataset.filter(d => d._id.startsWith('drafts.') || !dataset.some(draft => draft._id === 'drafts.' + d._id));
      return (await evaluate(parse(query), { dataset, params })).get();
    } }) },
  }, { process: { env: { NEXT_PUBLIC_SANITY_PROJECT_ID: 'fixture-project', NEXT_PUBLIC_SANITY_DATASET: 'production', SANITY_API_READ_TOKEN: token } } });
  const posts = load('lib/mdx.ts', { './cms': cms, 'reading-time': readingTime });
  return { cms, posts, calls };
}
export const fixtures = () => JSON.parse(fs.readFileSync('sanity/fixtures.json', 'utf8'));
