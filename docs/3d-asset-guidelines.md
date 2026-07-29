# MarcusBR.dev — 3D Asset Guidelines

> **Status:** Outline only (Phase 41 partial). Complete during Phase 29.

---

## Goals

- Keep total 3D payload small for GitHub Pages static hosting
- Target **3–5 MB per model** maximum
- Prefer GPU-friendly compressed textures
- Document licensing for every asset

---

## File Formats

| Format | Use Case |
|--------|----------|
| `.glb` | Primary delivery (binary glTF) |
| `.gltf` + `.bin` | Only if multi-file pipeline required |
| `.webp` / `.avif` | 2D fallbacks, UI textures |
| `.hdr` | Environment maps (use sparingly) |

**Do not** ship `.fbx`, `.obj`, or uncompressed `.blend` in `public/`.

---

## Directory Layout

```
public/models/
  forgeone-placeholder.glb    # Geometric placeholder until real scan
  README.md                   # Per-model notes, license, poly count
```

Naming: `kebab-case`, project prefix (`forgeone-helmet-v1.glb`).

---

## Blender Export Settings (GLB)

<!-- TODO Phase 29: Add screenshots and exact export dialog settings -->

- Format: glTF Binary (`.glb`)
- Include: Selected objects only
- Transform: +Y up (Three.js default)
- Apply modifiers before export
- Draco compression: enable when `@react-three/drei` Draco loader configured

### Polygon Budget

| Asset Type | Target Tris |
|------------|-------------|
| Hero Marcus Core | < 2,000 |
| Project node icon | < 500 each |
| ForgeOne product model | < 50,000 |
| Particle instancing | Use `InstancedMesh`, not individual meshes |

### Texture Budget

| Map | Max Size |
|-----|----------|
| Albedo | 1024×1024 |
| Normal | 1024×1024 |
| ORM packed | 1024×1024 |
| 4K | Only with documented justification |

---

## Optimization Checklist

- [ ] Remove unused objects, materials, animations
- [ ] Merge materials where possible
- [ ] Resize textures to power-of-two
- [ ] Compress with Draco / meshopt
- [ ] Run `gltf-transform optimize` or Blender decimate
- [ ] Record file size before/after in PR description
- [ ] Test load time on 3G throttled mobile

---

## Runtime Loading

- Lazy-load models when section enters viewport
- Use `@react-three/drei` `useGLTF` with Suspense
- Preload only hero-critical assets after LCP
- Provide static image fallback in `SceneFallback`

---

## Licensing

- Only use models Marcus owns or has explicit license to display
- No unlicensed third-party downloads
- Document license in `public/models/README.md` per file

---

## Tools

| Tool | Purpose |
|------|---------|
| Blender | Authoring, export, decimation |
| gltf-transform | CLI optimize, Draco, texture resize |
| gltf.report | Online validation |
| `@react-three/drei` useGLTF | Runtime loading |

---

## Related Docs

- [3d-portfolio-architecture.md](./3d-portfolio-architecture.md)
- [3d-portfolio-audit.md](./3d-portfolio-audit.md) — current asset inventory
