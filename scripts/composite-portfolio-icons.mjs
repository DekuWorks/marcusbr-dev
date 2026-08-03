#!/usr/bin/env node
/**
 * Composites project app icons with baked-in light backgrounds onto the
 * portfolio card color (#151C18) so they sit flush without white halos.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public", "projects");

const CARD_BG = { r: 21, g: 28, b: 24 }; // #151C18
const LIGHT_THRESHOLD = 242;
const DARK_THRESHOLD = 18;

// Light-corner icons: flood-fill edge light pixels to transparent.
const LIGHT_MATTE_ONLY = ["shuchu", "bookmarked", "rigscout", "241runners"];
// Dark-corner icons: flood-fill edge dark pixels to transparent.
const DARK_MATTE_ONLY = ["avryo"];

function cornersAreLight(data, width, height) {
  const sample = (x, y) => {
    const i = (y * width + x) * 4;
    return data[i] + data[i + 1] + data[i + 2];
  };
  const points = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  return points.some(([x, y]) => sample(x, y) >= LIGHT_THRESHOLD * 3);
}

function isLightPixel(data, i) {
  return (
    data[i] >= LIGHT_THRESHOLD &&
    data[i + 1] >= LIGHT_THRESHOLD &&
    data[i + 2] >= LIGHT_THRESHOLD
  );
}

function isDarkMattePixel(data, i) {
  return (
    data[i] <= DARK_THRESHOLD &&
    data[i + 1] <= DARK_THRESHOLD &&
    data[i + 2] <= DARK_THRESHOLD
  );
}

/** Flood-fill edge-connected dark pixels and replace with the card background. */
function replaceDarkMatte(data, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    const p = y * width + x;
    if (x < 0 || y < 0 || x >= width || y >= height || visited[p]) return;
    const i = (y * width + x) * 4;
    if (!isDarkMattePixel(data, i)) return;
    visited[p] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  for (let p = 0; p < width * height; p++) {
    if (!visited[p]) continue;
    const i = p * 4;
    data[i] = CARD_BG.r;
    data[i + 1] = CARD_BG.g;
    data[i + 2] = CARD_BG.b;
    data[i + 3] = 255;
  }
}

/** Flood-fill edge-connected dark pixels to transparent (keeps interior darks). */
async function removeDarkMatteIcon(projectId) {
  const input = path.join(PUBLIC, projectId, "icon.png");
  if (!fs.existsSync(input)) {
    console.warn(`⊘ Skipping ${projectId}: icon.png not found`);
    return;
  }

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    const p = y * width + x;
    if (x < 0 || y < 0 || x >= width || y >= height || visited[p]) return;
    const i = (y * width + x) * 4;
    if (!isDarkMattePixel(data, i)) return;
    visited[p] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  for (let p = 0; p < width * height; p++) {
    if (!visited[p]) continue;
    data[p * 4 + 3] = 0;
  }

  const webpPath = path.join(PUBLIC, projectId, "icon.webp");
  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .webp({ quality: 85 })
    .toFile(webpPath);

  console.log(`✓ ${projectId}: dark matte removed — squircle preserved`);
}

/** Flood-fill edge-connected light pixels to transparent (keeps interior whites). */
async function removeLightMatteIcon(projectId) {
  const input = path.join(PUBLIC, projectId, "icon.png");
  if (!fs.existsSync(input)) {
    console.warn(`⊘ Skipping ${projectId}: icon.png not found`);
    return;
  }

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    const p = y * width + x;
    if (x < 0 || y < 0 || x >= width || y >= height || visited[p]) return;
    const i = (y * width + x) * 4;
    if (!isLightPixel(data, i)) return;
    visited[p] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  for (let p = 0; p < width * height; p++) {
    if (visited[p]) data[p * 4 + 3] = 0;
  }

  const webpPath = path.join(PUBLIC, projectId, "icon.webp");
  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .webp({ quality: 85 })
    .toFile(webpPath);

  console.log(`✓ ${projectId}: matte removed — natural icon preserved`);
}

async function compositeIcon(projectId) {
  const input = path.join(PUBLIC, projectId, "icon.png");
  if (!fs.existsSync(input)) {
    console.warn(`⊘ Skipping ${projectId}: icon.png not found`);
    return;
  }

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (!cornersAreLight(data, info.width, info.height)) {
    replaceDarkMatte(data, info.width, info.height);
    console.log(`✓ ${projectId}: dark matte replaced with #151C18`);
  } else {
    for (let i = 0; i < data.length; i += 4) {
      if (isLightPixel(data, i)) {
        data[i + 3] = 0;
      }
    }
    replaceDarkMatte(data, info.width, info.height);
    console.log(`✓ ${projectId}: light matte removed, dark matte replaced`);
  }

  const cutout = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  const webpPath = path.join(PUBLIC, projectId, "icon.webp");
  await sharp({
    create: {
      width: info.width,
      height: info.height,
      channels: 3,
      background: CARD_BG,
    },
  })
    .composite([{ input: cutout }])
    .webp({ quality: 85 })
    .toFile(webpPath);

  console.log(`✓ ${projectId}: composited icon onto #151C18`);
}

async function main() {
  const onlyId = process.argv.find((arg) => arg.startsWith("--only="))?.split("=")[1];
  const lightMatteIds = onlyId
    ? LIGHT_MATTE_ONLY.includes(onlyId)
      ? [onlyId]
      : []
    : LIGHT_MATTE_ONLY;
  const darkMatteIds = onlyId
    ? DARK_MATTE_ONLY.includes(onlyId)
      ? [onlyId]
      : []
    : DARK_MATTE_ONLY;

  for (const id of lightMatteIds) {
    await removeLightMatteIcon(id);
  }
  for (const id of darkMatteIds) {
    await removeDarkMatteIcon(id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
