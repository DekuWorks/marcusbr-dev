#!/usr/bin/env node
/**
 * Optimize Higgsfield neural stills into public/neural/*.webp
 *
 * Drop exports in tmp-screenshots/neural/ then:
 *   node scripts/process-neural-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "tmp-screenshots", "neural");
const OUT = path.join(ROOT, "public", "neural");

const MAP = [
  { src: ["neuro-face", "neuroface", "neural-face"], out: "neuro-face.webp", max: 1920 },
  { src: ["hero-core", "neural-hero", "env-core"], out: "hero-core.webp", max: 1920 },
  { src: ["filaments", "filament", "metal-filaments"], out: "filaments.webp", max: 1280 },
  { src: ["energy-flow", "energy", "jade-energy"], out: "energy-flow.webp", max: 1600 },
  { src: ["hover-node", "hover", "node-hover"], out: "hover-node.webp", max: 1024 },
  { src: ["journey-timeline", "timeline", "journey"], out: "journey-timeline.webp", max: 1080 },
  { src: ["select-transition", "transition", "node-select"], out: "select-transition.webp", max: 1600 },
  { src: ["return-core", "return", "pullback"], out: "return-core.webp", max: 1600 },
];

function findFile(basenames) {
  if (!fs.existsSync(SRC)) return null;
  const files = fs.readdirSync(SRC);
  for (const base of basenames) {
    const hit = files.find((f) => path.parse(f).name === base);
    if (hit) return path.join(SRC, hit);
  }
  return null;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const outputs = [];

  for (const entry of MAP) {
    const src = findFile(entry.src);
    if (!src) continue;
    const dest = path.join(OUT, entry.out);
    await sharp(src)
      .rotate()
      .resize(entry.max, entry.max, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    outputs.push({ file: entry.out, source: path.basename(src) });
  }

  // Copy optional short webm loops if present
  if (fs.existsSync(SRC)) {
    for (const file of fs.readdirSync(SRC)) {
      if (path.extname(file).toLowerCase() === ".webm") {
        const dest = path.join(OUT, file);
        fs.copyFileSync(path.join(SRC, file), dest);
        outputs.push({ file, source: file });
      }
    }
  }

  console.log(JSON.stringify({ out: "public/neural/", outputs }, null, 2));
  if (outputs.length === 0) {
    console.error("No source files found in tmp-screenshots/neural/");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
