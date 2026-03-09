import { AnimateIn } from "@/components/animate-in";
import { PersonJsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <article>
      <PersonJsonLd />
      <AnimateIn>
        <div className="space-y-6 leading-relaxed text-foreground">
          <p>
            Building product at{" "}
            <a
              href="https://onevisionresources.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              OneVision Resources
            </a>
            {" "}for the modern smart home. A creative and technologist, thinker
            and shipper, working natively with AI. Drawn to quality, clarity, and
            iterative improvement, with a deep respect for the details that make
            products feel capable, intuitive, and worth using. Obsessed with
            products that age well and are built to last.
          </p>

          <p className="text-muted">
            Husband. Dad. Chef. Pitmaster. Skier. Ultralight pack maker.
            Learning by doing and building skill over time through curiosity,
            repetition, and constant tinkering. Never fully satisfied, always
            refining. Mindful that much of what surrounds us is someone&apos;s
            life work.
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
