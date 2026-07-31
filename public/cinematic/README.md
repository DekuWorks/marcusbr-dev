# Cinematic ambient assets

Abstract Higgsfield-generated textures used for atmospheric lighting across marcusbr.dev.

| File | Role |
|------|------|
| `hero-lighting.webp` | Jade light streaks behind the hero portrait |
| `atmosphere.webp` | Full-page soft fog / grain layer |
| `particles.webp` | Sparse particle / bokeh overlay |
| `contact-glow.webp` | Contact CTA / footer ambient bloom |
| `ambience-poster.webp` | Poster frame for the ambience video |
| `ambience-loop.mp4` | Desktop ambience loop (H.264) |
| `ambience-loop.webm` | Desktop ambience loop (VP9) |

**Rules**

- No faces, humans, or text in these assets
- Production uses only these local paths (static export) — never temporary CDN URLs
- Source PNGs / raw MP4 live under `tmp/cinematic-raw/`; optimize with `npm run cinematic:assets`
- Video + WebGL orb play only on desktop + motion-enabled; reduced-motion and mobile use stills

**Regen notes**

- Atmosphere still: Higgsfield `nano_banana_pro` → `tmp/cinematic-raw/atmosphere.png`
- Ambience loop: `kling3_0_turbo` image-to-video from that still → `tmp/cinematic-raw/ambience-loop.mp4`
