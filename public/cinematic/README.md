# Cinematic ambient assets

Abstract Higgsfield-generated textures used for atmospheric lighting across marcusbr.dev.

| File | Role |
|------|------|
| `hero-lighting.webp` | Jade light streaks behind the hero portrait |
| `atmosphere.webp` | Full-page soft fog / grain layer |
| `particles.webp` | Sparse particle / bokeh overlay |
| `contact-glow.webp` | Contact CTA / footer ambient bloom |
| `ambience-loop.mp4` | Optional slow desktop ambience loop (poster: atmosphere) |

**Rules**

- No faces, humans, or text in these assets
- Production uses only these local paths (static export) — never temporary CDN URLs
- Source PNGs / raw MP4 may live under `tmp/cinematic-raw/` for regeneration; commit optimized media here
- Video plays only on desktop + motion-enabled; reduced-motion and mobile use stills
