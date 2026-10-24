# Sanity migration draft

Source: main 5136c123e85f615d6aa3bfda9f2fa0a9029a95ca, including merged PR 1. Draft implementation. Merge/cutover is now authorized after real Sanity setup and connected verification. Do not merge while fixture-backed.

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

`sanity/source-inventory.json` preserves original sources. `scripts/export-content.mjs` is the historical extractor and should only run against the source commit, before rewiring. `sanity/fixtures.json` and `sanity/import.ndjson` contain six seeded documents. `node scripts/fixtures.mjs` regenerates Markdown conversions, retaining the curated home fixture. It fails for unsupported Markdown nodes. No external import has run. Review IDs and content before any approved import; do not overwrite an existing dataset indiscriminately.

## Approval and setup needed

1. Authorized target: new `ibgoldbergs-site` project on Free in the existing personal account; public `production` dataset. Project creation is blocked by sign-in: Chrome Manage redirects to login, CLI project listing fails. No project or dataset was created. A public dataset makes published unlisted content API-queryable; unlisted is not confidential. Drafts remain authenticated-only.
2. Approve a least-privilege server read token and separate strong preview secret. Configure only server-side secrets. Public project ID/dataset are not secrets.
3. Content import is authorized after project selection/creation. Credential-enabled CORS still needs approval for `https://ibgoldbergs.com` and local development (`http://localhost:3000`, or the actual loopback QA origin if used). Approve a fixed preview deployment origin only if needed, never wildcard credentialed origins. Import the six deterministic document IDs only into the new empty dataset, after listing existing IDs to prevent overwrites.
4. Verify draft, unlisted and listed behavior against the real dataset, including newly published slugs, edits, deletes, feed and sitemap. Verify unauthenticated requests never reveal drafts.
5. React/React DOM 19.3.1 resolves the Studio editor peer mismatch. Next/eslint-config-next updated within major 16 to 16.4.3 for security fixes. Compatible audit fixes plus scoped js-yaml 3.15.2 and smol-toml 1.9.1 overrides reduce 23 findings to 13 (12 moderate, one high), no critical. Remaining high is undici 7 through module-federation in Sanity workbench CLI; no patched 7.x is published. Remaining moderate roots: uuid 10 through typeid-js (Sanity CLI), and existing Tailwind typography selector parser. The other moderate entries are dependency-chain aggregation. These tools are not invoked by site request handlers. No forced major dependency downgrade/upgrade was applied; retain as build-tooling risk pending upstream patches.
6. Desktop Chrome comparisons completed for homepage, Projects, Learnings, Writing and both essays. RichText uses the exact previous MDX typography classes. Mobile-width essay and menu checked. Comparison found a timezone date regression; now formatting explicitly uses UTC.
7. Cutover is authorized only after connected content, draft isolation, publishing and Studio verification. Preserve existing Vercel SSO protection.

No account, dataset, token, CORS or Vercel protection changes were made. Existing Vercel SSO must remain unchanged.

## Verification

`npm run lint`, `npx tsc --noEmit`, `npm run build`, `node tests/content.mjs`. Fixture assertions compare the complete essay plain text with source Markdown and check visibility and counts. These are offline fixture checks, not connected Sanity end-to-end tests. Browser comparisons were performed against production with local fixture data. `node tests/http.mjs` checks routes, discovery exclusion, noindex, 404 and unauthorized preview rejection; `node tests/preview.mjs` starts a temporary local server with an ephemeral secret to check authorized HttpOnly cookie, noindex, exit and secret absence from HTML/client chunks. Real Sanity authentication/publishing and live cutover remain blocked by setup.

Official references consulted: https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router and https://www.sanity.io/docs/studio/portable-text-editor-configuration.
