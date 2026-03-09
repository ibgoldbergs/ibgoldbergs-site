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
            , building software for servicing the smart home.
          </p>

          <p className="text-muted">
            Creative. Shipper. Care deeply about quality. Build AI native.
            Skier, backpacker, ultralight pack maker, cook. Always making,
            always learning, pushing to the edges of what feels possible.
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
