import { AnimateIn } from "@/components/animate-in";
import { PersonJsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <article>
      <PersonJsonLd />
      <AnimateIn>
        <div className="space-y-6 leading-relaxed text-foreground">
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
            , where I build software for smart home service teams. I care about
            quality, thoughtful defaults, and the details that make tools feel
            right. I build AI native.
          </p>

          <p className="text-muted">
            Creator, designer, skier, backpacker, ultralight pack maker, cook.
            Developing skill through doing, constantly learning, imbuing quality
            into everything. Mindful that{" "}
            <em>everything around me is someone&apos;s life work.</em>
          </p>

          <p className="text-dim text-sm">
            &ldquo;To live outside the law, you must be honest.&rdquo;{" "}
            <span className="not-italic">Bob Dylan</span>
          </p>
        </div>
      </AnimateIn>
    </article>
  );
}
