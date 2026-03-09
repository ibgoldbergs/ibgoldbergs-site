import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";
import { PodcastCard } from "@/components/podcast-card";

export const metadata: Metadata = {
  title: "Podcasts",
  description:
    "Podcast recommendations from Ian Goldberg. The shows I keep coming back to.",
};

const sections = [
  {
    title: "Product & Building",
    podcasts: [
      {
        title: "Lenny's Podcast",
        hosts: "Lenny Rachitsky",
        href: "https://www.lennysnewsletter.com/podcast",
        image: "/images/podcasts/lennys-podcast.jpg",
      },
      {
        title: "In Depth",
        hosts: "First Round Capital",
        href: "https://review.firstround.com/podcast/",
        image: "/images/podcasts/in-depth.jpg",
      },
      {
        title: "Unsolicited Feedback",
        hosts: "Balfour & Mosavat",
        href: "https://www.reforge.com/podcast/unsolicited-feedback",
        image: "/images/podcasts/unsolicited-feedback.jpg",
      },
      {
        title: "Crucible Moments",
        hosts: "Sequoia Capital",
        href: "https://www.cruciblemoments.com/",
        image: "/images/podcasts/crucible-moments.jpg",
      },
    ],
  },
  {
    title: "Tech & Business",
    podcasts: [
      {
        title: "Acquired",
        hosts: "Ben Gilbert & David Rosenthal",
        href: "https://www.acquired.fm/",
        image: "/images/podcasts/acquired.jpg",
      },
      {
        title: "Stratechery",
        hosts: "Ben Thompson",
        href: "https://stratechery.com/category/podcasts/",
        image: "/images/podcasts/stratechery.jpg",
      },
      {
        title: "BG2",
        hosts: "Bill Gurley & Brad Gerstner",
        href: "https://www.bg2pod.com/",
        image: "/images/podcasts/bg2.jpg",
      },
      {
        title: "a16z",
        hosts: "Andreessen Horowitz",
        href: "https://a16z.com/podcasts/",
        image: "/images/podcasts/a16z.jpg",
      },
      {
        title: "Dwarkesh Podcast",
        hosts: "Dwarkesh Patel",
        href: "https://www.dwarkesh.com/podcast",
        image: "/images/podcasts/dwarkesh.jpg",
      },
      {
        title: "Get the Check",
        hosts: "Mirza, Shah & Kamdar",
        href: "https://www.getthecheckpod.com/",
        image: "/images/podcasts/get-the-check.jpg",
      },
    ],
  },
  {
    title: "AI",
    podcasts: [
      {
        title: "AI & I",
        hosts: "Dan Shipper / Every",
        href: "https://every.to/podcast",
        image: "/images/podcasts/ai-and-i.jpg",
      },
      {
        title: "How I AI",
        hosts: "Claire Vo",
        href: "https://podcasts.apple.com/us/podcast/how-i-ai/id1809663079",
        image: "/images/podcasts/how-i-ai.jpg",
      },
      {
        title: "Unsupervised Learning",
        hosts: "Redpoint Ventures",
        href: "https://www.redpoint.com/content-hub/unsupervised-learning/",
        image: "/images/podcasts/unsupervised-learning.jpg",
      },
    ],
  },
  {
    title: "Sports & Culture",
    podcasts: [
      {
        title: "Glue Guys",
        hosts: "Battier, Smith & Gupta",
        href: "https://joincolossus.com/series/glue-guys/",
        image: "/images/podcasts/glue-guys.jpg",
      },
    ],
  },
];

export default function PodcastsPage() {
  return (
    <article>
      <AnimateIn>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">
          Podcasts
        </h1>
        <p className="mt-2 text-muted">
          Shows I keep coming back to.
        </p>
      </AnimateIn>

      {sections.map((section, i) => (
        <AnimateIn key={section.title} delay={0.1 * (i + 1)}>
          <div className="mt-10">
            <h2 className="text-sm font-medium text-heading">
              {section.title}
            </h2>
            <div className="mt-3 flex flex-col">
              {section.podcasts.map((podcast) => (
                <PodcastCard key={podcast.title} {...podcast} />
              ))}
            </div>
          </div>
        </AnimateIn>
      ))}
    </article>
  );
}
