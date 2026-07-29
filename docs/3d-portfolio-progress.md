# MarcusBR.dev 3D Portfolio Progress

## Direction (July 2026)

Marcus OS / Three.js hero **removed** in favor of a lighter **motion-first** portfolio: tilt cards, magnetic CTAs, scroll reveals, command palette navigation, and a navbar effects toggle. ForgeOne and orbit 3D phases remain **out of scope** until real assets exist.

The site keeps the **jade green palette** (`#3EB489`, `#4ADE9A`, jade borders/glows) across all UI — command palette, navbar, buttons, and section accents.


**Upgrade:** Marcus OS — 3D Portfolio (motion-first pivot)  
**Started:** July 29, 2026  
**Last updated:** July 29, 2026 (Phases 29–32, 34 complete)

---

## Overall Progress

- [x] Audit complete
- [x] Dependencies installed
- [x] Shared data created
- [x] Hero scene complete
- [ ] Project cards complete
- [ ] Active Builds complete
- [x] Tech System complete
- [x] Experience timeline complete
- [ ] ForgeOne 3D Lab complete
- [x] Accessibility complete
- [x] Performance optimization complete
- [ ] Testing complete
- [ ] Documentation complete
- [ ] Production deployment complete

---

## Phase Checklist (1–44)

### Foundation

- [x] **Phase 1** — Audit the existing project
- [x] **Phase 2** — Install and configure required packages
- [x] **Phase 3** — Create the 3D component architecture
- [x] **Phase 4** — Create shared portfolio data

### Hero & Core 3D

- [x] **Phase 5** — Build the Marcus OS hero section
- [x] **Phase 6** — Add hero scene lazy loading
- [x] **Phase 7** — Create the scene fallback

### Motion & Cards

- [x] Phase 8 (lite) — CursorGlow on desktop
- [x] Phase 9 (lite) — TiltCard wrapper on featured carousel cards
- [x] **Phase 10** — Upgrade the project cards (motion polish, accent hover)
- [x] **Phase 11** — Build the Active Builds section (links, tilt, tracker)
- [x] **Phase 12** — Create magnetic buttons (hero + CTA bar)
- [x] **Phase 13** — Add scroll reveal animations (site-wide)

### Tech & Experience

- [x] **Phase 14** — Build the Technology System section
- [x] **Phase 15** — Add technology-to-project filtering
- [x] **Phase 16** — Build the Professional Journey timeline

### ForgeOne 3D Lab

- [ ] **Phase 17** — Build the ForgeOne 3D Lab
- [ ] **Phase 18** — Create the reusable 3D model viewer
- [ ] **Phase 19** — Add model measurement overlays
- [ ] **Phase 20** — Add a model scale demonstration
- [ ] **Phase 21** — Add wireframe and material controls

### Scroll & Performance

- [ ] **Phase 22** — Add a scroll-driven scene transition
- [ ] **Phase 23** — Add a visibility-based animation controller
- [ ] **Phase 24** — Add device performance detection
- [x] **Phase 25** — Add an effects toggle (`EffectsToggle` + `useEffectsPreference`)
- [x] **Phase 26** — Respect reduced motion (effects preference + CSS)

### Quality & Polish

- [x] **Phase 27** — Improve accessibility
- [x] **Phase 28** — Improve SEO
- [x] **Phase 29** — Optimize 3D assets (N/A — motion-first; image lazy-load + bundle splits)
- [x] **Phase 30** — Optimize runtime performance (dynamic imports, lazy images)
- [x] **Phase 31** — Add loading states (section skeletons for dynamic imports)
- [x] **Phase 32** — Add error boundaries (per-section `SectionErrorBoundary`)

### Navigation & Contact

- [x] **Phase 33** — Improve navigation
- [x] **Phase 34** — Add a command palette (⌘K / Ctrl+K, jade-themed)
- [ ] **Phase 35** — Improve the contact section

### Analytics, Testing & Docs

- [ ] **Phase 36** — Add analytics events
- [ ] **Phase 37** — Add testing
- [ ] **Phase 38** — Test responsive layouts
- [ ] **Phase 39** — Test browsers and devices
- [ ] **Phase 40** — Performance targets
- [ ] **Phase 41** — Create documentation
- [x] **Phase 42** — Add a progress tracker (this file)
- [ ] **Phase 43** — Add development rules
- [ ] **Phase 44** — Suggested implementation order (tracked via sprint below)

---

## Current Sprint

### In Progress

- Phase 17+ — Optional 3D lab (no 3D hero)

### Completed

- [x] Phase 1 — Full codebase audit (`docs/3d-portfolio-audit.md`)
- [x] Phase 2 — Installed `three`, `@react-three/fiber`, `@react-three/drei`; build verified
- [x] Phase 3 — `components/three/` + `components/motion/` scaffold
- [x] Phase 4 — `lib/technologies.ts`, `lib/experience.ts` extracted
- [x] Phase 5–7 — ~~MarcusOSHero~~ (reverted — motion-first hero)
- [x] Phase 24 (lite) — `useDevicePerformance` tier detection
- [x] Phase 25–26 (lite) — `useReducedMotionPreference` (full/reduced/off)
- [x] Phase 42 — Progress tracker created
- [x] Phase 41 (partial) — Architecture, asset guidelines, maintenance doc outlines
- [x] Phase 14 — Technology System section (filter chips, project linking)
- [x] Phase 15 — Technology-to-project filtering (`lib/techProjectMatch.ts`)
- [x] Phase 16 — Professional Journey timeline polish
- [x] Phase 27 — Accessibility pass (skip link, aria, keyboard nav, focus styles)
- [x] Phase 28 — SEO improvements (JSON-LD, sitemap, robots, metadata)
- [x] Phase 33 — Navbar Skills link to `#skills`
- [x] Phase 29–30 — Runtime performance (dynamic section imports, lazy images, hero `sizes`)
- [x] Phase 31 — Loading skeletons for FeaturedProjects, TechnologySystem, Experience (jade pulse, reduced-motion aware)
- [x] Phase 32 — Section error boundaries (isolated chunk failures)
- [x] Phase 34 — Command palette (`⌘K` / `Ctrl+K`, jade-themed, accessible dialog + navbar hint)

### Blocked

- (none)

### Next
- [ ] Phase 35 — Improve the contact section

---

## Notes

- Audit found **no blockers** for R3F on static export. All canvas must use `dynamic(..., { ssr: false })`.
- **Skip separate `motion` package** — project already uses `framer-motion` v12 throughout.
- **ForgeOne not in `lib/projects.ts`** — do not invent; add when real data/assets exist.
- **5 featured projects:** Shuchu, DayPilot, Bookmarked, Avryo, Gridlock.
- **11 orphaned components** exist (e.g. `ApexBanner`, `Contact`) — reuse patterns, don't delete yet.
- Shuchu marketing pages (`/shuchu/*`) use a separate light theme — out of scope for Marcus OS hero.
