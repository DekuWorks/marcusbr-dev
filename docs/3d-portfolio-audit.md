# MarcusBR.dev 3D Portfolio — Phase 1 Audit

**Audit date:** July 29, 2026  
**Repository:** `/Users/marcusbrown/Developer/marcusbr-dev`  
**Live site:** https://marcusbr.dev  
**Upgrade codename:** Marcus OS

---

## Executive Summary

MarcusBR.dev is a **Next.js 16.2.9** portfolio using the **App Router** with **`output: "export"`** for **GitHub Pages** deployment. The site is a polished one-page portfolio with static project detail pages, strong SEO metadata, jade-green branding, and Framer Motion animations. There is **no existing Three.js or WebGL** usage.

**Verdict:** No blockers for adding React Three Fiber. R3F must be **client-only** with **dynamic import (`ssr: false`)** and graceful CSS fallbacks. The static export model is compatible with R3F as long as scenes are not server-rendered.

**Featured projects in data:** Shuchu, DayPilot, Bookmarked, Avryo, Gridlock (5 total). **ForgeOne is not in `lib/projects.ts`** — add only when real data exists.

---

## Current Architecture

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.9 (App Router) |
| React | 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`) |
| Animation | Framer Motion 12.40.0 |
| Icons | Lucide React 1.21.0 |
| Fonts | Geist Sans + Geist Mono (next/font/google) |
| Images | next/image (`unoptimized: true`) |
| Build output | Static export → `./out` |
| Deploy | GitHub Actions → GitHub Pages |
| Domain | `marcusbr.dev` (`public/CNAME`) |

### Next.js Configuration (`next.config.ts`)

```ts
output: "export"
trailingSlash: true
images: { unoptimized: true }
```

**Implications for R3F:**
- No server-side WebGL — all `<Canvas>` components must be Client Components.
- Use `next/dynamic` with `{ ssr: false }` for 3D scenes.
- No API routes or ISR — all data is build-time static.
- `generateStaticParams` already used for `/projects/[slug]`.

### Deployment (`.github/workflows/deploy.yml`)

- Triggers on push to `main`
- Node 20, `npm ci`, `npm run build`, uploads `./out` to GitHub Pages
- Baseline build: **passes** (13 static routes)

### Routes

| Route | Type | Notes |
|-------|------|-------|
| `/` | Static | Main portfolio (one-page) |
| `/projects/[slug]` | SSG | 5 project pages via `generateStaticParams` |
| `/shuchu` | Static | App Store marketing landing |
| `/shuchu/privacy` | Static | Privacy policy |
| `/shuchu/support` | Static | Support page |
| `/_not-found` | Static | 404 |
| `/icon.png` | Static | Favicon |

---

## Existing Dependencies

### Production

| Package | Version | Role |
|---------|---------|------|
| `next` | 16.2.9 | Framework, static export |
| `react` / `react-dom` | 19.2.4 | UI |
| `framer-motion` | ^12.40.0 | Scroll/entrance animations, mobile nav |
| `lucide-react` | ^1.21.0 | Icons |

### Dev

| Package | Version | Role |
|---------|---------|------|
| `tailwindcss` | ^4 | Utility CSS |
| `@tailwindcss/postcss` | ^4 | PostCSS integration |
| `typescript` | ^5 | Type checking |
| `eslint` + `eslint-config-next` | ^9 / 16.2.9 | Linting |
| `sharp` | ^0.35.3 | Image tooling (dev) |

### Not Present

- Three.js / React Three Fiber / Drei
- `@react-three/postprocessing`
- Separate `motion` package (see decision below)
- Analytics provider
- Test runner (Jest, Vitest, Playwright)
- State management library

### Motion Package Decision (Phase 2)

The spec lists `npm install motion`. This project already uses **`framer-motion` v12** in 20+ components with `useReducedMotion` patterns established.

**Decision:** **Do not install the separate `motion` package.** Continue using `framer-motion` for all Motion/ScrollReveal work. Framer Motion 12 is the same library family; adding `motion` would duplicate functionality and increase bundle size. New motion components (`TiltCard`, `ScrollReveal`, `MagneticButton`, etc.) should import from `framer-motion`.

---

## Page Structure (Homepage)

`app/page.tsx` renders sections in this order:

1. **Navbar** (`#home` anchor) — fixed header, mobile menu
2. **Hero** (`#home`) — intro, portrait, CTAs, social links
3. **Currently Building** — project tracker cards with progress bars
4. **Featured Projects** (`#projects`) — horizontal carousel of 5 projects
5. **About / Stats / Tech** (`#about`) — bio, career stats, tech stack grid
6. **Experience** (`#experience`) — carousel + expandable full timeline
7. **CTA Bar** — mid-page call to action
8. **Footer** (`#contact`) — quick links, services, contact info

