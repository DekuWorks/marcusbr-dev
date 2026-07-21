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
  {
    id: "shuchu",
    files: [
      { file: "shuchu-raw-01.png", slot: 1 },
      { file: "shuchu-raw-02.png", slot: 2 },
      { file: "shuchu-raw-03.png", slot: 3 },
      { file: "shuchu-raw-04.png", slot: 4 },
    ],
  },
  {
    id: "avryo",
    files: [
      { file: "avryo-raw-01.png", slot: 1 },
      { file: "avryo-raw-02.png", slot: 2 },
      { file: "avryo-raw-03.png", slot: 3 },
      { file: "avryo-raw-04.png", slot: 4 },
    ],
  },
  {
    id: "gridlock",
    files: [
      { file: "gridlock-raw-01.png", slot: 1 },
      { file: "gridlock-raw-03.png", slot: 2 },
    ],
  },
];

async function processCapture({ id, file, slot }) {
  const input = path.join(TMP, file);
  if (!fs.existsSync(input)) {
    console.warn(`⚠ Skipping ${id} slot ${slot}: ${file} not found`);
    return false;
  }

  const dir = path.join(PUBLIC, id);
  fs.mkdirSync(dir, { recursive: true });

  const base = `screenshot-0${slot}`;
  const pngPath = path.join(dir, `${base}.png`);
  const webpPath = path.join(dir, `${base}.webp`);

  await sharp(input)
    .resize(390, 844, { fit: "cover", position: "top" })
    .png({ quality: 90 })
    .toFile(pngPath);

  await sharp(pngPath).webp({ quality: 82 }).toFile(webpPath);
  console.log(`✓ ${id}/${base}.webp`);
  return true;
}

async function main() {
  const results = [];
  for (const capture of captures) {
    for (const { file, slot } of capture.files) {
      const ok = await processCapture({ id: capture.id, file, slot });
      results.push({ id: capture.id, slot, ok });
    }
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
