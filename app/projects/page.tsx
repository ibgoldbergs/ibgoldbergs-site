import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and work by Ian Goldberg.",
};

const projects = [
  {
    title: "OneVision Resources",
    description:
      "Leading product development for resource management and operational tooling. Building systems that help teams allocate, track, and optimize their most valuable resources.",
    role: "Senior Product Manager",
    href: "https://onevisionresources.com",
  },
  {
    title: "ibgoldbergs.com",
    description:
      "This personal website. Built with Next.js, Tailwind CSS, and deployed on Vercel. Minimalist dark design inspired by paco.me.",
    role: "Design & Development",
    href: "https://ibgoldbergs.com",
  },
];

export default function ProjectsPage() {
  return (
    <article>
      <AnimateIn>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">
          Projects
        </h1>
        <p className="mt-2 text-muted">
          Work I&apos;ve shipped and things I&apos;ve built.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <div className="mt-8 flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </AnimateIn>
    </article>
  );
}
