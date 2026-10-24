import {defineType, defineField} from 'sanity';
const text = (name: string) => defineField({name, type:'string'});
const link = {type:'object', fields:[text('title'), text('href'), text('author')]};
export const schemaTypes = [
 defineType({name:'post', type:'document', fields:[text('title'), defineField({name:'slug', type:'slug', options:{source:'title'}, validation:r=>r.required()}), defineField({name:'date',type:'date'}),text('description'),defineField({name:'tags',type:'array',of:[{type:'string'}]}),defineField({name:'unlisted',type:'boolean',initialValue:false,description:'Public by direct URL, excluded from listings, feed and sitemap; noindex.'}),defineField({name:'body',type:'array',of:[{type:'block'}]})]}),
 defineType({name:'home',type:'document',fields:[defineField({name:'bio',type:'array',of:[{type:'block'}]}),text('personal'),text('quote'),text('attribution')]}),
 defineType({name:'projects',type:'document',fields:[text('title'),text('description'),defineField({name:'items',type:'array',of:[{type:'object',fields:[text('title'),text('description'),text('role'),text('href')]}]})]}),
 defineType({name:'learnings',type:'document',fields:[text('title'),text('description'),text('podcastsLabel'),text('readingLabel'),defineField({name:'podcasts',type:'array',of:[link]}),defineField({name:'reading',type:'array',of:[link]})]}),
 defineType({name:'settings',type:'document',fields:[...['name','title','description','url','locale','email','linkedin','twitter','writingTitle','writingDescription','emptyWriting'].map(text),defineField({name:'navigation',type:'array',of:[{type:'object',fields:[text('label'),text('href')]}]})]})
];