### Sections Not on Homepage (orphaned components)

These exist in `components/` but are **not imported** by `app/page.tsx`:

| Component | Status |
|-----------|--------|
| `About.tsx` | Superseded by `AboutStatsTech` |
| `ApexBanner.tsx` | Gaming-style banner (unused) |
| `Contact.tsx` | Superseded by Footer contact block |
| `Projects.tsx` | Superseded by `FeaturedProjects` |
| `Skills.tsx` | Content merged into `AboutStatsTech` |
| `Stats.tsx` | Content merged into `AboutStatsTech` |
| `Education.tsx` | Not rendered |
| `Process.tsx` | Not rendered |
| `TechBanner.tsx` | Not rendered |
| `ResultsImpact.tsx` | Not rendered |
| `AvailableFor.tsx` | Not rendered |
| `FeaturedProjectCard.tsx` | Superseded by `FeaturedProjectCarouselCard` |

**Recommendation:** Reuse patterns from orphaned components where useful (e.g. `ApexBanner` tracker styling for Marcus OS UI). Do not delete until replacements are confirmed.

---

## Project Data Sources

### Primary: `lib/projects.ts`

- **Type:** `FeaturedProject` (rich case-study model)
- **Export:** `FEATURED_PROJECTS` array (5 projects)
- **Order:** `FEATURED_PROJECT_ORDER`, `CURRENTLY_BUILDING_ORDER`
- **Helpers:** `getFeaturedProjects()`, `getCurrentlyBuildingProjects()`, `getProjectById()`, `getProjectMetadata()`
- **Filters:** `PROJECT_FILTERS` (all, mobile, saas, ai, client, planning)

### Featured Projects (source of truth)

| ID | Name | Status | Live URL |
|----|------|--------|----------|
| `shuchu` | Shuchu | In Development | — (case study) |
| `daypilot` | DayPilot | In Development | daypilot.co |
| `bookmarked` | Bookmarked | Client Project | bookmarked.online |
| `avryo` | Avryo | Planning | — |
| `gridlock` | Gridlock | Planning | — |

**Not in data:** ForgeOne, 241Runners Awareness (experience only, in `Experience.tsx`)

### Secondary: `lib/site.ts`

- `SITE` — name, title, location, url, email, phone, social links, resume path
- `FEATURED_TECHNOLOGIES` — flat tech list
- `CONTACT_TEXT` — clipboard copy string

### Inline Data (not centralized)

- **Experience:** hardcoded in `components/Experience.tsx` (4 roles)
- **Tech stack categories:** hardcoded in `components/sections/AboutStatsTech.tsx`
- **Stats:** hardcoded in `AboutStatsTech.tsx`

**Phase 4 recommendation:** Extract `technologies.ts` and `experience.ts` without inventing content.

---

## Theme System

### Color Palette (jade / dark — single theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0D1310` | Page background |
| `--background-secondary` | `#101813` | Secondary surfaces |
| `--foreground` / cream | `#EEE7DC` | Primary text |
| `--jade` | `#3EB489` | Primary accent |
| `--jade-bright` | `#4ADE9A` | Highlights |
| `--jade-border` | `rgba(62,180,137,0.22)` | Borders |
| `--card` | `#151C18` | Card backgrounds |
| `--muted` | `#B7B2A8` | Secondary text |
| Gold scale | `#C9A227` … | Apex/gaming decorative elements |

Defined in:
- `app/globals.css` (`:root` + `@theme inline`)
- `tailwind.config.ts` (extend colors, shadows, fonts)

### Utility Classes (`globals.css`)

- `.grid-background` — jade grid lines (64px)
- `.glass-card` — glassmorphism panels
- `.featured-product-card`, `.project-card`, `.project-card-shine`
- `.glow-orb`, `.glow-orb-gold`
- `.apex-*` — gaming banner styling (gold/jade)
- `.hero-portrait-glow`, `.carousel-track`
- `.project-concept-icon-*`, `.project-app-icon-*`

### Marcus OS Gap

Spec calls for blue/violet **AI secondary accents** — not yet in theme. Add as `--ai-accent` tokens in a future phase without breaking jade primary.

---

## Dark Mode

**None.** The site is **dark-only** with no `prefers-color-scheme` toggle, no `dark:` Tailwind variants, and no theme provider.

