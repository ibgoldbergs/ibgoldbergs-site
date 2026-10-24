import { RichText } from "@/components/rich-text";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";
import { getAllPosts } from "@/lib/mdx";
import { settings } from "@/lib/cms";

export async function generateStaticParams() {
  return (await getAllPosts({ includeUnlisted: true })).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const SITE=await settings();
  const { slug } = await params;
  const post = (await getAllPosts({ includeUnlisted: true, preview: true })).find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    robots: (post.unlisted || (await draftMode()).isEnabled) ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE.url}/writing/${post.slug}`,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const SITE=await settings();
  const { slug } = await params;
  const post = (await getAllPosts({ includeUnlisted: true, preview: true })).find((p) => p.slug === slug);
  if (!post) notFound();


  return (
    <article>
      <AnimateIn>
        <Link
          href="/writing"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; {SITE.backLabel}
        </Link>

        <header className="mt-8">
          <h1 className="text-2xl font-semibold tracking-tight text-heading">
            {post.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-dim">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3 flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <div className="mt-10">
          <RichText value={post.body} />
        </div>
      </AnimateIn>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: SITE.name,
              url: SITE.url,
            },
            url: `${SITE.url}/writing/${post.slug}`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </article>
  );
}

export const dynamicParams = true;
