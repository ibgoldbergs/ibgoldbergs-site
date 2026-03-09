# ibgoldbergs-site — AI Agent Guide

Personal website for Ian Goldberg at [ibgoldbergs.com](https://ibgoldbergs.com).

## Project Structure

```
ibgoldbergs-site/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Geist font, Nav, Footer)
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # About page (career narrative)
│   ├── projects/page.tsx   # Projects (ProVision, Whilst, Ultralight Packs)
│   ├── podcasts/page.tsx   # Podcast recommendations (14 shows, 4 categories)
│   ├── writing/page.tsx    # Blog index
│   ├── feed.xml/route.ts   # RSS feed
│   ├── sitemap.ts          # Sitemap
│   └── globals.css         # Tailwind v4 theme tokens
├── components/             # Shared React components
├── content/posts/          # MDX blog posts (frontmatter: title, date, description)
├── lib/                    # Utilities (constants, MDX helpers)
├── public/images/          # Static images (podcast artwork, etc.)
└── docs/                   # Plans, learnings, and project context
```

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Compiler, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme inline` in globals.css)
- **Blog:** MDX with gray-matter + reading-time
- **Animation:** Motion (framer-motion successor)
- **Fonts:** Geist Sans + Geist Mono (via next/font)
- **Analytics:** Vercel Analytics
- **Deploy:** Vercel (auto-deploy on git push to main)

## Conventions

### Code
- TypeScript strict mode
- `@/` path alias for imports
- Components are named exports (not default)
- Pages use `export default function PageName()`
- Static data lives inline in page files (no separate data files for small datasets)

### Writing & Content
- **No em dashes.** Use commas or periods instead.
- Editorial voice: direct, personal, concise. Not corporate.
- Podcast descriptions capture the "why it matters" theme, not the format.
- Use `&apos;` for apostrophes in JSX, `{" "}` for intentional spaces around inline elements.

### Design
- Dark-only theme (background: #0a0a0a, foreground: #ededed)
- Max width 640px, centered layout
- Minimalist aesthetic: no borders on cards, sparse padding, subtle hover states
- Color tokens defined in `globals.css` under `@theme inline`

## Common Tasks

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
```

**New blog post:** Create `content/posts/my-post.mdx` with frontmatter (title, date, description).

**New podcast:** Add entry to the `sections` array in `app/podcasts/page.tsx`, download artwork to `public/images/podcasts/`.

**Deploy:** Push to main. Vercel auto-deploys.

## Important Files

| File | Purpose |
|------|---------|
| `lib/constants.ts` | Site metadata, social links, nav items |
| `app/globals.css` | All color tokens and theme config |
| `app/layout.tsx` | Root layout, fonts, metadata |
| `components/nav.tsx` | Navigation bar |
| `components/podcast-card.tsx` | Podcast row component |
| `components/project-card.tsx` | Project card component |
| `components/animate-in.tsx` | Scroll animation wrapper |

## Detailed Context

For version numbers, design tokens, content model details, and code patterns, see `docs/project-context.md`.
