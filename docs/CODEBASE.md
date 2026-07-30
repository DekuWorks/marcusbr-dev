# Codebase Architecture

Portfolio site for marcusbr.dev — Next.js App Router, React 19, Tailwind CSS, Framer Motion, and optional WebGL liquid background.

## Directory layout

```
app/           # Next.js routes, layout, global CSS
components/    # UI components grouped by concern
hooks/         # React context providers and shared hooks
lib/           # Pure utilities, data, SEO, interaction state
```

## `app/`

| File | Role |
|------|------|
| `layout.tsx` | Root shell: fonts, analytics, provider tree (`EffectsPreference` → `LiquidInteraction` → `CommandPalette`) |
| `page.tsx` | Home page section composition with dynamic imports for below-fold sections |
| `globals.css` | Design tokens, liquid CSS variables, layout utilities |

## `components/`

| Folder | Purpose |
|--------|---------|
| `liquid/` | CSS-driven liquid effects — backdrop mount, cursor spotlight, glass panels |
| `three/` | WebGL scene (blob, droplets, grid) with CSS fallback |
| `nav/` | Navbar helpers — scroll progress, magnetic links, hash navigation |
| `sections/` | Major page sections (`FeaturedProjects`, `TechnologySystem`, `AboutStatsTech`) |
| `motion/` | Reusable motion primitives (`TiltCard`, `MagneticButton`, `ScrollReveal`) |
| `layout/` | Container and typography wrappers |
| `projects/` | Project cards, icons, tracker progress |
| `skeletons/` | Loading placeholders for dynamic sections |

## `hooks/`

| Hook | Purpose |
|------|---------|
| `useEffectsPreference` | System `prefers-reduced-motion`; gates all motion/WebGL |
| `useLiquidEffects` | Derived flags for liquid/WebGL intensity tiers |
| `useLiquidInteraction` | Global liquid state: pointer, scroll, section events → CSS vars |
| `useCommandPalette` | ⌘K palette open/toggle |
| `useDeviceQuality` | Device/network tier → `QUALITY_SETTINGS` |
| `useElementVisibility` | Intersection observer for pausing WebGL off-screen |
| `useWebGLSupport` | Runtime WebGL capability check |

## `lib/`

| Module | Purpose |
|--------|---------|
| `scrollToSection.ts` | Anchor scrolling with navbar offset and scroll-spy pause lock |
| `liquid/interactionState.ts` | Liquid reaction state machine and CSS variable mapping |
| `three/qualitySettings.ts` | WebGL quality tiers (low / medium / high) |
| `navigation.ts` | Command palette section/action definitions |
| `seo.ts` | JSON-LD, Open Graph, Twitter card builders |
| `projects.ts` | Featured project data (do not change content casually) |
| `site.ts` | Site-wide constants (name, email, social links) |

## Provider tree

```
EffectsPreferenceProvider
  └── LiquidInteractionProvider   (pointer listeners, rAF tick, CSS vars)
        └── CommandPaletteProvider
              └── page content
```

## Liquid interaction flow

1. User navigates (navbar, hash links, command palette) → `scrollToSection` + `emitSectionFromHref`
2. Section components emit events (`tabChange`, `pillSelect`, `carouselNav`, etc.)
3. `applyLiquidInteraction` updates ref-based state in `interactionState.ts`
4. `tickLiquidInteraction` decays impulses and lerps pointer/shift each frame
5. `liquidStateToCssVars` writes `--liquid-*` custom properties to `#liquid-backdrop` and `:root`
6. WebGL meshes read the same ref for shader uniforms

## Scroll spy

Navbar highlights the active section via `getActiveSectionHref`. Programmatic scrolls call `pauseScrollSpy()` so the spy does not fight smooth-scroll mid-animation.

## Quality tiers

`useDeviceQuality` picks `low` / `medium` / `high` from viewport, pointer type, memory, and network. `useLiquidEffects` may further reduce counts when `prefers-reduced-motion` is set.
