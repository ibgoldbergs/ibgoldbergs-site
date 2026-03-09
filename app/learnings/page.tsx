import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Learnings",
  description:
    "Podcasts and books that shape how Ian Goldberg thinks and builds.",
};

const podcasts = [
  { title: "Acquired", href: "https://www.acquired.fm/" },
  { title: "Lenny's Podcast", href: "https://www.lennysnewsletter.com/podcast" },
  { title: "In Depth", href: "https://review.firstround.com/podcast/" },
  { title: "Dwarkesh Podcast", href: "https://www.dwarkesh.com/podcast" },
  { title: "Stratechery", href: "https://stratechery.com/category/podcasts/" },
  { title: "BG2", href: "https://www.bg2pod.com/" },
  { title: "a16z", href: "https://a16z.com/podcasts/" },
  { title: "Unsolicited Feedback", href: "https://www.reforge.com/podcast/unsolicited-feedback" },
  { title: "Crucible Moments", href: "https://www.cruciblemoments.com/" },
  { title: "AI & I", href: "https://every.to/podcast" },
  { title: "How I AI", href: "https://podcasts.apple.com/us/podcast/how-i-ai/id1809663079" },
  { title: "Unsupervised Learning", href: "https://www.redpoint.com/content-hub/unsupervised-learning/" },
  { title: "Get the Check", href: "https://www.getthecheckpod.com/" },
  { title: "Glue Guys", href: "https://joincolossus.com/series/glue-guys/" },
];

const reading = [
  { title: "Zen and the Art of Motorcycle Maintenance", author: "Robert Pirsig" },
  { title: "Reinventing the Bazaar", author: "John McMillan" },
  { title: "Inspired", author: "Marty Cagan" },
  { title: "Steve Jobs", author: "Walter Isaacson" },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-2.5"
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

export default function LearningsPage() {
  return (
    <article>
      <AnimateIn>
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-dim mb-4">
            Podcasts
          </h2>
          <div className="divide-y divide-border border-t border-b border-border">
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
            Reading
          </h2>
          <div className="divide-y divide-border border-t border-b border-border">
            {reading.map((book) => (
              <div key={book.title} className="flex items-baseline justify-between py-2.5">
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
