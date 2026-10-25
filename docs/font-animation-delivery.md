# Font and animation delivery audit

Baseline: c110c8d (PR #9). No content, CMS, discovery, menu, dependency or security configuration changes.

## Font decision

Four unchanged WOFF2 files total **310,700 bytes**: normal 400 = 74,088; italic 400 = 83,536; normal 500 = 76,708; normal 600 = 76,368. FontTools inspection found 1,425 mapped characters per normal face and 1,426 in italic, including extended Latin and symbols. All glyphs and OpenType features are retained. No subset regeneration or synthetic replacement is necessary.

Computed browser styles on both current production and the new build show system sans-serif for body text, the 500-weight navigation/project headings, and 600-weight article headings. Maple Mono 400 is used by `font-mono` dates/code. This differs from the old documentation's description of the body font. Changing the font cascade would change the site's appearance and is outside this optimization.

Disable next/font's all-face preloads. The browser now chooses the minimum rendered set: no custom font on home/projects/learnings, one regular face on writing pages. All other faces remain available on demand for future styled content, including italic rich text. Retaining the original coverage avoids breaking future CMS text. CSS remains render-blocking and uses font-display: swap; regular fonts are discovered through rendered CSS instead of a preload.

## Animation decision

`AnimateIn` is now a server component. Its HTML has no opacity-zero state. A CSS-only 20px, 400ms entrance retains the existing easing and stagger, with no opacity animation; delayed content remains readable. The rule applies only for `prefers-reduced-motion: no-preference`. Reduced-motion users get no entrance animation. The native dialog navigation and its focus behavior are untouched. Motion remains in package metadata, but this public-page import and client boundary are gone; dependency cleanup is outside scope.

## Measurements

Chrome production-build browser Resource Timing, homepage with a fresh context, desktop, normal motion:

| Resource | Baseline | Optimized local build |
| --- | ---: | ---: |
| Font encoded body bytes | 310,700 | 0 |
| Font transfer bytes (including reported overhead) | 311,900 | 0 |
| JS decoded body bytes | 592,848 | 475,227 |
| JS encoded body bytes | 184,315 | 144,905 |
| JS transfer bytes | 187,615 | 147,305 |

Local JS: 117,621 fewer decoded bytes (19.8%); 39,410 fewer encoded bytes (21.4%). These are browser-observed local-server responses, not a forecast of Vercel compression. Font assets on disk remain 310,700 bytes. Real production baseline homepage: fonts 311,900 transfer bytes; JS 597,086 decoded / 188,709 encoded / 191,709 transfer bytes. Production after-merge results are reported in the task result. Requests to third-party analytics without timing permission may report zero; these are not whole-page transfer or Web Vitals claims. Subsequent routes in the same context use browser cache and must not be described as cold transfers.

## Verification

- `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.
- `node --import tsx --test tests/*.test.mjs`: 6 pass, the same 3 obsolete MDX tests fail on baseline and optimized code. They assume synchronous filesystem-backed posts; current CMS loading is asynchronous. Their asynchronous rejection warnings also predate this change.
- `node tests/content.mjs` and production-server `tests/http.mjs` pass, including held essay noindex and listing/feed/sitemap exclusion.
- New `tests/delivery.browser.mjs`: five public routes × desktop/mobile × JavaScript on/off × reduced motion on/off (40 combinations), asserts visible content, no overflow, demand-only fonts, and delayed entrance visibility. Captures actual resource sizes and screenshots.
- Existing `tests/accessibility.browser.mjs` passes all menu trapping, inert background, Escape, focus return, same-route, back/forward, breakpoint, desktop keyboard, and 320px checks.
- All 10 desktop/mobile reduced-motion page screenshots are byte-for-byte identical before/after; homepage desktop and projects mobile were also visually inspected.
- No `.agents` directory exists in this repository; root AGENTS.md and project context were read.

Browser commands accept `PLAYWRIGHT_MODULE`, `QA_BASE`, and `QA_OUTPUT`. Playwright remains external to app dependencies. A fresh npm install ran out of disk space; its incomplete files were removed, and the prior task's installed dependencies were reused only after confirming package-lock.json is identical.
