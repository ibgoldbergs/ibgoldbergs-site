import type { Metadata } from "next";
import { socialMetadata } from "@/lib/metadata";
import { documents, settings } from "@/lib/cms";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
type HomeContent={bio:PortableTextBlock[];personal:string;quote:string;attribution:string};
import { AnimateIn } from "@/components/animate-in";
import { PersonJsonLd } from "@/components/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const site = await settings();
  return socialMetadata({ title: site.title, description: site.description, path: "/", site });
}

export default async function Home() {
  const [[home], site] = await Promise.all([documents<HomeContent>("home", true), settings()]);
  return (
    <article>
      <h1 className="sr-only">{site.name}</h1>
      <PersonJsonLd />
      <AnimateIn>
        <div className="space-y-6 leading-relaxed text-foreground">
          <PortableText value={home.bio} components={{marks:{link:({value,children})=><a href={value.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-heading">{children}</a>}}} />
          <p className="text-muted">{home.personal}</p>
          <p className="text-dim text-sm">{home.quote}{" "}<span className="not-italic">{home.attribution}</span></p>
        </div>
      </AnimateIn>
    </article>
  );
}