The spec's "dark graphite backgrounds" align with current design. A light mode is **not required** unless explicitly requested later.

---

## Current Animations

### Framer Motion Usage

Used in 20 client components with consistent patterns:

- **Entrance:** `initial` / `animate` / `whileInView` with `viewport={{ once: true }}`
- **Reduced motion:** `useReducedMotion()` — disables duration/delay in Hero, FeaturedProjects, Experience, CTABar, AboutStatsTech, CurrentlyBuilding, FeaturedProjectCard, ProjectTrackerProgress
- **Mobile nav:** `AnimatePresence` height/opacity transition
- **Experience:** expandable timeline with `AnimatePresence`

### CSS Animations

- Hover transitions on `.project-card`, `.project-card-shine` sweep
- `.apex-badge` / `.apex-tracker` hover glow
- `scroll-behavior: smooth` on `html`
- `@media (prefers-reduced-motion: reduce)` disables transitions on cards, carousel, concept icons

### No 3D / Canvas

No WebGL, no CSS 3D transforms beyond card hover, no parallax libraries.

---

## Accessibility — Current State

### Strengths

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`
- `aria-labelledby` on major sections
- Carousel regions with `role="region"`, `aria-roledescription="carousel"`, keyboard arrow navigation
- Progress bars with `role="progressbar"` and ARIA values
- Mobile menu: `aria-expanded`, `aria-controls`
- Social links: `aria-label` on icon-only controls
- Focus-visible rings on interactive elements (jade ring)
- Lightbox dialog with `role="dialog"`, `aria-modal`, keyboard controls
- Decorative elements marked `aria-hidden`
- `lang="en"` on `<html>`
- JSON-LD structured data (Person, SoftwareApplication on project pages)

### Issues / Gaps for 3D Upgrade

| Issue | Severity | Notes |
|-------|----------|-------|
| `role="listitem"` on `<a>` inside `role="list"` div in Hero | Low | Should use `<ul>/<li>` semantics |
| Shuchu sub-pages use light theme (`text-zinc-800`) | Low | Inconsistent with portfolio; separate concern |
| No skip-to-content link | Medium | Add before heavy 3D |
| No `prefers-reduced-motion` in all Framer components | Medium | About, Skills, Contact, etc. lack `useReducedMotion` |
| Carousels lack `aria-live` for scroll position | Low | |
| Footer contact lacks `<h1>` hierarchy issue N/A | — | Single h1 in Hero ✓ |
| No effects toggle yet | Medium | Required by spec Phase 25 |
| Canvas accessibility plan needed | High | All 3D must have DOM equivalents |

**WCAG contrast:** Jade on dark backgrounds generally passes AA for large text; verify `#B7B2A8` muted on `#0D1310` for small text (likely passes AA).

---

## Performance

### Bundle / Build

- Baseline production build: **~4s** compile, 13 static pages
- No code splitting beyond Next.js defaults
- All section components are client components (`"use client"`) — increases JS bundle

### Assets

| Asset | Size | Notes |
|-------|------|-------|
| `public/projects/` total | ~2.1 MB | Per-project icons + screenshots |
| `bookmarked/icon.png` | 548 KB | Largest single asset — WebP preferred in data |
| Duplicate PNG + WebP pairs | ~15 files | PNGs unused by `lib/projects.ts` (uses `.webp`) |
| `marcus-brown.webp` | 36 KB | Hero portrait (good) |
| `marcus-brown.jpg` | 64 KB | OG image |
| `apex-banner-reference.png` | 72 KB | Reference only, not served in pages |
| Resume PDF | 60 KB | |

### Concerns

1. **Client-heavy homepage** — entire page hydrates multiple motion components
2. **Duplicate PNG assets** — safe to remove after confirming no references
3. **No lazy loading** for below-fold images (Next Image handles some)
4. **Framer Motion bundle** — adding R3F will significantly increase JS; lazy-load all 3D
5. **Multiple lockfiles warning** — parent `~/package-lock.json` detected; consider `turbopack.root` in config

### Performance Targets (spec Phase 40)

Document before/after in `docs/3d-portfolio-performance.md` during optimization phase.

---

## SSR / Static Export Constraints for R3F

| Constraint | Requirement |
|------------|-------------|
| No SSR for Canvas | `dynamic(() => import(...), { ssr: false })` |
| Client Component boundary | All R3F files need `"use client"` |
| No `window` at module top level | Guard WebGL detection |
| Static export | No server components inside Canvas tree |
| GitHub Pages | Relative asset paths; GLB models go in `public/models/` |
| Hydration | Show HTML hero first; canvas loads after |
| Error boundaries | Required — static export has no error recovery server |
| SEO | Critical text stays in HTML outside canvas |
| Memory | Dispose geometries/materials on unmount; pause offscreen |

