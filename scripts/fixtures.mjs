import fs from 'node:fs';
import {unified} from 'unified';
import parse from 'remark-parse';
import matter from 'gray-matter';
const source=JSON.parse(fs.readFileSync('sanity/source-inventory.json'));
let key=0;const k=()=>String(++key);
function body(markdown){
 const tree=unified().use(parse).parse(markdown);
 function block(n,listItem){
 if(n.type==='list')return n.children.flatMap(i=>i.children.flatMap(c=>block(c,n.ordered?'number':'bullet')));
 const markDefs=[];
 function spans(n,marks=[]){
 if(n.type==='text')return [{_type:'span',_key:k(),text:n.value,marks}];
 if(n.type==='strong'||n.type==='emphasis')return n.children.flatMap(c=>spans(c,[...marks,n.type==='strong'?'strong':'em']));
 if(n.type==='link'){const id=k();markDefs.push({_key:id,_type:'link',href:n.url});return n.children.flatMap(c=>spans(c,[...marks,id]));}
 if(n.children)return n.children.flatMap(c=>spans(c,marks));
 throw Error(`Unsupported markdown: ${n.type}`);
 }
 return [{_type:'block',_key:k(),style:n.type==='heading'?`h${n.depth}`:'normal',...(listItem?{listItem,level:1}:{}),children:spans(n),markDefs}];
 }
 return tree.children.flatMap(n=>block(n));
}
const home=JSON.parse(fs.readFileSync("sanity/fixtures.json")).find(d=>d._id==="home");
const extra=JSON.parse(fs.readFileSync('sanity/fixtures.json')).find(d=>d._id==='settings');
const docs=[home,{_id:'settings',_type:'settings',...extra,...source.settings,...source.social,navigation:source.navigation.map(x=>({...x,_type:'object',_key:k()})),writingTitle:'Writing',writingDescription:'Thoughts on product, technology, and building things.',emptyWriting:'No posts yet. Check back soon.'},{_id:'projects',_type:'projects',title:'Projects',description:'Projects and work by Ian Goldberg.',items:source.projects.map(x=>({...x,_type:'object',_key:k()}))},{_id:'learnings',_type:'learnings',title:'Learnings',description:'Podcasts and books that shape how Ian Goldberg thinks and builds.',podcastsLabel:'Podcasts',readingLabel:'Reading',podcasts:source.podcasts.map(x=>({...x,_type:'object',_key:k()})),reading:source.reading.map(x=>({...x,_type:'object',_key:k()}))},...source.posts.map(p=>{const {data,content}=matter(p.source);if(data.draft)throw Error('Draft source requires explicit migration handling');delete data.draft;return {_id:`post-${p.slug}`,_type:'post',...data,slug:{_type:'slug',current:p.slug},unlisted:data.unlisted??false,body:body(content)}})];
fs.writeFileSync('sanity/fixtures.json',JSON.stringify(docs,null,2)+'\n');
fs.writeFileSync('sanity/import.ndjson',docs.map(d=>JSON.stringify(d)).join('\n')+'\n');
console.log(`Generated ${docs.length} documents offline`);
