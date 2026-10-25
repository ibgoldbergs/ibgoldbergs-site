import { SITE } from "@/lib/constants";

export function GET() {
  const guide = `# Ian Goldberg

> Ian Goldberg's personal website, with projects, learnings, and writing.

## Public content

- [Homepage](${SITE.url}/): Introduction to Ian Goldberg.
- [Projects](${SITE.url}/projects): Projects and their descriptions.
- [Learnings](${SITE.url}/learnings): Podcasts, reading, and products.
- [Writing](${SITE.url}/writing): Public writing index.
- [RSS](${SITE.url}/feed.xml): Feed of publicly listed writing.
`;

  return new Response(guide, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
