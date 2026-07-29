# MarcusBR.dev 3D Portfolio — Maintenance Guide

> **Status:** Outline only (Phase 41 partial). Complete during Phase 41 final pass.

---

## Adding a New Featured Project

1. Add entry to `FEATURED_PROJECTS` in `lib/projects.ts` (do not invent URLs/status)
2. Add assets to `public/projects/{id}/` (icon.webp, screenshots)
3. Update `FEATURED_PROJECT_ORDER` and `CURRENTLY_BUILDING_ORDER` if featured
4. If 3D orbit enabled: set `orbitPosition?: [x, y, z]` on project type
5. Run `npm run build` — verify new `/projects/{id}/` page generates
6. Update progress tracker

---

## Adding a New Technology

1. Add to appropriate category in `lib/technologies.ts` (once extracted)
2. Link to projects that use it via existing `technologies[]` on each project
3. If Tech Orbit enabled: add to orbit group in `TechOrbit.tsx`
4. Verify filter/highlight behavior (Phase 15)

---

## Adding a GLB Model

1. Optimize per [3d-asset-guidelines.md](./3d-asset-guidelines.md)
2. Place in `public/models/`
3. Update `ModelViewer` `modelUrl` prop
4. Test on mobile (low quality tier) and desktop (high)
5. Document size and license in `public/models/README.md`

---

## Replacing the ForgeOne Placeholder

1. Export optimized `.glb` from Blender
2. Swap `modelUrl` in 3D Lab section
3. Verify measurement overlay bounding box updates
4. Update dimension labels if demo values change (mark as demonstration)

---

## Visual Effects Preference

<!-- TODO Phase 25 -->

Users can set: **Full / Reduced / Off**

- Stored in `localStorage` key: `marcus-os-effects` (planned)
- Reduced: fewer particles, no bloom, no auto-rotation
- Off: `SceneFallback` only

---

## Reduced Motion

- Respects `prefers-reduced-motion: reduce`
- Also respects site effects toggle
- Hook: `useReducedMotionPreference` (planned)

---

## Performance Rules

- One primary canvas visible at a time
- Pause animations when offscreen or tab hidden
- Cap `dpr` via `qualitySettings.ts`
- Never `setState` inside `useFrame`
- Run Lighthouse before marking phases complete

---

## Troubleshooting WebGL

| Symptom | Check |
|---------|-------|
| Blank canvas | Browser WebGL support; console errors |
| Build fails | R3F imported in Server Component? |
| Hydration error | Missing `ssr: false` on dynamic import |
| Memory climb | Geometries/materials not disposed |
| Black model | Lighting, camera position, scale |
| GLB 404 | Path includes trailing slash on GitHub Pages |

---

## Deployment

```bash
npm run build   # outputs to ./out
# Push to main → GitHub Actions deploys to marcusbr.dev
```

Verify live after deploy:
- Hero loads with fallback on low-end device
- Project links work
- Resume download works
- No console errors

---

## Development Rules (Phase 43 preview)

- Never place critical content only inside a canvas
- Never use React state for per-frame animation
- Never add unoptimized 3D models
- Never load all models on initial page load
- Always provide a static fallback
- Always respect reduced motion
- Always run production build before marking phase complete
- Always update [3d-portfolio-progress.md](./3d-portfolio-progress.md)

---

## Related Docs

- [3d-portfolio-architecture.md](./3d-portfolio-architecture.md)
- [3d-portfolio-audit.md](./3d-portfolio-audit.md)
- [3d-asset-guidelines.md](./3d-asset-guidelines.md)
- [3d-portfolio-progress.md](./3d-portfolio-progress.md)
