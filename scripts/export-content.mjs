// Historical extractor: run only against the source commit documented below.
// Offline inventory export. Never connects to or mutates a Sanity dataset.
import fs from 'node:fs';
import vm from 'node:vm';
const read = p => fs.readFileSync(p, 'utf8');
const extract = (file, name) => {
 const source = read(file);
 const match = source.match(new RegExp(`(?:export )?const ${name} = ([\\s\\S]*?);`));
 if (!match) throw new Error(`Missing ${name}`);
 return vm.runInNewContext(`(${match[1].replace(/ as const$/, '')})`);
};
const inventory = {
 sourceCommit: '5136c123e85f615d6aa3bfda9f2fa0a9029a95ca',
 settings: extract('lib/constants.ts', 'SITE'),
 social: extract('lib/constants.ts', 'SOCIAL'),
 navigation: extract('lib/constants.ts', 'NAV_ITEMS'),
 projects: extract('app/projects/page.tsx', 'projects'),
 podcasts: extract('app/learnings/page.tsx', 'podcasts'),
 reading: extract('app/learnings/page.tsx', 'reading'),
 homepageSource: read('app/page.tsx'),
 personStructuredDataSource: read('components/json-ld.tsx'),
 posts: fs.readdirSync('content/posts').filter(f => f.endsWith('.mdx')).map(file => ({slug:file.replace(/\.mdx$/, ''), source:read(`content/posts/${file}`)})),
};
fs.writeFileSync('sanity/source-inventory.json', JSON.stringify(inventory, null, 2)+'\n');
console.log(`Exported ${inventory.posts.length} full posts, ${inventory.projects.length} projects, ${inventory.podcasts.length} podcasts, ${inventory.reading.length} books.`);
