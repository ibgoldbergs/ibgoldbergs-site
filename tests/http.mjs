import assert from 'node:assert/strict';
const base='http://127.0.0.1:3100';
for(const path of ['/','/projects','/learnings','/writing','/writing/hello-world','/writing/small-industries-deserve-great-software','/studio']) assert.equal((await fetch(base+path)).status,200,path);
const unlisted=await (await fetch(base+'/writing/small-industries-deserve-great-software')).text();
assert.match(unlisted,/noindex/);
for(const path of ['/writing','/feed.xml','/sitemap.xml']){const body=await (await fetch(base+path)).text();assert.ok(!body.includes('small-industries-deserve-great-software'),path);assert.ok(body.includes('hello-world'),path)}
assert.equal((await fetch(base+'/writing/not-a-real-post')).status,404);
assert.equal((await fetch(base+'/api/preview',{method:'POST'})).status,401);
assert.equal((await fetch(base+'/api/preview',{method:'POST',headers:{authorization:'Bearer incorrect'}})).status,401);
console.log('HTTP fixture routes, visibility, noindex, 404 and preview rejection passed');
