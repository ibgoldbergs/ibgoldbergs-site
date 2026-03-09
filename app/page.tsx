import { AnimateIn } from "@/components/animate-in";
import { PersonJsonLd } from "@/components/json-ld";
import Link from "next/link";

export default function Home() {
  return (
    <article>
      <PersonJsonLd />
      <AnimateIn>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">
          Ian Goldberg
        </h1>
        <p className="mt-2 text-muted">
          Product builder in Asheville, NC
        </p>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <p className="mt-8 leading-relaxed text-foreground">
          Product builder at{" "}
          <a
            href="https://onevisionresources.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-heading"
          >
            OneVision Resources
          </a>
          , building software for smart home service teams. Creator, designer,
          skier, backpacker, cook. Always learning, always making.
        </p>
        <p className="mt-4 text-sm text-muted italic">
          &ldquo;To live outside the law, you must be honest.&rdquo;
        </p>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <div className="mt-12 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-medium text-heading">Writing</h2>
            <p className="mt-1 text-sm text-muted">
              Thoughts on product, technology, and building things.
            </p>
            <Link
              href="/writing"
              className="mt-2 inline-block text-sm text-foreground underline underline-offset-4 transition-colors hover:text-heading"
            >
              Read all posts
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-medium text-heading">Projects</h2>
            <p className="mt-1 text-sm text-muted">
              Work I&apos;ve shipped and things I&apos;ve built.
            </p>
            <Link
              href="/projects"
              className="mt-2 inline-block text-sm text-foreground underline underline-offset-4 transition-colors hover:text-heading"
            >
              View projects
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-medium text-heading">Learnings</h2>
            <p className="mt-1 text-sm text-muted">
              Podcasts, books, and products I keep coming back to.
            </p>
            <Link
              href="/learnings"
              className="mt-2 inline-block text-sm text-foreground underline underline-offset-4 transition-colors hover:text-heading"
            >
              See what I follow
            </Link>
          </div>
        </div>
      </AnimateIn>
    </article>
  );
}
