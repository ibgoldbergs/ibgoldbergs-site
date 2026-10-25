// Safe against production: GET requests only, no CMS writes or preview credentials.
import assert from 'node:assert/strict';
const base = process.env.QA_BASE || 'https://www.ibgoldbergs.com';
const canonical = 'https://www.ibgoldbergs.com';
const held = 'small-industries-deserve-great-software';
for (const path of ['/', '/projects', '/learnings', '/writing', '/writing/hello-world', `/writing/${held}`]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, /<title>[^<]+<\/title>/, path);
  assert.equal(new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]).href, new URL(path, canonical).href, path);
  if (path.endsWith(held)) assert.match(html, /noindex/);
  console.log(path, html.match(/<title>(.*?)<\/title>/)[1]);
}
for (const path of ['/writing', '/feed.xml', '/sitemap.xml', '/llms.txt']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.ok(!body.includes(held), path);
  if (path !== '/llms.txt') assert.ok(body.includes('hello-world'), path);
  if (path === '/feed.xml') assert.match(response.headers.get('cache-control'), /no-store/);
  if (path === '/llms.txt') assert.match(response.headers.get('content-type'), /text\/plain/);
}
assert.equal((await fetch(base + '/writing/task9-nonexistent-slug')).status, 404);
console.log('Public titles, canonicals, RSS/sitemap/llms visibility, held essay noindex and 404 passed');
