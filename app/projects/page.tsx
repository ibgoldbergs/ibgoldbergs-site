import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and work by Ian Goldberg.",
};

const projects = [
  {
    title: "ProVision",
    description:
      "The platform that helps smart home integrators manage service operations, sell recurring memberships, and turn support into a thriving business. Includes a service CRM, on-call management, subscription billing, and a conversational support tool built for the custom integration industry.",
    role: "Senior Product Manager at OneVision Resources",
    href: "https://www.onevisionresources.com/post/onevision-introduces-provision",
  },
  {
    title: "Whilst",
    description:
      "An AI-native knowledge platform where your team's knowledge lives, learns, and evolves. Connects to tools like GitHub, Linear, and Notion to surface answers with source citations.",
    role: "Founder",
    href: "https://app.whilst.io",
  },
  {
    title: "Ultralight Packs",
    description:
      "Handmade ultralight backpacks sewn from premium materials like DCF, X-Pac, and UHMWPE. Every stitch, seam, and gram is intentional. Carrying less to experience more.",
    role: "Maker",
  },
];

export default function ProjectsPage() {
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
