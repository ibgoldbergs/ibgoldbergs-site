import { AnimateIn } from "@/components/animate-in";
import { PersonJsonLd } from "@/components/json-ld";
import Link from "next/link";

export default function Home() {
  return (
    <article>
      <PersonJsonLd />
      <AnimateIn>
        <p className="leading-relaxed text-foreground">
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

      <AnimateIn delay={0.1}>
        <div className="mt-12 flex flex-col gap-3">
          <Link
            href="/writing"
            className="group flex items-center justify-between py-1 text-sm text-foreground transition-colors hover:text-heading"
          >
            Writing
            <span className="text-dim opacity-0 translate-x-[-4px] transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/projects"
            className="group flex items-center justify-between py-1 text-sm text-foreground transition-colors hover:text-heading"
          >
            Projects
            <span className="text-dim opacity-0 translate-x-[-4px] transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/learnings"
            className="group flex items-center justify-between py-1 text-sm text-foreground transition-colors hover:text-heading"
          >
            Learnings
            <span className="text-dim opacity-0 translate-x-[-4px] transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </AnimateIn>
    </article>
  );
}
