# Sanity read optimization

Baseline: main `ce5515b951656266ccfeedd95401481b5498c1b6` (PR 10).

## Freshness and privacy

Public Sanity reads deliberately keep `useCdn: false`, `perspective: published`, no token, and `cache: no-store`. No shared persistent cache, ISR, new webhook, credential, service, or security setting is introduced. Visibility withdrawals therefore take effect on the next server request. RSS continues to return `Cache-Control: no-store`. Request-local React `cache` only deduplicates identical primitive query/type/slug/preview arguments during a server render. Route handlers do not rely on React memoization.

Preview requires the existing authenticated HttpOnly Draft Mode cookie and server read token, stays server-only/no-store, and has a separate cache key. Public discovery never opts into preview. Unlisted content, including `small-industries-deserve-great-software`, is excluded by GROQ from listing, RSS and sitemap but still resolves directly with noindex. Native drafts stay excluded by the published perspective; the legacy draft flag remains excluded too. No CMS documents were written or published.

Post details query one slug, sharing that read between page and metadata. Removing build-time post enumeration keeps new slugs dynamic and avoids a redundant build-time read. Listings fetch title/date/description/slug, sitemap fetches slug/date/update time, and RSS fetches those display fields plus `pt::text(body)` to preserve its existing full plain-text content without Portable Text markup. Singleton sitemap reads project only `_updatedAt`. Settings reads share the same primitive query key across layout, metadata, navigation/footer consumers and writing labels. Other singleton documents also deduplicate repeated reads.

The existing GROQ evaluator is now an explicit pinned dependency, dynamically loaded only for offline fixtures; this ensures fixtures use the same projections and filters as the live API.

## Reproducible measurements

Run `node scripts/measure-cms.mjs`. Results from the committed six-document fixture are UTF-8 JSON result bytes, excluding envelopes, compression and network overhead:

| Read | Before | After |
| --- | ---: | ---: |
| Writing listing | 10,252 | 170 |
| RSS posts | 10,252 | 1,234 |
| Sitemap posts | 10,252 | 62 |
| Hello World detail | 10,252 | 3,458 |

The script executes the baseline reader from the commit above and the new reader with two settings calls and two post calls. Mocked Sanity transport invocations go from 4 to 2 within one React request cache scope. The unit suite also invokes the actual post page and metadata functions together, verifies two total reads (settings + selected post), then verifies a fresh scope issues two new reads. This uses React's real cache with a test request dispatcher. It is not a claim about measured production HTTP counts or latency; Next fetch memoization may already collapse some baseline network requests.

## Validation

- `node --test tests/*.test.mjs`: all 10 pass. Three obsolete filesystem-MDX tests replaced by CMS scope, visibility, new-slug/withdrawal, preview isolation and request memoization coverage.
- RSS escaping, canonical URLs, withdrawal freshness and sitemap date fallbacks remain covered using actual GROQ evaluation.
- `node tests/content.mjs`, lint, TypeScript and production build pass.
- Local production HTTP and authenticated fixture preview checks verify discovery, held-essay noindex, unknown-slug 404, unauthorized preview rejection, HttpOnly cookie and no secret leakage.
- Existing browser accessibility checks pass at desktop/mobile widths; all 40 delivery configurations pass (JavaScript on/off and reduced motion on/off).
- The mutation-based `tests/connected.mjs` is intentionally not run: this task authorizes no CMS writes. Authenticated live draft changes are modeled in fixtures, not created in production.

A future persistent cache requires proven visibility-safe invalidation for updates, unlisting, deletion, publication, slug changes and settings, including failure handling. The current setup does not establish that contract, so origin freshness is retained.

Official references consulted on 2026-10-25: [Sanity perspectives](https://www.sanity.io/docs/content-lake/perspectives), [Next metadata memoization](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Next caching without Cache Components](https://nextjs.org/docs/app/guides/caching-without-cache-components).
