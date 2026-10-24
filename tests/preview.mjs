import {spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const secret=randomBytes(32).toString('hex');
const processHandle=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3101'],{env:{...process.env,SANITY_PREVIEW_SECRET:secret},stdio:'ignore'});
const base='http://127.0.0.1:3101';
try {
 for(let i=0;i<40;i++){try{await fetch(base);break}catch{await new Promise(r=>setTimeout(r,250))}}
 const response=await fetch(base+'/api/preview',{method:'POST',headers:{authorization:`Bearer ${secret}`}});
 assert.equal(response.status,200);
 const cookie=response.headers.get('set-cookie'); assert.match(cookie,/HttpOnly/i); assert.match(response.headers.get('cache-control'),/no-store/);
 const preview=await fetch(base+'/writing/hello-world',{headers:{cookie:cookie.split(';')[0]}});const html=await preview.text(); assert.match(html,/noindex/);assert.ok(!html.includes(secret));
 assert.equal((await fetch(base+'/api/preview',{method:'DELETE'})).status,200);
 for(const entry of fs.readdirSync('.next/static/chunks',{recursive:true})){const p='.next/static/chunks/'+entry;if(fs.statSync(p).isFile())assert.ok(!fs.readFileSync(p,'utf8').includes(secret));}
 console.log('Ephemeral fixture preview: authorized cookie, noindex, exit and no secret exposure passed');
} finally {processHandle.kill();}
