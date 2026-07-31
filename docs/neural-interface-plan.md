# Neural Interface Redesign — Implementation Plan

**Date:** July 31, 2026  
**Status:** Phase 1–3 in progress (hero + neural-core prototype)  
**Deploy:** GitHub Pages static export (`output: "export"`, trailing slash) — no Vercel

## Audit Summary

| Area | Finding |
|------|---------|
| Stack | Next.js 16, React 19, TypeScript, Tailwind 4, Framer Motion |
| 3D | R3F + Drei + postprocessing already installed; reuse quality/WebGL hooks |
| Motion | Framer Motion only — **do not add GSAP** unless a clear gap appears |
| Page | Hero → CurrentlyBuilding → Featured → About → Tech → Experience → CTA |
| Liquid | Full-page WebGL liquid metal backdrop; interaction bus in `hooks/useLiquidInteraction` |
| Data | Projects: `shuchu`, `daypilot`, `bookmarked`, `avryo`, `gridlock`. Experience includes **241Runners Awareness**. **ForgeOne** not in data — omit until real assets exist |
| SEO / hosting | Preserve `lib/seo.ts`, CNAME, GitHub Pages workflow |

## Reuse

- `hooks/useWebGLSupport.ts`, `useDeviceQuality.ts`, `useEffectsPreference.ts` / reduced motion
- `components/three/SceneErrorBoundary.tsx`
- `lib/projects.ts`, `lib/experience.ts`, `lib/site.ts`, `lib/navigation.ts`
- Jade tokens in `app/globals.css` (`--jade`, `--jade-bright`)

## Integration Strategy

1. **Prototype (now):** Hero-mounted `NeuralScene` (lazy, one WebGL context). Soften page liquid to CSS ambient so we never run two canvases.
2. **Next:** Data-driven nodes → section/project deep links; camera focus; return-to-core.
3. **Later:** Professional journey spatial timeline; Higgsfield still references only (no large videos).

## Folder Mapping

```text
lib/neural/
  portfolioNodes.ts
  professionalJourney.ts
components/neural/
  NeuralScene.tsx          # Canvas orchestrator
  NeuralCore.tsx
  NeuralNode.tsx
  NeuralConnections.tsx
  NeuralLabels.tsx         # a11y / HTML labels
  CameraController.tsx
  SceneLighting.tsx
  SceneEffects.tsx
  NeuralFallback.tsx
  NeuralHeroBackdrop.tsx   # dynamic import mount for Hero
```

## Node Inventory (v1)

| Node id | Type | Target |
|---------|------|--------|
| journey | center | `#experience` |
| gridlock, daypilot, shuchu, bookmarked, avryo | project | `#projects` / `/projects/{id}/` |
| skills | section | `#skills` |
| about | section | `#about` |
| contact | section | `#contact` |

Deferred: ForgeOne, 241Runners as product nodes (241Runners remains in journey milestones).

## Phases

- [x] Phase 1 — Audit + this plan
- [x] Phase 2 — Foundation (data, scaffolding, fallback)
- [x] Phase 3 — Hero prototype (core idle, fog, particles, scroll cue)
- [x] Phase 3b — Higgsfield stills wired (atmosphere + transition overlay)
- [ ] Phase 4 — Node navigation + camera polish
- [ ] Phase 5 — Professional journey
- [ ] Phase 6 — Higgsfield video loops (blocked: video plan / credits)
- [ ] Phase 7 — Verification

### Higgsfield status (2026-07-31)

Generated via MCP `nano_banana_pro` into `public/neural/*.webp`:
hero-core, filaments, energy-flow, hover-node, journey-timeline (+ select/return stand-ins).

Video (`kling3_0_turbo`) requires Basic plan; Seedance ~22.5 credits and workspace was out of credits mid-run.
Transitions currently use Higgsfield still crossfades (`NeuralTransitionOverlay`).

## Constraints

- Keep jade-green identity; restrained metal, no neon arcade
- No scroll-jacking; navbar + deep links always work
- Reduced-motion + WebGL-disabled fallbacks required
- Preserve all copy, links, SEO, GitHub deploy
