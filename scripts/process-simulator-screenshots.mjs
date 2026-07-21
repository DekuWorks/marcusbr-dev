#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "tmp-screenshots");
const PUBLIC = path.join(ROOT, "public", "projects");

const captures = [
  { id: "shuchu", file: "shuchu-raw-01.png", slots: [1] },
  { id: "avryo", file: "avryo-raw-01.png", slots: [1] },
];

async function processCapture({ id, file, slots }) {
  const input = path.join(TMP, file);
  if (!fs.existsSync(input)) {
    console.warn(`⚠ Skipping ${id}: ${file} not found`);
    return false;
  }

  const dir = path.join(PUBLIC, id);
  fs.mkdirSync(dir, { recursive: true });

  for (const slot of slots) {
    const base = `screenshot-0${slot}`;
    const pngPath = path.join(dir, `${base}.png`);
    const webpPath = path.join(dir, `${base}.webp`);

    await sharp(input)
      .resize(390, 844, { fit: "cover", position: "top" })
      .png({ quality: 90 })
      .toFile(pngPath);

    await sharp(pngPath).webp({ quality: 82 }).toFile(webpPath);
    console.log(`✓ ${id}/${base}.webp`);
  }

  return true;
}

async function main() {
  const results = [];
  for (const capture of captures) {
    results.push({ id: capture.id, ok: await processCapture(capture) });
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
