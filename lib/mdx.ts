import { query } from './cms';
import type { PortableTextBlock } from '@portabletext/react';
import readingTime from 'reading-time';

export type PostMeta = { title: string; date: string; description: string; slug: string };
type Post = PostMeta & { tags: string[]; unlisted: boolean; body: PortableTextBlock[]; readingTime: string };
export const plainText = (body: PortableTextBlock[]) => body.map(b => (b.children || []).map(c => c.text).join('')).join('\n\n');
const listed = '_type == "post" && draft != true && unlisted != true';
export const POST_QUERIES = {
  listing: `*[${listed}] | order(date desc){title,date,description,"slug":slug.current}`,
  feed: `*[${listed}] | order(date desc){title,date,description,"slug":slug.current,"text":pt::text(body)}`,
  sitemap: `*[${listed}]{"slug":slug.current,date,_updatedAt}`,
  single: '*[_type == "post" && draft != true && slug.current == $slug][0]{title,date,description,"slug":slug.current,tags,unlisted,body}',
};

// Discovery is always published-only, even when the request has a preview cookie.
export function getAllPosts(): Promise<PostMeta[]> {
  return query(POST_QUERIES.listing);
}
export function getFeedPosts(): Promise<(PostMeta & { text: string })[]> {
  return query(POST_QUERIES.feed);
}
export function getSitemapPosts(): Promise<{ slug: string; date: string; _updatedAt?: string }[]> {
  return query(POST_QUERIES.sitemap);
}
export async function getPostBySlug(slug: string, preview = true): Promise<Post | null> {
  const post = await query<Omit<Post, 'readingTime'> | null>(POST_QUERIES.single, { slug, preview });
  return post ? { ...post, tags: post.tags || [], readingTime: readingTime(plainText(post.body)).text } : null;
}
export async function getPostsByYear() {
  const result: Record<string, PostMeta[]> = {};
  for (const post of await getAllPosts()) (result[post.date.slice(0, 4)] ??= []).push(post);
  return result;
}
