import { getAllPosts, plainText } from "@/lib/mdx";
import { settings } from "@/lib/cms";

const xml=(s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const cdata=(s:string)=>s.replace(/]]>/g,"]]]]><![CDATA[>");
export async function GET() {
  const SITE=await settings(false);
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const content = plainText(post.body);
      // Strip frontmatter for RSS content
      const body = content.replace(/^---[\s\S]*?---/, "").trim();

      return `    <item>
      <title><![CDATA[${cdata(post.title)}]]></title>
      <link>${SITE.url}/writing/${post.slug}</link>
      <guid isPermaLink="true">${SITE.url}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${cdata(post.description)}]]></description>
      <content:encoded><![CDATA[${cdata(body)}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${xml(SITE.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Visibility changes must apply on the next request, including withdrawals.
      "Cache-Control": "no-store",
    },
  });
}
