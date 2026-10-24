import { documents } from "@/lib/cms";
import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";
import { ProjectCard } from "@/components/project-card";

export async function generateMetadata():Promise<Metadata>{const [c]=await documents<{title:string;description:string}>("projects",true);return {title:c.title,description:c.description};}


export default async function ProjectsPage() {
 const [content] = await documents<{items:{title:string;description:string;role:string;href?:string}[]}>("projects", true);
 const projects = content.items;
  return (
    <article>
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
