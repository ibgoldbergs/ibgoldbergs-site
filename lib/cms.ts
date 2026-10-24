import 'server-only';
import {createClient} from '@sanity/client';
import {draftMode} from 'next/headers';
import fixtures from '@/sanity/fixtures.json';
export async function documents<T>(type:string,preview=false):Promise<T[]> {
 if(!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)return fixtures.filter(d=>d._type===type) as T[];
 const drafts=preview && (await draftMode()).isEnabled;
 if(drafts&&!process.env.SANITY_API_READ_TOKEN)throw Error('Draft read token is not configured');
 const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:'2026-10-01',useCdn:false,perspective:drafts?'drafts':'published',token:process.env.SANITY_API_READ_TOKEN});
 return client.fetch<T[]>('*[_type == $type]',{type},{cache:'no-store'});
}
export type Settings={name:string;title:string;description:string;url:string;locale:string;email:string;linkedin:string;twitter:string;navigation:{label:string;href:string}[]};
export async function settings(){return (await documents<Settings>('settings',true))[0]}
