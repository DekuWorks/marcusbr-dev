# Neural Higgsfield assets

Optimized stills + short motion loops for the cinematic neural interface.

## Stills (WebP)

| File | Role |
|------|------|
| `neuro-face.webp` | Full-page neuro-face backdrop (primary) |
| `hero-core.webp` | Legacy hero / idle core still |
| `filaments.webp` | Liquid-metal filament layer |
| `energy-flow.webp` | Jade energy flow layer |
| `hover-node.webp` | Hover reaction reference |
| `journey-timeline.webp` | Professional journey transition |
| `select-transition.webp` | Node selection poster |
| `return-core.webp` | Return-to-core poster |

## Videos (VP9 WebM)

| File | Role |
|------|------|
| `idle-core.webm` | Ambient idle loop behind the WebGL core |
| `select-transition.webm` | Node selection transition (~5s) |
| `return-core.webm` | Return-to-core transition (~5s) |

Journey still uses still crossfade until a dedicated loop is generated.

## Regenerate

1. Generate in Higgsfield (`generate_image` / `generate_video`)
2. Drop PNG/JPG into `tmp-screenshots/neural/` (and WebM if pre-encoded)
3. For MP4 sources: convert with ffmpeg, e.g.  
   `ffmpeg -i clip.mp4 -an -vf scale=1280:-2 -c:v libvpx-vp9 -b:v 0 -crf 34 public/neural/name.webm`
4. Run `npm run neural:assets` for stills
