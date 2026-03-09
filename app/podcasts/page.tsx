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
        description:
          "The best interviews with world-class product leaders and growth experts. Concrete, actionable advice.",
        href: "https://www.lennysnewsletter.com/podcast",
        image: "/images/podcasts/lennys-podcast.jpg",
      },
      {
        title: "In Depth",
        hosts: "Brett Berson / First Round Capital",
        description:
          "Deeply tactical advice for founders and startup leaders on hiring, culture, and scaling.",
        href: "https://review.firstround.com/podcast/",
        image: "/images/podcasts/in-depth.jpg",
      },
      {
        title: "Unsolicited Feedback",
        hosts: "Brian Balfour & Fareed Mosavat",
        description:
          "Unfiltered product and growth analysis on real products and recent launches. From the Reforge team.",
        href: "https://www.reforge.com/podcast/unsolicited-feedback",
        image: "/images/podcasts/unsolicited-feedback.jpg",
      },
      {
        title: "Crucible Moments",
        hosts: "Roelof Botha / Sequoia Capital",
        description:
          "The pivotal decisions that shaped companies like Dropbox, DoorDash, and Reddit. Told by the founders who made them.",
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
        description:
          "Deep-dive histories of the greatest companies ever built. Each episode is a masterclass.",
        href: "https://www.acquired.fm/",
        image: "/images/podcasts/acquired.jpg",
      },
      {
        title: "Stratechery",
        hosts: "Ben Thompson & Andrew Sharp",
        description:
          "Sharp analysis on how technology is changing the world. The sharpest thinking in tech strategy.",
        href: "https://stratechery.com/category/podcasts/",
        image: "/images/podcasts/stratechery.jpg",
      },
      {
        title: "BG2",
        hosts: "Bill Gurley & Brad Gerstner",
        description:
          "Two legendary investors in open conversation about tech, markets, and capitalism.",
        href: "https://www.bg2pod.com/",
        image: "/images/podcasts/bg2.jpg",
      },
      {
        title: "a16z",
        hosts: "Andreessen Horowitz",
        description:
          "Tech and culture trends from the a16z network. Wide-ranging conversations on where software is going.",
        href: "https://a16z.com/podcasts/",
        image: "/images/podcasts/a16z.jpg",
      },
      {
        title: "Dwarkesh Podcast",
        hosts: "Dwarkesh Patel",
        description:
          "Long-form, deeply researched interviews with scientists, technologists, and historians.",
        href: "https://www.dwarkesh.com/podcast",
        image: "/images/podcasts/dwarkesh.jpg",
      },
      {
        title: "Get the Check",
        hosts: "Anika Mirza, Maya Shah & Priya Kamdar",
        description:
          "Three friends in SF break down trending tech news and emerging companies in a relatable way.",
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
        description:
          "Practical conversations about how founders and creators actually use AI tools, with live demos.",
        href: "https://every.to/podcast",
        image: "/images/podcasts/ai-and-i.jpg",
      },
      {
        title: "How I AI",
        hosts: "Claire Vo",
        description:
          "30-minute episodes on specific, practical ways people use AI at work. Tips and workflows you can copy.",
        href: "https://podcasts.apple.com/us/podcast/how-i-ai/id1809663079",
        image: "/images/podcasts/how-i-ai.jpg",
      },
      {
        title: "Unsupervised Learning",
        hosts: "Jacob Effron / Redpoint Ventures",
        description:
          "The sharpest minds in AI break down what is real today and what will be real tomorrow.",
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
        hosts: "Shane Battier, Alex Smith & Ravi Gupta",
        description:
          "A 2x NBA champion, 16-year NFL vet, and a Sequoia partner explore leadership across sports and business.",
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
            <div className="mt-4 flex flex-col gap-3">
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
