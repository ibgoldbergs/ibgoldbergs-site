import fs from 'node:fs';
import assert from 'node:assert/strict';
const env=Object.fromEntries(fs.readFileSync('.env.local','utf8').trim().split('\n').map(l=>l.split(/=(.*)/s).slice(0,2)));
assert.equal(process.env.RUN_CONNECTED_QA,'1','Explicit opt-in required: creates and removes temporary draft/unlisted documents');
const editor=fs.readFileSync(process.env.SANITY_IMPORT_TOKEN_FILE,'utf8');
const api='https://xa3wrva2.api.sanity.io/v2026-10-01/data/';
const base=process.env.QA_BASE||'http://127.0.0.1:3100';
async function query(q,token,perspective='published'){const r=await fetch(api+'query/production?query='+encodeURIComponent(q)+'&perspective='+perspective,{headers:token?{authorization:'Bearer '+token}:{}});assert.equal(r.status,200);return (await r.json()).result}
async function mutate(mutations){const r=await fetch(api+'mutate/production',{method:'POST',headers:{authorization:'Bearer '+editor,'content-type':'application/json'},body:JSON.stringify({mutations})});assert.equal(r.status,200);return r.json()}
const docs=JSON.parse(fs.readFileSync('sanity/fixtures.json','utf8'));
for(const doc of docs){const actual=await query('*[_id=="'+doc._id+'"][0]');for(const [key,value] of Object.entries(doc))assert.deepEqual(actual[key],value,key)}
console.log('All six connected documents match imported fixtures including full essay and visibility');
const id='qa-temporary-slug-verification',slug='qa-temporary-slug-verification';
const test={_id:'drafts.'+id,_type:'post',title:'Temporary private QA',slug:{_type:'slug',current:slug},date:'2026-10-24',unlisted:true,body:[{_type:'block',_key:'qa',style:'normal',markDefs:[],children:[{_type:'span',_key:'qas',marks:[],text:'PRIVATE_QA_DRAFT_SENTINEL'}]}]};
assert.equal(await query('count(*[_id in ["'+id+'","drafts.'+id+'"]])',editor,'raw'),0);
try {
 await mutate([{create:test}]);
 assert.equal(await query('count(*[_id=="drafts.'+id+'"])'),0);
 assert.equal((await fetch(base+'/writing/'+slug)).status,404);
 const auth=await fetch(base+'/api/preview',{method:'POST',headers:{authorization:'Bearer '+env.SANITY_PREVIEW_SECRET}});assert.equal(auth.status,200);assert.match(auth.headers.get('set-cookie'),/HttpOnly/i);const cookie=auth.headers.get('set-cookie').split(';')[0];
 const preview=await fetch(base+'/writing/'+slug,{headers:{cookie}});assert.equal(preview.status,200);const html=await preview.text();assert.match(html,/PRIVATE_QA_DRAFT_SENTINEL/);assert.match(html,/noindex/);assert.ok(!html.includes(env.SANITY_API_READ_TOKEN));assert.ok(!html.includes(env.SANITY_PREVIEW_SECRET));
 for(const path of ['/writing','/feed.xml','/sitemap.xml'])assert.ok(!(await (await fetch(base+path,{headers:{cookie}})).text()).includes(slug));
 console.log('Actual draft hidden anonymously, available with HttpOnly preview, noindex and excluded from discovery');
 await mutate([{create:{...test,_id:id,title:'Temporary unlisted QA'}}]);
 const published=await fetch(base+'/writing/'+slug);assert.equal(published.status,200);assert.match(await published.text(),/noindex/);
 for(const path of ['/writing','/feed.xml','/sitemap.xml'])assert.ok(!(await (await fetch(base+path)).text()).includes(slug));
 console.log('New published unlisted slug resolves without code rebuild or redeploy');
 const exit=await fetch(base+'/api/preview',{method:'DELETE',headers:{cookie}});assert.equal(exit.status,200);
} finally {await mutate([{delete:{id}},{delete:{id:'drafts.'+id}}]);}
assert.equal((await fetch(base+'/writing/'+slug)).status,404);
assert.equal(await query('count(*[_type in ["home","settings","projects","learnings","post"]])',editor,'raw'),6);
console.log('Temporary QA documents removed; six original documents remain');
