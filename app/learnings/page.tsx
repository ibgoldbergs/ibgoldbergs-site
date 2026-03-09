import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Learnings",
  description:
    "Podcasts, books, and products that shape how Ian Goldberg thinks and builds.",
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

const products = [
  { title: "Linear", href: "https://linear.app" },
  { title: "Monologue", href: "https://monologue.app" },
  { title: "Plot", href: "https://plotapp.io" },
  { title: "Claude Code", href: "https://claude.ai/code" },
  { title: "CleanShot", href: "https://cleanshot.com" },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-2 cursor-pointer"
    >
      <span className="text-sm text-foreground transition-colors group-hover:text-heading">
        {children}
      </span>
      <span
        className="shrink-0 text-dim opacity-0 translate-x-[-4px] transition-all group-hover:opacity-100 group-hover:translate-x-0"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-widest text-dim pb-3">
      {children}
    </h2>
  );
}

export default function LearningsPage() {
  return (
    <article>
      <AnimateIn>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">
          Learnings
        </h1>
        <p className="mt-2 text-muted">
          What I keep coming back to.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <section className="mt-12">
          <SectionLabel>Podcasts</SectionLabel>
          <div className="border-t border-border">
            {podcasts.map((podcast) => (
              <ExternalLink key={podcast.title} href={podcast.href}>
                {podcast.title}
              </ExternalLink>
            ))}
          </div>
        </section>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <section className="mt-12">
          <SectionLabel>Reading</SectionLabel>
          <div className="border-t border-border">
            {reading.map((book) => (
              <div key={book.title} className="flex items-baseline justify-between py-2">
                <span className="text-sm text-foreground">{book.title}</span>
                <span className="shrink-0 text-xs text-dim ml-4">{book.author}</span>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      <AnimateIn delay={0.3}>
        <section className="mt-12">
          <SectionLabel>Products I Love</SectionLabel>
          <div className="border-t border-border">
            {products.map((product) => (
              <ExternalLink key={product.title} href={product.href}>
                {product.title}
              </ExternalLink>
            ))}
          </div>
        </section>
      </AnimateIn>
    </article>
  );
}
