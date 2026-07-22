import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SOURCE =
  "/Users/marcusbrown/.cursor/projects/Users-marcusbrown-Developer-marcusbr-dev/assets/B05CAA72-D6CA-43DC-8BA7-5178270B524A-7a2ea880-9936-40b2-862f-bbbf975af864.png";
const PUBLIC = path.resolve("public");
const APP = path.resolve("app");
const SITE_BG = { r: 13, g: 19, b: 16, alpha: 1 };

function keyBlackToAlpha(data, width, height, threshold = 28) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r <= threshold && g <= threshold && b <= threshold) {
        data[i + 3] = 0;
      }
    }
  }
}

async function loadTransparentLogo() {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  keyBlackToAlpha(data, info.width, info.height);

  const trimmed = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();

  return sharp(trimmed);
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });
  await mkdir(APP, { recursive: true });

  const logo = await loadTransparentLogo();
  const meta = await logo.metadata();

  await logo.clone().png().toFile(path.join(PUBLIC, "logo.png"));
  await logo.clone().webp({ quality: 90 }).toFile(path.join(PUBLIC, "logo.webp"));

  const faviconSize = 32;
  const favicon = await sharp(SOURCE)
    .resize(faviconSize, faviconSize, { fit: "contain", background: SITE_BG })
    .flatten({ background: SITE_BG })
    .png()
    .toBuffer();

  await sharp(favicon).toFile(path.join(APP, "icon.png"));
  await sharp(favicon).toFile(path.join(PUBLIC, "favicon.ico"));

  console.log(
    JSON.stringify({
      logoWidth: meta.width,
      logoHeight: meta.height,
      outputs: [
        "public/logo.png",
        "public/logo.webp",
        "app/icon.png",
        "public/favicon.ico",
      ],
    }),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
