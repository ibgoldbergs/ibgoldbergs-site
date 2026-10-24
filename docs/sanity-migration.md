# Sanity editorial migration

Source: main 5136c123e85f615d6aa3bfda9f2fa0a9029a95ca, including merged PR 1. Sanity project `xa3wrva2`, public `production` dataset. Production cutover authorized after connected verification.

## Inventory

- `/`: professional bio with OneVision link, personal bio, quotation and attribution. No separate about route.
- `/projects`: ProVision, Whilst, Ultralight Packs, including roles, descriptions and links.
- `/learnings`: 14 podcasts and four books. The older context document describes products, but current main has none.
- `/writing/hello-world`: listed essay.
- `/writing/small-industries-deserve-great-software`: full essay, public unlisted and noindex.
- Settings: name, title, description, URL, locale, email, social links, navigation; writing labels and page SEO.
- Person JSON-LD biography, feed/sitemap/robots/post metadata, image alt text, Home/back navigation labels are also wired to Settings. Interface mechanics and visual styles stay in code.

## Behavior

`/studio` embeds Studio with fixed singleton editor navigation and writing documents. No page-builder model. Existing layout/style components remain. Local fixtures are used only when no project ID is configured. A configured backend failure does not silently fall back to fixtures.

Published reads exclude Sanity drafts. Unlisted posts remain accessible directly and excluded from index/feed/sitemap. Slugs resolve dynamically. Preview uses POST `/api/preview` with a server-configured bearer secret, enabling an HttpOnly Next Draft Mode cookie. DELETE disables it. Read tokens stay in the server-only module. Initial preview is intentionally a manual authenticated request, without Presentation/browser tokens. Draft post pages are noindex.

## Offline import preparation

`sanity/source-inventory.json` preserves original sources. `scripts/export-content.mjs` is the historical extractor and should only run against the source commit, before rewiring. `sanity/fixtures.json` and `sanity/import.ndjson` contain six seeded documents. `node scripts/fixtures.mjs` regenerates Markdown conversions, retaining the curated home fixture. It fails for unsupported Markdown nodes. The six documents were imported into the verified empty dataset on 2026-10-24 using create-only mutations. Complete fields were compared back to fixtures, including the full unlisted essay. Array objects carry explicit `_type` values for Studio editing.

## Connected setup

The project belongs to the approved personal Google account. Sanity automatically assigned a $0 trial that downgrades to Free; no paid plan was selected. Published unlisted content is API-queryable; unlisted is not confidential. Unpublished drafts require authentication.

Vercel Production contains public project/dataset identifiers and secret server-only `SANITY_API_READ_TOKEN` (Viewer) and `SANITY_PREVIEW_SECRET`. No Preview/Development environment credentials were added. Credentialed CORS is restricted to `https://www.ibgoldbergs.com` plus temporary `http://127.0.0.1:3100` for QA. Sanity's preexisting localhost:3333 default was not changed. Temporary Editor import access and local QA files/origin must be removed after verification. Existing Vercel SSO is unchanged.

## Dependencies and visual verification

5. React/React DOM 19.3.1 resolves the Studio editor peer mismatch. Next/eslint-config-next updated within major 16 to 16.4.3 for security fixes. Compatible audit fixes plus scoped js-yaml 3.15.2 and smol-toml 1.9.1 overrides reduce 23 findings to 9 moderate (zero high or critical), no critical. A scoped override to undici 7.30.1 fixes the CLI-pinned vulnerable 7.29.1. Earlier assessment that no patched 7.x exists was incorrect. Remaining moderate roots: uuid 10 through typeid-js (Sanity CLI), and existing Tailwind typography selector parser. The other moderate entries are dependency-chain aggregation. These tools are not invoked by site request handlers. No forced major dependency downgrade/upgrade was applied; retain as build-tooling risk pending upstream patches.
6. Desktop Chrome comparisons completed for homepage, Projects, Learnings, Writing and both essays. RichText uses the exact previous MDX typography classes. Mobile-width essay and menu checked. Comparison found a timezone date regression; now formatting explicitly uses UTC.
7. Cutover is authorized only after connected content, draft isolation, publishing and Studio verification. Preserve existing Vercel SSO protection.



## Verification

`npm run lint`, `npx tsc --noEmit`, `npm run build`, `node tests/content.mjs`. Fixture assertions compare the complete essay plain text with source Markdown and check visibility and counts. These are offline fixture checks, not connected Sanity end-to-end tests. Browser comparisons were performed against production with local fixture data. `node tests/http.mjs` checks routes, discovery exclusion, noindex, 404 and unauthorized preview rejection; `node tests/preview.mjs` starts a temporary local server with an ephemeral secret to check authorized HttpOnly cookie, noindex, exit and secret absence from HTML/client chunks. Connected QA now also passes: all six documents match; anonymous draft URL returns 404; authenticated server-only preview reads actual draft text with HttpOnly cookie/noindex; discovery excludes drafts/unlisted; a newly published unlisted slug resolves without rebuilding; temporary QA documents are deleted. Studio Google sign-in and imported content editing views were verified. `tests/connected.mjs` requires explicit opt-in and a protected temporary Editor-token file; it is a mutation test against the named project, not a routine CI test.

Official references consulted: https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router and https://www.sanity.io/docs/studio/portable-text-editor-configuration.

Studio edit verification: a disposable unlisted draft was edited through Chrome and its saved title read back through the API. The browser Publish click was rejected by automatic approval review; it was not executed or retried. API publication of a temporary unlisted document passed separately. Test documents were removed. The homepage document preview title is explicitly Ian Goldberg; personal biography stays in body copy.
