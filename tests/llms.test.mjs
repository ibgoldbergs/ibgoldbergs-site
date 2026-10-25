import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

function load(filename, modules = {}) {
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const context = { exports: {}, Response, require: name => {
    assert.ok(name in modules, `Unexpected dependency ${name}`);
    return modules[name];
  } };
  vm.runInNewContext(source, context);
  return context.exports;
}

const route = load('app/llms.txt/route.ts', {
  '@/lib/constants': load('lib/constants.ts'),
});

test('llms guide serves plain-text Markdown with exactly the canonical public entry points', async () => {
  const response = route.GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/plain; charset=utf-8');
  const body = await response.text();
  assert.ok(body.startsWith('# Ian Goldberg\n'));
  const links = [...body.matchAll(/\]\(([^)]+)\)/g)].map(match => match[1]);
  assert.deepEqual(links, ['/', '/projects', '/learnings', '/writing', '/feed.xml']
    .map(path => `https://www.ibgoldbergs.com${path}`));
  for (const path of ['app/page.tsx', 'app/projects/page.tsx', 'app/learnings/page.tsx',
    'app/writing/page.tsx', 'app/feed.xml/route.ts']) {
    assert.ok(fs.existsSync(path), `Missing linked route ${path}`);
  }
});

test('llms guide excludes nonpublic surfaces and article exports', async () => {
  const body = await route.GET().text();
  assert.doesNotMatch(body, /studio|preview|draft|unlisted|small-industries-deserve-great-software|\/api\b|token|secret|password|credential|llms-full|\/writing\//i);
  assert.ok(body.length < 1500);
});
