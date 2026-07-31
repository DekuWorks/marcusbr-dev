#!/usr/bin/env node
/**
 * Process Higgsfield liquid-metal downloads (or generate procedural stand-ins)
 * into optimized WebPs under public/liquid/.
 *
 * Usage:
 *   node scripts/process-liquid-metal-assets.mjs
 *   node scripts/process-liquid-metal-assets.mjs --generate   # force procedural
 *
 * Drop Higgsfield exports into tmp-screenshots/liquid/ as:
 *   env-metal.*          → public/liquid/env-metal.webp (max 2048)
 *   metal-still-01.* …   → public/liquid/metal-still-0N.webp (max 1024)
 *   metal-loop.*         → public/liquid/metal-loop.webm (copied if webm)
 *
 * Higgsfield prompt (abstract chrome blob):
 *   Seamless studio chrome liquid mercury blob, highly reflective molten metal,
 *   soft caustics, dark graphite background, jade and teal rim light, no text,
 *   no face, no watermark, equirectangular studio lighting for environment map.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "tmp-screenshots", "liquid");
const OUT = path.join(ROOT, "public", "liquid");
const forceGenerate = process.argv.includes("--generate");

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

function findSource(basename) {
  if (!fs.existsSync(SRC)) return null;
  for (const file of fs.readdirSync(SRC)) {
    const parsed = path.parse(file);
    if (parsed.name === basename && IMAGE_EXTS.has(parsed.ext.toLowerCase())) {
      return path.join(SRC, file);
    }
  }
  return null;
}

/** Procedural equirect studio chrome map (dark floor, cool lights, jade rim). */
async function generateEnvMap(size = 2048) {
  const height = size / 2;
  const width = size;
  const data = Buffer.alloc(width * height * 3);

  for (let y = 0; y < height; y++) {
    const v = y / (height - 1);
    for (let x = 0; x < width; x++) {
      const u = x / (width - 1);
      const i = (y * width + x) * 3;

      // Vertical gradient: dark floor → mid graphite → cooler ceiling
      let r = 18 + v * 28;
      let g = 22 + v * 32;
      let b = 20 + v * 36;

      // Soft studio key lights (horizontal streaks)
      const lights = [
        { cx: 0.18, cy: 0.32, wr: 0.08, hr: 0.18, color: [220, 235, 255], power: 0.85 },
        { cx: 0.72, cy: 0.28, wr: 0.1, hr: 0.22, color: [180, 255, 220], power: 0.55 },
        { cx: 0.48, cy: 0.62, wr: 0.14, hr: 0.12, color: [120, 210, 200], power: 0.35 },
        { cx: 0.9, cy: 0.45, wr: 0.06, hr: 0.3, color: [255, 255, 255], power: 0.7 },
      ];

      for (const light of lights) {
        const dx = (u - light.cx) / light.wr;
        const dy = (v - light.cy) / light.hr;
        const falloff = Math.exp(-(dx * dx + dy * dy));
        r += light.color[0] * falloff * light.power;
        g += light.color[1] * falloff * light.power;
        b += light.color[2] * falloff * light.power;
      }

      // Horizon band for chrome catch
      const horizon = Math.exp(-Math.pow((v - 0.52) * 14, 2)) * 40;
      r += horizon;
      g += horizon * 1.05;
      b += horizon * 1.1;

      // Subtle noise
      const n = ((Math.sin(u * 97.1 + v * 53.3) * 43758.5453) % 1) * 8;
      r += n;
      g += n;
      b += n;

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }
  }

  return sharp(data, {
    raw: { width, height, channels: 3 },
  })
    .webp({ quality: 88 })
    .toBuffer();
}

async function generateStill(index, size = 1024) {
  const data = Buffer.alloc(size * size * 3);
  const seed = index * 17.13;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / (size - 1);
      const v = y / (size - 1);
      const i = (y * size + x) * 3;
      const cx = u - 0.5;
      const cy = v - 0.48;
      const dist = Math.sqrt(cx * cx + cy * cy);

      // Mercury blob body
      const blob = Math.max(0, 1 - dist * (1.9 + Math.sin(seed) * 0.15));
      const rim = Math.pow(Math.max(0, 1 - Math.abs(dist - 0.32) * 8), 2);

      let r = 12 + blob * 90;
      let g = 16 + blob * 100;
      let b = 18 + blob * 110;

      // Specular highlight
      const hx = u - (0.38 + index * 0.04);
      const hy = v - (0.34 - index * 0.02);
      const spec = Math.exp(-(hx * hx + hy * hy) * 90) * 220;
      r += spec;
      g += spec;
      b += spec;

      // Jade/teal rim
      r += rim * 40;
      g += rim * 180;
      b += rim * 140;

      // Soft caustic streaks
      const streak = Math.sin((u + v + seed) * 18) * Math.exp(-dist * 3) * 28;
      r += streak * 0.8;
      g += streak;
      b += streak * 1.1;

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }
  }

  return sharp(data, {
    raw: { width: size, height: size, channels: 3 },
  })
    .webp({ quality: 86 })
    .toBuffer();
}

async function writeWebpFromFile(src, dest, maxEdge) {
  await sharp(src)
    .rotate()
    .resize(maxEdge, maxEdge, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(dest);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const outputs = [];

  const envSrc = forceGenerate ? null : findSource("env-metal");
  const envDest = path.join(OUT, "env-metal.webp");
  if (envSrc) {
    await writeWebpFromFile(envSrc, envDest, 2048);
    outputs.push({ file: "env-metal.webp", source: "higgsfield" });
  } else {
    await fs.promises.writeFile(envDest, await generateEnvMap(2048));
    outputs.push({ file: "env-metal.webp", source: "procedural" });
  }

  for (let n = 1; n <= 3; n++) {
    const name = `metal-still-0${n}`;
    const stillSrc = forceGenerate ? null : findSource(name);
    const stillDest = path.join(OUT, `${name}.webp`);
    if (stillSrc) {
      await writeWebpFromFile(stillSrc, stillDest, 1024);
      outputs.push({ file: `${name}.webp`, source: "higgsfield" });
    } else {
      await fs.promises.writeFile(stillDest, await generateStill(n, 1024));
      outputs.push({ file: `${name}.webp`, source: "procedural" });
    }
  }

  // Optional seamless loop — copy only if provided as webm
  if (!forceGenerate && fs.existsSync(SRC)) {
    for (const file of fs.readdirSync(SRC)) {
      if (path.parse(file).name === "metal-loop" && path.extname(file).toLowerCase() === ".webm") {
        const dest = path.join(OUT, "metal-loop.webm");
        fs.copyFileSync(path.join(SRC, file), dest);
        outputs.push({ file: "metal-loop.webm", source: "higgsfield" });
      }
    }
  }

  console.log(
    JSON.stringify(
      {
        out: "public/liquid/",
        outputs,
        hint: "Drop Higgsfield exports in tmp-screenshots/liquid/ then re-run without --generate",
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
