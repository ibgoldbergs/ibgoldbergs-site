import { documents } from "@/lib/cms";
import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/animate-in";
import { getPostsByYear } from "@/lib/mdx";

export async function generateMetadata():Promise<Metadata>{const [c]=await documents<{writingTitle:string;writingDescription:string}>("settings",true);return {title:c.writingTitle,description:c.writingDescription};}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export default async function WritingPage() {
  const [settings]=await documents<{emptyWriting:string}>("settings",true);
  const postsByYear = await getPostsByYear();
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <article>
      {years.length === 0 ? (
        <AnimateIn>
          <p className="text-muted">{settings.emptyWriting}</p>
        </AnimateIn>
      ) : (
        years.map((year, yearIndex) => (
          <AnimateIn key={year} delay={yearIndex * 0.05}>
            <div className={yearIndex === 0 ? "" : "mt-10"}>
              <h2 className="text-sm font-medium text-dim">{year}</h2>
              <ul className="mt-4 flex flex-col gap-4">
                {postsByYear[year].map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/writing/${post.slug}`}
                      className="group flex items-baseline justify-between gap-4"
                    >
                      <span className="text-foreground transition-colors group-hover:text-heading">
                        {post.title}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-dim">
                        {formatDate(post.date)}
                      </span>
                    </Link>
                    {post.description && (
                      <p className="mt-1 text-sm text-muted">
                        {post.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        ))
      )}
    </article>
  );
}
