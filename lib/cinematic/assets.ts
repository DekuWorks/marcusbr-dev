/**
 * Local cinematic ambient assets (Higgsfield-generated, stored under public/cinematic).
 * Never depend on temporary CDN URLs in production — paths resolve via Next static export.
 */

export const CINEMATIC_ASSETS = {
  heroLighting: "/cinematic/hero-lighting.webp",
  atmosphere: "/cinematic/atmosphere.webp",
  particles: "/cinematic/particles.webp",
  contactGlow: "/cinematic/contact-glow.webp",
  /** Optional slow ambience loop — poster falls back to dedicated poster still. */
  ambienceLoop: "/cinematic/ambience-loop.mp4",
  ambienceLoopWebm: "/cinematic/ambience-loop.webm",
  ambiencePoster: "/cinematic/ambience-poster.webp",
} as const;

export type CinematicAssetKey = keyof typeof CINEMATIC_ASSETS;
