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
        description: "How the best product people actually think about their craft.",
        href: "https://www.lennysnewsletter.com/podcast",
        image: "/images/podcasts/lennys-podcast.jpg",
      },
      {
        title: "In Depth",
        hosts: "First Round Capital",
        description: "The tactical stuff nobody writes down about scaling teams and companies.",
        href: "https://review.firstround.com/podcast/",
        image: "/images/podcasts/in-depth.jpg",
      },
      {
        title: "Unsolicited Feedback",
        hosts: "Balfour & Mosavat",
        description: "Real product teardowns, no fluff. What shipped, what worked, what didn't.",
        href: "https://www.reforge.com/podcast/unsolicited-feedback",
        image: "/images/podcasts/unsolicited-feedback.jpg",
      },
      {
        title: "Crucible Moments",
        hosts: "Sequoia Capital",
        description: "The single decision that changed everything for companies like Dropbox and DoorDash.",
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
        description: "The definitive histories behind the greatest companies ever built.",
        href: "https://www.acquired.fm/",
        image: "/images/podcasts/acquired.jpg",
      },
      {
        title: "Stratechery",
        hosts: "Ben Thompson",
        description: "Understanding power, distribution, and strategy in tech.",
        href: "https://stratechery.com/category/podcasts/",
        image: "/images/podcasts/stratechery.jpg",
      },
      {
        title: "BG2",
        hosts: "Bill Gurley & Brad Gerstner",
        description: "Two of the sharpest investors alive, thinking out loud about markets.",
        href: "https://www.bg2pod.com/",
        image: "/images/podcasts/bg2.jpg",
      },
      {
        title: "a16z",
        hosts: "Andreessen Horowitz",
        description: "Where software is going and what it means for everything else.",
        href: "https://a16z.com/podcasts/",
        image: "/images/podcasts/a16z.jpg",
      },
      {
        title: "Dwarkesh Podcast",
        hosts: "Dwarkesh Patel",
        description: "Deep, patient conversations with people who've thought harder than you about hard things.",
        href: "https://www.dwarkesh.com/podcast",
        image: "/images/podcasts/dwarkesh.jpg",
      },
      {
        title: "Get the Check",
        hosts: "Mirza, Shah & Kamdar",
        description: "Tech through the lens of people actually living in it right now.",
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
        description: "How builders are actually using AI today, not how pundits think they should.",
        href: "https://every.to/podcast",
        image: "/images/podcasts/ai-and-i.jpg",
      },
      {
        title: "How I AI",
        hosts: "Claire Vo",
        description: "Specific workflows you can steal. No theory, just practice.",
        href: "https://podcasts.apple.com/us/podcast/how-i-ai/id1809663079",
        image: "/images/podcasts/how-i-ai.jpg",
      },
      {
        title: "Unsupervised Learning",
        hosts: "Redpoint Ventures",
        description: "Separating what's real in AI from what's noise.",
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
        description: "Leadership lessons from people who've competed at the highest level.",
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
