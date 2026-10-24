# Sanity migration draft

Source: main 5136c123e85f615d6aa3bfda9f2fa0a9029a95ca, including merged PR 1. This is a review draft, not a production cutover.

## Inventory

- `/`: professional bio with OneVision link, personal bio, quotation and attribution. No separate about route.
- `/projects`: ProVision, Whilst, Ultralight Packs, including roles, descriptions and links.
- `/learnings`: 14 podcasts and four books. The older context document describes products, but current main has none.
- `/writing/hello-world`: listed essay.
- `/writing/small-industries-deserve-great-software`: full essay, public unlisted and noindex.
- Settings: name, title, description, URL, locale, email, social links, navigation; writing labels and page SEO.
- Remaining editorial wiring: Person JSON-LD biographical fields, feed/sitemap/post metadata constants, and fixed UI labels. These still use code and require follow-up before considering the all-content migration complete.

## Behavior

`/studio` embeds Studio with fixed singleton editor navigation and writing documents. No page-builder model. Existing layout/style components remain. Local fixtures are used only when no project ID is configured. A configured backend failure does not silently fall back to fixtures.

Published reads exclude Sanity drafts. Unlisted posts remain accessible directly and excluded from index/feed/sitemap. Slugs resolve dynamically. Preview uses POST `/api/preview` with a server-configured bearer secret, enabling an HttpOnly Next Draft Mode cookie. DELETE disables it. Read tokens stay in the server-only module. Initial preview is intentionally a manual authenticated request, without Presentation/browser tokens. Draft post pages are noindex.

## Offline import preparation

`sanity/source-inventory.json` preserves original sources. `scripts/export-content.mjs` is the historical extractor and should only run against the source commit, before rewiring. `sanity/fixtures.json` and `sanity/import.ndjson` contain six seeded documents. `node scripts/fixtures.mjs` regenerates Markdown conversions, retaining the curated home fixture. It fails for unsupported Markdown nodes. No external import has run. Review IDs and content before any approved import; do not overwrite an existing dataset indiscriminately.

## Approval and setup needed

1. Select or approve creation of a Sanity project and dataset, and public/private visibility.
2. Approve a least-privilege server read token and separate strong preview secret. Configure only server-side secrets. Public project ID/dataset are not secrets.
3. Approve external import of reviewed NDJSON and any required Studio origin/CORS setup.
4. Verify draft, unlisted and listed behavior against the real dataset, including newly published slugs, edits, deletes, feed and sitemap. Verify unauthenticated requests never reveal drafts.
5. Resolve dependency audit findings and the installed Portable Text editor React peer mismatch before cutover. Install reported 23 findings (14 moderate, 8 high, 1 critical). A subsequent audit was blocked by sandbox DNS, so attribution/remediation remains outstanding.
6. Review visual fidelity in a browser. Article rendering currently uses Portable Text prose styles and needs comparison against the previous MDX renderer.
7. Obtain explicit production cutover approval. Do not merge/deploy as part of this draft.

No account, dataset, token, CORS or Vercel protection changes were made. Existing Vercel SSO must remain unchanged.

## Verification

`npm run lint`, `npx tsc --noEmit`, `npm run build`, `node tests/content.mjs`. Fixture assertions compare the complete essay plain text with source Markdown and check visibility and counts. These are offline fixture checks, not connected Sanity end-to-end tests. No browser visual comparison or real authentication/publishing test has occurred.

Official references consulted: https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router and https://www.sanity.io/docs/studio/portable-text-editor-configuration.
