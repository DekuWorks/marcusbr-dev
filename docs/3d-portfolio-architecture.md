# MarcusBR.dev 3D Portfolio — Architecture

> **Status:** Outline only (Phase 41 partial). Flesh out during Phase 3 implementation.

---

## Overview

Marcus OS layers **semantic HTML content** over optional **client-only WebGL enhancements**. The static export build (`output: "export"`) requires all 3D to load after hydration via dynamic imports.

```
┌─────────────────────────────────────────────┐
│  Server / Build Time (SSG)                  │
│  layout.tsx, metadata, JSON-LD, page HTML   │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  Client Hydration                           │
│  Navbar, sections, Framer Motion            │
└─────────────────────────────────────────────┘
                    │
        dynamic import (ssr: false)
                    ▼
┌─────────────────────────────────────────────┐
│  WebGL Layer (optional)                     │
│  PortfolioCanvas → HeroScene, TechOrbit,    │
│  ModelViewer                                │
└─────────────────────────────────────────────┘
```

---

## Directory Structure (planned)

Adapt to existing repo conventions (no `src/` prefix):

```
components/
  three/
    PortfolioCanvas.tsx       # R3F Canvas wrapper + error boundary
    PortfolioHeroScene.tsx    # Hero orbit scene
    MarcusCore.tsx            # Central icosahedron / brand object
    ProjectOrbit.tsx          # Orbiting project nodes
    ProjectNode.tsx           # Single project mesh + DOM link
    ParticleField.tsx         # Instanced particles
    TechOrbit.tsx             # Technology orbit (desktop)
    FloatingIcon.tsx          # Tech badge in 3D space
    ModelViewer.tsx           # Reusable GLB viewer
    ModelControls.tsx         # Solid/wireframe/measure UI
    MeasurementOverlay.tsx    # Bounding box dimensions
    SceneFallback.tsx         # CSS gradient fallback
    PerformanceMonitor.tsx    # Dev-only FPS overlay
  motion/
    TiltCard.tsx
    CursorGlow.tsx
    MagneticButton.tsx
    ScrollReveal.tsx
    ParallaxLayer.tsx
  portfolio/                  # Section wrappers (optional refactor)
    HeroSection.tsx
    ActiveBuildsSection.tsx
    TechSystemSection.tsx
    ThreeDLabSection.tsx

hooks/
  useReducedMotionPreference.ts
  useDevicePerformance.ts
  useElementVisibility.ts
  usePointerTilt.ts

lib/
  projects.ts                   # existing — extend with orbitPosition
  technologies.ts               # extract from AboutStatsTech
  experience.ts                 # extract from Experience.tsx
  three/
    qualitySettings.ts
    sceneConstants.ts
    modelOptimization.ts

public/
  models/                       # GLB assets (ForgeOne placeholder)
```

---

## Component Responsibilities

### PortfolioCanvas

- Single WebGL context per visible section (prefer one primary canvas)
- Quality tier from `useDevicePerformance`
- Pauses `useFrame` when offscreen (`useElementVisibility`)
- Wraps children in error boundary → `SceneFallback`

### SceneFallback

- Dark radial gradient + jade grid
- Static core graphic (CSS or SVG)
- Shown for: loading, WebGL unsupported, reduced motion (optional), effects off

### Data Flow

- `lib/projects.ts` → project cards, orbit nodes, filters
- No duplicated project arrays in components
- Technology selection state: React context or URL hash (TBD Phase 15)

---

## Quality Levels

```ts
type SceneQuality = "low" | "medium" | "high";
```

| Level | Particles | DPR cap | Shadows | Post-processing |
|-------|-----------|---------|---------|-----------------|
| high | Full | 2 | Limited | Minimal bloom |
| medium | Reduced | 1.5 | Off | None |
| low | None | 1 | Off | CSS fallback |

---

## Static Export Rules

1. Never import `@react-three/fiber` in Server Components
2. Always `dynamic(..., { sr: false })` for canvas trees
3. GLB files in `public/models/` with trailing-slash paths
4. Dispose Three.js resources on unmount
5. Hero HTML renders before canvas loads

---

## Integration Points

| Existing | Marcus OS |
|----------|-------------|
| `Hero.tsx` | Split → HTML + `PortfolioHeroScene` |
| `FeaturedProjects.tsx` | + `TiltCard`, filters |
| `AboutStatsTech.tsx` | → Tech System section |
| `Experience.tsx` | → Professional Journey |
| `Navbar.tsx` | New section anchors |
| `Footer.tsx` | Contact section polish |

---

## Open Questions

- [ ] Shared context for selected project/technology vs. URL state
- [ ] ForgeOne data model — add to `lib/projects.ts` when ready
- [ ] Command palette: new component or extend Navbar
- [ ] Analytics provider — none exists today

---

## Related Docs

- [3d-portfolio-audit.md](./3d-portfolio-audit.md) — Phase 1 findings
- [3d-asset-guidelines.md](./3d-asset-guidelines.md) — GLB pipeline
- [3d-portfolio-maintenance.md](./3d-portfolio-maintenance.md) — Ops guide
- [3d-portfolio-progress.md](./3d-portfolio-progress.md) — Phase tracker
