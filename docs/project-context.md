# ibgoldbergs-site — Project Context

**Last Updated:** 2026-03-09

---

## Tech Stack (with versions)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| React | React + React DOM | 19.2.3 |
| Styling | Tailwind CSS | v4 (CSS-first) |
| Typography | @tailwindcss/typography | 0.5.19 |
| Blog | @next/mdx + @mdx-js/* | 3.1.1 / 16.1.6 |
| Frontmatter | gray-matter | 4.0.3 |
| Reading time | reading-time | 1.5.0 |
| Animation | motion | 12.35.1 |
| Analytics | @vercel/analytics | 1.6.1 |
| Theme | next-themes | 0.4.6 |
| Compiler | React Compiler (babel-plugin) | 1.0.0 |
| Linting | ESLint + eslint-config-next | 9 / 16.1.6 |
| TypeScript | TypeScript | 5.x |
| Package manager | npm | — |

---

## Design System

### Color Tokens (defined in `app/globals.css`)

```
background: #0a0a0a    (near-black)
foreground: #ededed    (light gray text)
surface:    #111111    (card/code backgrounds)
border:     #2e2e2e    (subtle borders)
muted:      #a0a0a0    (secondary text)
heading:    #fafafa    (near-white headings)
dim:        #707070    (tertiary text, icons)
accent:     #3b82f6    (blue, focus rings)
```

### Typography
- **Font:** Maple Mono (variable: `--font-maple-mono`, self-hosted via next/font/local)
- Weights: 400, 400i, 500, 600 (woff2 in `public/fonts/`)
- Letter spacing: -0.01em globally
- Antialiased rendering

### Layout
- Max content width: 640px (`max-w-[640px]`)
- Horizontal padding: 1.5rem (`px-6`)
- Top padding: 4rem mobile, 8rem desktop (`pt-16 sm:pt-32`)
- Content gap: 4rem mobile, 6rem desktop (`mt-16 sm:mt-24`)

---

## Content Model

### Blog Posts (`content/posts/*.mdx`)
- Frontmatter: `title`, `date` (YYYY-MM-DD), `description`
- Parsed by `lib/mdx.ts` using gray-matter + reading-time
- Rendered with @tailwindcss/typography prose styles (dark overrides in globals.css)

### Static Pages
- Homepage (`app/page.tsx`): Short bio, section links (no separate about page)
- Projects (`app/projects/page.tsx`): Static array of projects
- Learnings (`app/learnings/page.tsx`): Podcasts, reading, and products I love

### Learnings Data
- 14 podcasts (flat list with external links)
- 4 books in reading section (title + author)
- 5 products in "Products I Love" section (with external links)

---

## Deployment

- **Hosting:** Vercel
- **Domain:** ibgoldbergs.com
- **Deploy trigger:** Git push to `main` branch
- **Build command:** `next build`
- **Output:** Static + serverless (default Next.js)
- **Analytics:** Vercel Analytics (automatic)

---

## Key Patterns

### Component Pattern
- Named exports: `export function ComponentName()`
- Props typed inline: `type ComponentNameProps = { ... }`
- Tailwind classes directly on elements (no CSS modules)
- Animation via `<AnimateIn>` wrapper component (uses Motion library)

### Page Pattern
- `export const metadata: Metadata = { ... }` for SEO
- `export default function PageName()` for the page component
- Static data as `const` arrays at top of file
- Sections wrapped in `<AnimateIn>` with staggered delays

### Link Pattern
- External links: `target="_blank" rel="noopener noreferrer"`
- Hover arrow (`↗`) shown via group-hover opacity transition
- Internal links: Next.js `<Link>` component
