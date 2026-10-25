import { socialMetadata } from "@/lib/metadata";
import { documents, settings } from "@/lib/cms";
import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";
import { ProjectCard } from "@/components/project-card";

export async function generateMetadata(): Promise<Metadata> {
  const [[c], site] = await Promise.all([documents<{title:string;description:string}>("projects", true), settings()]);
  return {
    title: c.title,
    description: c.description,
    ...socialMetadata({ title: c.title, description: c.description, path: "/projects", site }),
  };
}


export default async function ProjectsPage() {
 const [content] = await documents<{title:string;items:{title:string;description:string;role:string;href?:string}[]}>("projects", true);
 const projects = content.items;
  return (
    <article>
      <h1 className="sr-only">{content.title}</h1>
      <AnimateIn>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </AnimateIn>
    </article>
  );
}
