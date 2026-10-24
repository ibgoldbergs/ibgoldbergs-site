import {documents} from './cms';
import type {PortableTextBlock} from '@portabletext/react';
import readingTime from 'reading-time';
type Document={title:string;date:string;description:string;tags:string[];unlisted:boolean;draft?:boolean;slug:{current:string};body:PortableTextBlock[]};
export type PostMeta=Omit<Document,'slug'> & {slug:string;readingTime:string};
export const plainText=(body:PortableTextBlock[])=>body.map(b=>b.children.map(c=>c.text).join('')).join('\n\n');
export async function getAllPosts({includeUnlisted=false,preview=false}={}):Promise<PostMeta[]>{
 return (await documents<Document>('post',preview)).filter(p=>!p.draft).filter(p=>includeUnlisted||!p.unlisted).map(p=>({...p,tags:p.tags||[],slug:p.slug.current,readingTime:readingTime(plainText(p.body)).text})).sort((a,b)=>b.date.localeCompare(a.date));
}
export async function getPostsByYear(){const result:Record<string,PostMeta[]>={};for(const p of await getAllPosts()){const year=p.date.slice(0,4);(result[year]??=[]).push(p)}return result}
