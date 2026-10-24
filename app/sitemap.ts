import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { documents, settings } from "@/lib/cms";

type EditorialDocument = { _updatedAt?: string };

function validDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, posts, [home], [projects], [learnings]] = await Promise.all([
    settings(false),
    getAllPosts(),
    documents<EditorialDocument>("home", false),
    documents<EditorialDocument>("projects", false),
    documents<EditorialDocument>("learnings", false),
  ]);

  return [
    { url: site.url, lastModified: validDate(home?._updatedAt) },
    { url: `${site.url}/projects`, lastModified: validDate(projects?._updatedAt) },
    { url: `${site.url}/learnings`, lastModified: validDate(learnings?._updatedAt) },
    // No single document timestamp tracks additions and removals from this index.
    { url: `${site.url}/writing` },
    ...posts.map((post) => ({
      url: `${site.url}/writing/${post.slug}`,
      lastModified: validDate(post._updatedAt) ?? validDate(post.date),
    })),
  ];
}
