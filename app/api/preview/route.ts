import {draftMode} from 'next/headers';
import {timingSafeEqual} from 'node:crypto';
export async function POST(request:Request){
 const expected=process.env.SANITY_PREVIEW_SECRET;
 const supplied=request.headers.get('authorization')?.replace(/^Bearer /,'');
 if(!expected||!supplied||Buffer.byteLength(expected)!==Buffer.byteLength(supplied)||!timingSafeEqual(Buffer.from(expected),Buffer.from(supplied)))return new Response('Unauthorized',{status:401});
 (await draftMode()).enable();
 return new Response('Preview enabled',{headers:{'Cache-Control':'no-store'}});
}
export async function DELETE(){(await draftMode()).disable();return new Response('Preview disabled',{headers:{'Cache-Control':'no-store'}})}
