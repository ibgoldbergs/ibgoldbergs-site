export const SITE = {
  name: "Ian Goldberg",
  title: "Ian Goldberg",
  description:
    "Ian Goldberg — product builder in Asheville, NC. Senior PM at OneVision Resources. Writing about product, technology, and building things.",
  url: "https://ibgoldbergs.com",
  locale: "en_US",
  email: "hello@ibgoldbergs.com",
} as const;

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/ian-goldberg-99073350/",
  twitter: "https://x.com/ibgoldbergs",
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Learnings", href: "/learnings" },
  { label: "Writing", href: "/writing" },
] as const;
