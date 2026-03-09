export const SITE = {
  name: "Ian Goldberg",
  title: "Ian Goldberg",
  description:
    "Personal website of Ian Goldberg. Product management, writing, and projects.",
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
  { label: "Writing", href: "/writing" },
] as const;
