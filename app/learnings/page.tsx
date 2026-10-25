import { socialMetadata } from "@/lib/metadata";
import { documents, settings } from "@/lib/cms";
import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";

export async function generateMetadata(): Promise<Metadata> {
  const [[c], site] = await Promise.all([documents<{title:string;description:string}>("learnings", true), settings()]);
  return {
    title: c.title,
    description: c.description,
    ...socialMetadata({ title: c.title, description: c.description, path: "/learnings", site }),
  };
}



function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-1.5"
    >
      <span className="text-sm text-foreground transition-colors group-hover:text-heading">
        {children}
      </span>
      <span
        className="shrink-0 text-xs text-dim opacity-0 translate-x-[-4px] transition-all group-hover:opacity-100 group-hover:translate-x-0"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}

export default async function LearningsPage() {
 const [content] = await documents<{title:string;podcasts:{title:string;href:string}[];reading:{title:string;author:string}[];podcastsLabel:string;readingLabel:string}>("learnings", true);
 const {podcasts,reading} = content;
  return (
    <article>
      <h1 className="sr-only">{content.title}</h1>
      <AnimateIn>
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-dim mb-4">
            {content.podcastsLabel}
          </h2>
          <div>
            {podcasts.map((podcast) => (
              <ExternalLink key={podcast.title} href={podcast.href}>
                {podcast.title}
              </ExternalLink>
            ))}
          </div>
        </section>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <section className="mt-14">
          <h2 className="text-xs font-medium uppercase tracking-widest text-dim mb-4">
            {content.readingLabel}
          </h2>
          <div>
            {reading.map((book) => (
              <div key={book.title} className="flex items-baseline justify-between py-1.5">
                <span className="text-sm text-foreground">{book.title}</span>
                <span className="shrink-0 text-xs text-dim ml-4">{book.author}</span>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>
    </article>
  );
}
