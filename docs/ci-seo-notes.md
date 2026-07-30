# CI, SEO, and navigation notes

## CI pipeline

- **`ci.yml`** — runs on pull requests and pushes to `main`: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`.
- **`deploy.yml`** — same quality gates before uploading the GitHub Pages artifact; deploy job depends on `test` passing.

Useful scripts:

| Script | Purpose |
|--------|---------|
| `npm test` | Vitest unit tests |
| `npm run lint` | ESLint via Next.js |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Static export build |

## SEO

- Root layout sets `metadataBase`, default Open Graph/Twitter images, Person + WebSite JSON-LD.
- Home and project pages use canonical URLs and page-specific metadata.
- Shuchu marketing pages (`/shuchu/*`) include Open Graph images and are listed in `app/sitemap.ts`.
- `lib/seo.ts` exports `buildDefaultOpenGraph`, `buildDefaultTwitter`, and `SHUCHU_ROUTES` for reuse.

## Navbar scroll-spy

- `lib/scrollToSection.ts` pauses scroll-spy for ~800ms during programmatic scroll and dispatches `section-navigate` so the active pill stays on the clicked tab.
- Footer hash links use `SectionHashLink` for consistent scroll behavior.

## Mobile carousels

- `.carousel-track-centered` + `.carousel-card-centered` in `globals.css` center cards in the viewport on screens `< 640px` using `scroll-snap-align: center` and symmetric `scroll-padding-inline`.
- Featured Projects and Currently Building set `--carousel-card-width` per section.
