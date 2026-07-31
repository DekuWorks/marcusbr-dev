# Liquid metal assets

Environment and reference textures for the WebGL liquid-metal backdrop.

| File | Purpose |
|------|---------|
| `env-metal.webp` | Equirectangular chrome studio map for `LiquidBlob` reflections |
| `metal-still-01.webp` … `03.webp` | Abstract liquid-metal references (CSS / docs) |
| `metal-loop.webm` | Optional seamless loop for CSS fallback (not committed by default) |

## Regenerate

```bash
# Procedural stand-ins (default when no downloads present)
node scripts/process-liquid-metal-assets.mjs --generate

# After dropping Higgsfield exports into tmp-screenshots/liquid/
node scripts/process-liquid-metal-assets.mjs
```

## Higgsfield prompts

**Environment map / stills (abstract):**

> Seamless studio chrome liquid mercury blob, highly reflective molten metal surface, soft caustics, dark graphite background, jade and teal rim light, no text, no face, no watermark, cinematic studio lighting suitable as equirectangular environment map.

Skip portrait “person turns to metal” for the main page backdrop.
