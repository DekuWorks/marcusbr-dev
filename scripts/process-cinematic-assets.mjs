#!/usr/bin/env node
/**
 * Optimize Higgsfield cinematic downloads into public/cinematic/.
 *
 * Usage:
 *   node scripts/process-cinematic-assets.mjs
 *
 * Expects raw files under tmp/cinematic-raw/:
 *   atmosphere.*       → atmosphere.webp + ambience-poster.webp
 *   hero-lighting.*    → hero-lighting.webp (falls back to atmosphere)
 *   particles.*        → particles.webp (falls back to atmosphere)
 *   contact-glow.*     → contact-glow.webp (falls back to atmosphere)
 *   ambience-loop.mp4  → ambience-loop.mp4 + ambience-loop.webm
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "tmp", "cinematic-raw");
const OUT = path.join(ROOT, "public", "cinematic");

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp"];

function findSource(basename) {
  if (!fs.existsSync(SRC)) return null;
  for (const ext of IMAGE_EXTS) {
    const candidate = path.join(SRC, `${basename}${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function hasBinary(bin) {
  try {
    execFileSync(bin, ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function writeWebp(input, output, options) {
  // Flatten alpha onto near-black so screen-blended layers stay bright
  let pipeline = sharp(input)
    .rotate()
    .flatten({ background: options.flatten ?? "#050807" });

  if (options.width || options.height) {
    pipeline = pipeline.resize(options.width, options.height, {
      fit: options.fit ?? "cover",
      position: options.position ?? "centre",
      withoutEnlargement: false,
    });
  }

  if (options.modulate) {
    pipeline = pipeline.modulate(options.modulate);
  }

  if (options.blur) {
    pipeline = pipeline.blur(options.blur);
  }

  await pipeline.webp({ quality: options.quality ?? 86, effort: 4 }).toFile(output);
  const meta = await sharp(output).metadata();
  const stat = fs.statSync(output);
  console.log(
    `  ✓ ${path.relative(ROOT, output)} ${meta.width}x${meta.height} (${Math.round(stat.size / 1024)} KB)`,
  );
}

async function processStills() {
  const atmosphereSrc = findSource("atmosphere");
  if (!atmosphereSrc) {
    console.warn("No atmosphere still in tmp/cinematic-raw — skipping stills.");
    return;
  }

  fs.mkdirSync(OUT, { recursive: true });
  console.log("Processing stills…");

  await writeWebp(atmosphereSrc, path.join(OUT, "atmosphere.webp"), {
    width: 1920,
    height: 1080,
    quality: 85,
  });

  await writeWebp(atmosphereSrc, path.join(OUT, "ambience-poster.webp"), {
    width: 1600,
    height: 900,
    quality: 82,
  });

  const heroSrc = findSource("hero-lighting") ?? atmosphereSrc;
  await writeWebp(heroSrc, path.join(OUT, "hero-lighting.webp"), {
    width: 1600,
    height: 1600,
    position: heroSrc === atmosphereSrc ? "right" : "centre",
    quality: 84,
    modulate: heroSrc === atmosphereSrc ? { brightness: 1.08, saturation: 1.1 } : undefined,
    blur: heroSrc === atmosphereSrc ? 1.1 : undefined,
  });

  const particlesSrc = findSource("particles") ?? atmosphereSrc;
  await writeWebp(particlesSrc, path.join(OUT, "particles.webp"), {
    width: 1600,
    height: 900,
    quality: 80,
    modulate:
      particlesSrc === atmosphereSrc
        ? { brightness: 0.55, saturation: 1.2 }
        : undefined,
  });

  const contactSrc = findSource("contact-glow") ?? atmosphereSrc;
  await writeWebp(contactSrc, path.join(OUT, "contact-glow.webp"), {
    width: 1400,
    height: 900,
    quality: 82,
    blur: contactSrc === atmosphereSrc ? 1.5 : undefined,
  });
}

function processVideo() {
  const rawMp4 = path.join(SRC, "ambience-loop.mp4");
  if (!fs.existsSync(rawMp4)) {
    console.warn("No ambience-loop.mp4 in tmp/cinematic-raw — skipping video.");
    return;
  }

  fs.mkdirSync(OUT, { recursive: true });
  const outMp4 = path.join(OUT, "ambience-loop.mp4");
  const outWebm = path.join(OUT, "ambience-loop.webm");

  // Remove empty/partial outputs from interrupted runs
  for (const file of [outMp4, outWebm]) {
    if (fs.existsSync(file) && fs.statSync(file).size < 1024) {
      fs.unlinkSync(file);
    }
  }

  if (!hasBinary("ffmpeg")) {
    fs.copyFileSync(rawMp4, outMp4);
    console.log("  ✓ copied ambience-loop.mp4 (ffmpeg unavailable)");
    return;
  }

  console.log("Transcoding ambience-loop.mp4…");
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      rawMp4,
      "-an",
      "-vf",
      "scale=1280:-2:flags=lanczos",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "26",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      outMp4,
    ],
    { stdio: "inherit" },
  );
  console.log(
    `  ✓ ambience-loop.mp4 (${Math.round(fs.statSync(outMp4).size / 1024)} KB)`,
  );

  console.log("Transcoding ambience-loop.webm…");
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      rawMp4,
      "-an",
      "-vf",
      "scale=1280:-2:flags=lanczos",
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "0",
      "-crf",
      "36",
      "-deadline",
      "good",
      "-cpu-used",
      "4",
      "-row-mt",
      "1",
      outWebm,
    ],
    { stdio: "inherit" },
  );
  console.log(
    `  ✓ ambience-loop.webm (${Math.round(fs.statSync(outWebm).size / 1024)} KB)`,
  );
}

async function main() {
  await processStills();
  processVideo();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
