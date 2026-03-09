import { AnimateIn } from "@/components/animate-in";
import { PersonJsonLd } from "@/components/json-ld";
import { SOCIAL, SITE } from "@/lib/constants";
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
          Senior Product Manager at OneVision Resources
        </p>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <p className="mt-8 leading-relaxed text-foreground">
          Building products that solve real problems. I think about systems,
          workflows, and the details that make software feel right. Currently
          focused on resource management and operational tooling.
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
        </div>
      </AnimateIn>

      <AnimateIn delay={0.3}>
        <div className="mt-12 flex gap-4">
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
            <span className="ml-0.5 text-dim" aria-hidden="true">
              ↗
            </span>
          </a>
          <a
            href={SOCIAL.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            X
            <span className="ml-0.5 text-dim" aria-hidden="true">
              ↗
            </span>
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </AnimateIn>
    </article>
  );
}
