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
            {" "}for the modern smart home. Technologist. Creative turned
            AI-native. Shipper. Iterative thinker. High standards for quality,
            clarity, and products that feel capable, considered, and worth using.
          </p>

          <p className="text-muted">
            Husband. Dad. Chef. Pitmaster. Skier. Ultralight pack maker.
            Developing skill through doing. Constantly learning. Bringing care
            and quality to whatever gets made. Mindful that much of what
            surrounds us is someone&apos;s life work.
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
