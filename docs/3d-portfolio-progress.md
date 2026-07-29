# MarcusBR.dev 3D Portfolio Progress

**Upgrade:** Marcus OS — 3D Portfolio  
**Started:** July 29, 2026  
**Last updated:** July 29, 2026 (Phases 3–7 complete)

---

## Overall Progress

- [x] Audit complete
- [x] Dependencies installed
- [x] Shared data created
- [x] Hero scene complete
- [ ] Project cards complete
- [ ] Active Builds complete
- [ ] Tech System complete
- [ ] Experience timeline complete
- [ ] ForgeOne 3D Lab complete
- [ ] Accessibility complete
- [ ] Performance optimization complete
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
- [ ] **Phase 10** — Upgrade the project cards
- [ ] **Phase 11** — Build the Active Builds section
- [ ] **Phase 12** — Create magnetic buttons
- [ ] **Phase 13** — Add scroll reveal animations

### Tech & Experience

- [ ] **Phase 14** — Build the Technology System section
- [ ] **Phase 15** — Add technology-to-project filtering
- [ ] **Phase 16** — Build the Professional Journey timeline

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
- [ ] **Phase 25** — Add an effects toggle
- [ ] **Phase 26** — Respect reduced motion

### Quality & Polish

- [ ] **Phase 27** — Improve accessibility
- [ ] **Phase 28** — Improve SEO
- [ ] **Phase 29** — Optimize 3D assets
- [ ] **Phase 30** — Optimize runtime performance
- [ ] **Phase 31** — Add loading states
- [ ] **Phase 32** — Add error boundaries

### Navigation & Contact

- [ ] **Phase 33** — Improve navigation
- [ ] **Phase 34** — Add a command palette
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

- Phase 8–13 — Motion polish (MagneticButton, ScrollReveal integration)

### Completed

- [x] Phase 1 — Full codebase audit (`docs/3d-portfolio-audit.md`)
- [x] Phase 2 — Installed `three`, `@react-three/fiber`, `@react-three/drei`; build verified
- [x] Phase 3 — `components/three/` + `components/motion/` scaffold
- [x] Phase 4 — `lib/technologies.ts`, `lib/experience.ts` extracted
- [x] Phase 5–7 — MarcusOSHero, lazy PortfolioHeroScene, SceneFallback
- [x] Phase 24 (lite) — `useDevicePerformance` tier detection
- [x] Phase 25–26 (lite) — `useReducedMotionPreference` (full/reduced/off)
- [x] Phase 42 — Progress tracker created
- [x] Phase 41 (partial) — Architecture, asset guidelines, maintenance doc outlines

### Blocked

- (none)

### Next
- [ ] Phase 10 — Upgrade project cards (full Marcus OS treatment)
- [ ] Phase 11 — Active Builds section 3D accents
- [ ] Phase 14 — Technology System section with orbit

---

## Notes

- Audit found **no blockers** for R3F on static export. All canvas must use `dynamic(..., { ssr: false })`.
- **Skip separate `motion` package** — project already uses `framer-motion` v12 throughout.
- **ForgeOne not in `lib/projects.ts`** — do not invent; add when real data/assets exist.
- **5 featured projects:** Shuchu, DayPilot, Bookmarked, Avryo, Gridlock.
- **11 orphaned components** exist (e.g. `ApexBanner`, `Contact`) — reuse patterns, don't delete yet.
- Shuchu marketing pages (`/shuchu/*`) use a separate light theme — out of scope for Marcus OS hero.
