import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
};

function isProduction() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        draft: data.draft ?? false,
        readingTime: readingTime(content).text,
      };
    })
    .filter((post) => (isProduction() ? !post.draft : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostContent(slug: string): string {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf-8");
}

export function getPostsByYear(): Record<string, PostMeta[]> {
  const posts = getAllPosts();
  const byYear: Record<string, PostMeta[]> = {};

  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString();
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(post);
  }

  return byYear;
}