**Compatible:** R3F works with static export when treated as client-only enhancement.

**Risk level:** Low–medium with proper lazy loading and fallbacks.

---

## Components — Reusable vs Refactor

### Reuse As-Is

| Component | Reuse For |
|-----------|-----------|
| `Button.tsx` | CTAs, magnetic button wrapper |
| `Navbar.tsx` | Extend nav links for new sections |
| `Footer.tsx` | Contact section base |
| `SectionHeader.tsx` | Section titles with motion |
| `SiteLogo.tsx` | Branding |
| `ProjectTrackerProgress.tsx` | Active Builds progress |
| `ProjectScreenshotGallery.tsx` | Project detail pages |
| `FeaturedProjectCarouselCard.tsx` | TiltCard wrapper target |
| `lib/projects.ts` | Single source of project truth |
| `lib/site.ts` | Site metadata |

### Refactor / Wrap

| Component | Action |
|-----------|--------|
| `Hero.tsx` | Split HTML layout + dynamic 3D scene |
| `FeaturedProjects.tsx` | Add TiltCard, filters (Phase 11) |
| `AboutStatsTech.tsx` | Evolve into Tech System section |
| `Experience.tsx` | Extract data; depth timeline |
| `CurrentlyBuilding.tsx` | Merge into Active Builds |
| `CTABar.tsx` | Integrate into contact flow |

### Orphaned (evaluate before delete)

`ApexBanner`, `About`, `Contact`, `Projects`, `Skills`, `Stats`, `Education`, `Process`, `TechBanner`, `ResultsImpact`, `AvailableFor`, `FeaturedProjectCard`

---

## Risks for Adding Three.js to Static Export Site

| Risk | Mitigation |
|------|------------|
| Bundle size explosion | Dynamic import; single canvas; tree-shake drei |
| WebGL unsupported | `SceneFallback` CSS gradient |
| Mobile GPU thermal/throttle | Quality tiers + static fallback |
| Hydration mismatch | `ssr: false` on all canvas |
| Memory leaks | Dispose on unmount; visibility pausing |
| SEO regression | HTML-first hero; no text in WebGL |
| Accessibility regression | DOM controls for all 3D interactions |
| Build failure | No R3F in server components |
| GitHub Pages MIME for `.glb` | Verify `.glb` served correctly (usually fine) |
| React 19 + R3F compatibility | Use latest stable R3F; test build |

**Blockers found:** None.

---

## Recommended Implementation Order

Follow spec Phase 44 with repo-specific adjustments:

1. ✅ **Audit** (this document)
2. **Install packages** — `three`, `@react-three/fiber`, `@react-three/drei` (skip duplicate `motion`)
3. **Architecture docs** — `docs/3d-portfolio-architecture.md`
4. **Extract data** — `lib/experience.ts`, `lib/technologies.ts` from inline sources
5. **Hooks** — `useReducedMotionPreference`, `useDevicePerformance`, `useElementVisibility`
6. **SceneFallback** — CSS gradient fallback
7. **TiltCard** — ref-based tilt wrapper
8. **Upgrade project cards** — wrap carousel cards
9. **Cursor glow, magnetic buttons, scroll reveal** — motion components
10. **Hero HTML layout** — Marcus OS copy layer
11. **PortfolioCanvas + MarcusCore** — lazy-loaded hero scene
12. **Project orbit nodes** — linked to `lib/projects.ts`
13. **Active Builds** — filters using existing `PROJECT_FILTERS`
14. **Tech System** — DOM list + optional 3D orbit
15. **Experience timeline** — depth cards from extracted data
16. **ModelViewer + 3D Lab** — ForgeOne placeholder geometry
17. **Effects toggle, visibility pausing, error boundaries**
18. **Navigation, command palette, contact polish**
19. **A11y, responsive, browser testing**
20. **Performance optimization, documentation, deploy**

---

## Appendix: File Inventory

```
app/
  globals.css, layout.tsx, page.tsx
  projects/[slug]/page.tsx
  shuchu/, shuchu/privacy/, shuchu/support/
components/
  (24 top-level + 7 in projects/ + 2 in sections/ + icons/)
lib/
  projects.ts, site.ts
public/
  projects/{shuchu,daypilot,bookmarked,avryo,gridlock}/
  marcus-brown.webp, logo.webp, resume PDF, CNAME
docs/
  project-assets-needed.md
```
