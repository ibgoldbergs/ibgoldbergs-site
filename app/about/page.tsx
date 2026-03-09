import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ian Goldberg. Product builder, creator, and constant learner.",
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
            Product builder at{" "}
            <a
              href="https://onevisionresources.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              OneVision Resources
            </a>
            , building software for smart home service teams. I build AI
            native, shipping with tools like Claude Code and Cursor every day.
          </p>

          <p>
            Creator, designer, skier, backpacker, ultralight pack maker, cook.
            Constantly learning, constantly making.
          </p>

          <p className="text-sm text-muted italic">
            &ldquo;To live outside the law, you must be honest.&rdquo;
          </p>
        </div>
      </AnimateIn>
    </article>
  );
}
