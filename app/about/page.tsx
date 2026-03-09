import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ian Goldberg — Senior Product Manager, builder, and systems thinker.",
};

export default function AboutPage() {
  return (
    <article>
      <AnimateIn>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">
          About
        </h1>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <div className="mt-8 space-y-6 leading-relaxed text-foreground">
          <p>
            I&apos;m Ian Goldberg, a Senior Product Manager at{" "}
            <a
              href="https://onevisionresources.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              OneVision Resources
            </a>
            . I build products that help teams work better — focusing on
            operational workflows, resource management, and the kind of tooling
            that makes complex processes feel simple.
          </p>

          <p>
            Before product management, I spent time across strategy, operations,
            and business development. That cross-functional background shapes how
            I think about products — not just features, but the systems and
            incentives behind them.
          </p>

          <p>
            I believe the best products are opinionated but flexible, simple on
            the surface but powerful underneath. I care about the details:
            thoughtful defaults, clear feedback, reducing cognitive load.
          </p>

          <p>
            When I&apos;m not building products, you&apos;ll find me exploring
            new technologies, reading about design and systems thinking, or
            working on side projects.
          </p>

          <p className="text-muted">
            This site is my corner of the internet — a place to share what
            I&apos;m learning, what I&apos;m building, and how I think about the
            craft of making things.
          </p>
        </div>
      </AnimateIn>
    </article>
  );
}
