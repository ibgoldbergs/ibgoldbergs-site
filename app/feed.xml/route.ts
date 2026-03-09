import { getAllPosts, getPostContent } from "@/lib/mdx";
import { SITE } from "@/lib/constants";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const content = getPostContent(post.slug);
      // Strip frontmatter for RSS content
      const body = content.replace(/^---[\s\S]*?---/, "").trim();

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE.url}/writing/${post.slug}</link>
      <guid isPermaLink="true">${SITE.url}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <content:encoded><![CDATA[${body}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
