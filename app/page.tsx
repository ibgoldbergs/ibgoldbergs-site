import { AnimateIn } from "@/components/animate-in";
import { PersonJsonLd } from "@/components/json-ld";
import { SOCIAL, SITE } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <article>
      <PersonJsonLd />

      {/* Bio */}
      <AnimateIn>
        <p className="leading-relaxed text-foreground">
          <em className="text-heading">Building products.</em> Crafting
          software for teams that care about quality. Obsessing over the
          details that make tools feel right. Product builder at{" "}
          <a
            href="https://onevisionresources.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-heading"
          >
            OneVision Resources
          </a>
          .
        </p>
        <p className="mt-4 text-muted">
          Previously marketing research at Marin Software, customer success at
          Control4. I build AI native with Claude Code and Cursor.
        </p>
      </AnimateIn>

      {/* Projects */}
      <AnimateIn delay={0.1}>
        <section className="mt-16">
          <h2 className="text-sm font-medium text-heading">Projects</h2>
          <div className="mt-4 flex flex-col gap-6">
            <div>
              <a
                href="https://www.onevisionresources.com/post/onevision-introduces-provision"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-foreground transition-colors hover:text-heading"
              >
                ProVision
              </a>
              <span className="ml-1.5 text-dim" aria-hidden="true">↗</span>
              <p className="mt-1 text-sm text-muted">
                Software for smart home service teams. CRM, subscriptions,
                on-call management.
              </p>
            </div>
            <div>
              <a
                href="https://app.whilst.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-foreground transition-colors hover:text-heading"
              >
                Whilst
              </a>
              <span className="ml-1.5 text-dim" aria-hidden="true">↗</span>
              <p className="mt-1 text-sm text-muted">
                AI-native knowledge platform. Your team&apos;s knowledge lives,
                learns, and evolves.
              </p>
            </div>
            <div>
              <span className="text-foreground">Ultralight Packs</span>
              <p className="mt-1 text-sm text-muted">
                Handmade backpacks from DCF and X-Pac. Every stitch and gram
                is intentional.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              All projects
            </Link>
          </div>
        </section>
      </AnimateIn>

      {/* Writing */}
      <AnimateIn delay={0.2}>
        <section className="mt-16">
          <h2 className="text-sm font-medium text-heading">Writing</h2>
          <div className="mt-4 flex flex-col gap-6">
            <div>
              <Link
                href="/writing/hello-world"
                className="underline underline-offset-4 text-foreground transition-colors hover:text-heading"
              >
                Hello, World
              </Link>
              <p className="mt-1 text-sm text-muted">
                Why I built this site and what you&apos;ll find here.
              </p>
            </div>
            <Link
              href="/writing"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              All writing
            </Link>
          </div>
        </section>
      </AnimateIn>

      {/* Now */}
      <AnimateIn delay={0.3}>
        <section className="mt-16">
          <h2 className="text-sm font-medium text-heading">Now</h2>
          <div className="mt-4 space-y-4 text-muted">
            <p>
              Developing skill through doing. Creator, designer, skier,
              backpacker, ultralight pack maker, cook. Mindful that{" "}
              <em>everything around me is someone&apos;s life work.</em>
            </p>
            <p>
              Food is how I explore the world. Every cuisine has something to
              teach you, and sharing a table is one of the simplest ways to
              connect people across cultures. Obsessed with quality in all its
              forms, from software to materials to a well-built meal.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Connect */}
      <AnimateIn delay={0.4}>
        <section className="mt-16">
          <h2 className="text-sm font-medium text-heading">Connect</h2>
          <p className="mt-4 text-muted">
            Reach me on{" "}
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 text-foreground transition-colors hover:text-heading"
            >
              LinkedIn
            </a>
            ,{" "}
            <a
              href={SOCIAL.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 text-foreground transition-colors hover:text-heading"
            >
              X
            </a>
            , or{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="underline underline-offset-4 text-foreground transition-colors hover:text-heading"
            >
              email
            </a>
            .
          </p>
        </section>
      </AnimateIn>

      <AnimateIn delay={0.5}>
        <p className="mt-16 text-sm text-dim italic">
          &ldquo;To live outside the law, you must be honest.&rdquo;
        </p>
      </AnimateIn>
    </article>
  );
}
