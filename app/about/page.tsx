import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ian Goldberg. Senior Product Manager, builder, and systems thinker.",
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
            I&apos;m Ian Goldberg, a product builder based in Asheville, NC.
            Currently a Senior Product Manager at{" "}
            <a
              href="https://onevisionresources.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              OneVision Resources
            </a>
            , where I lead development on{" "}
            <a
              href="https://www.onevisionresources.com/post/onevision-introduces-provision"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              ProVision
            </a>
            , the platform that helps smart home integrators manage service
            operations, sell recurring memberships, and turn support into a
            profitable part of their business.
          </p>

          <p>
            My path to product wasn&apos;t a straight line. I started in
            marketing research at{" "}
            <a
              href="https://www.marinsoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              Marin Software
            </a>
            , moved into account management and customer success at Control4
            after they acquired{" "}
            <a
              href="https://www.control4.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              Ihiji
            </a>
            , and eventually found my way into product at OneVision. Each step
            taught me something different about how teams, customers, and
            software actually work together.
          </p>

          <p>
            That cross-functional background shapes how I think about building
            things. I&apos;ve sat in the support queue, managed the accounts,
            and analyzed the data, so when I&apos;m designing products, I care
            about the full system, not just the feature list. Quality is the
            thread that runs through everything I do. Thoughtful defaults, the
            right materials, clear feedback, reducing cognitive load.
          </p>

          <p>
            I studied business at{" "}
            <a
              href="https://www.depts.ttu.edu/rawlsbusiness/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-heading"
            >
              Texas Tech University
            </a>{" "}
            with a focus on entrepreneurship and technology commercialization.
          </p>

          <p>
            Away from the screen, I&apos;m a skier, a backpacker, and an
            ultralight pack maker who obsesses over materials and construction.
            I&apos;m also a pitmaster and home cook. Food is how I explore the
            world. Every cuisine has something to teach you, and sharing a
            table is one of the simplest ways to connect people across
            cultures.
          </p>

          <p>
            Two books that shaped how I think:{" "}
            <em>Zen and the Art of Motorcycle Maintenance</em> on the pursuit
            of quality as a way of life, and{" "}
            <em>Reinventing the Bazaar</em> on how markets actually work. Both
            changed how I see building things.
          </p>

          <p className="text-muted">
            This site is my corner of the internet. A place to share what
            I&apos;m learning, what I&apos;m building, and what I&apos;m
            cooking up next.
          </p>
        </div>
      </AnimateIn>
    </article>
  );
}
