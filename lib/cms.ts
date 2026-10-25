import 'server-only';
import { cache } from 'react';
import { SITE } from './constants';
import { createClient } from '@sanity/client';
import { draftMode } from 'next/headers';
import fixtures from '@/sanity/fixtures.json';

// Primitive arguments let callers share work during one React server render only.
// No persistent cache: withdrawals must be reflected on the next request.
const read = cache(async (query: string, type: string, slug: string, preview: boolean): Promise<unknown> => {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const { parse, evaluate } = await import('groq-js');
    const dataset = fixtures.filter(d => !d._id.startsWith('drafts.') && !d._id.startsWith('versions.'));
    return (await evaluate(parse(query), { dataset, params: { type, slug } })).get();
  }
  const drafts = preview && (await draftMode()).isEnabled;
  if (drafts && !process.env.SANITY_API_READ_TOKEN) throw Error('Draft read token is not configured');
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2026-10-01', useCdn: false,
    perspective: drafts ? 'drafts' : 'published',
    token: drafts ? process.env.SANITY_API_READ_TOKEN : undefined,
  });
  return client.fetch(query, { type, slug }, { cache: 'no-store' });
});

export function query<T>(groq: string, { type = '', slug = '', preview = false } = {}): Promise<T> {
  return read(groq, type, slug, preview) as Promise<T>;
}

export function documents<T>(type: string, preview = false): Promise<T[]> {
  return query<T[]>('*[_type == $type]', { type, preview });
}

export function documentDates(type: string): Promise<{ _updatedAt?: string }[]> {
  return query('*[_type == $type]{_updatedAt}', { type });
}

export type Settings={writingTitle:string;writingDescription:string;emptyWriting:string;jobTitle:string;organization:string;alumni:string;city:string;region:string;homeLabel:string;backLabel:string;ogAlt:string;name:string;title:string;description:string;url:string;locale:string;email:string;linkedin:string;twitter:string;navigation:{label:string;href:string}[]};
export async function settings(preview=true) {
  const content = (await documents<Settings>('settings',preview))[0];
  // Production identity is fixed even when older CMS settings use the apex host.
  return { ...content, url: SITE.url };
}
