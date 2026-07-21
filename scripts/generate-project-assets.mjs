#!/usr/bin/env node
/**
 * Generates placeholder project icons and concept UI screenshots.
 * TODO: Replace with approved final assets — see docs/project-assets-needed.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public", "projects");

const projects = [
  {
    id: "bookmarked",
    name: "Bookmarked",
    accent: "#E8B86D",
    iconLetter: "B",
    screens: [
      { title: "Discover", subtitle: "Trending reads & clubs" },
      { title: "Book Details", subtitle: "Progress · Reviews" },
      { title: "Book Club", subtitle: "Community discussion" },
      { title: "Events", subtitle: "Local reader meetups" },
    ],
    mobile: false,
  },
  {
    id: "gridlock",
    name: "Gridlock",
    accent: "#6B8CAE",
    iconLetter: "G",
    screens: [
      { title: "Inventory", subtitle: "12 items documented" },
      { title: "Item Profile", subtitle: "Records & maintenance" },
      { title: "Loadouts", subtitle: "Accessories organized" },
      { title: "Bill of Sale", subtitle: "Transfer document" },
    ],
    mobile: true,
  },
  {
    id: "shuchu",
    name: "Shuchu",
    accent: "#4ADE9A",
    iconLetter: "S",
    screens: [
      { title: "Today", subtitle: "3 tasks · 1 goal" },
      { title: "Goals", subtitle: "Track your progress" },
      { title: "Task Details", subtitle: "Due today · Focus" },
      { title: "Insights", subtitle: "Weekly progress" },
    ],
    mobile: true,
  },
  {
    id: "avryo",
    name: "Avryo",
    accent: "#2DD4BF",
    iconLetter: "A",
    screens: [
      { title: "Net Worth", subtitle: "$124,580 total" },
      { title: "Accounts", subtitle: "4 connected" },
      { title: "Spending", subtitle: "Monthly breakdown" },
      { title: "AI Insights", subtitle: "Financial health" },
    ],
    mobile: true,
  },
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function iconSvg({ letter, accent, name }) {
  const safeName = escapeXml(name);
  return `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#151C18"/>
      <stop offset="100%" style="stop-color:#0D1310"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${accent}"/>
      <stop offset="100%" style="stop-color:${accent}88"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect x="24" y="24" width="464" height="464" rx="96" fill="none" stroke="${accent}" stroke-width="4" opacity="0.4"/>
  <text x="256" y="290" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="220" font-weight="700" fill="url(#accent)">${letter}</text>
  <text x="256" y="420" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="500" fill="#B7B2A8" opacity="0.8">${safeName}</text>
</svg>`;
}

function screenshotSvg({ title, subtitle, accent, name, index, mobile }) {
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safeName = escapeXml(name);
  const w = mobile ? 390 : 1280;
  const h = mobile ? 844 : 800;
  const cardY = mobile ? 180 : 120;
  const cardH = mobile ? 520 : 560;

  const bars = [0.72, 0.55, 0.88, 0.42]
    .map((pct, i) => {
      const barW = mobile ? 280 * pct : 900 * pct;
      const x = mobile ? 55 : 80;
      const y = cardY + 140 + i * (mobile ? 52 : 56);
      return `<rect x="${x}" y="${y}" width="${barW}" height="${mobile ? 28 : 32}" rx="8" fill="${accent}" opacity="${0.15 + i * 0.08}"/>`;
    })
    .join("");

  const badge = `<rect x="${mobile ? 55 : 80}" y="${cardY + 20}" width="120" height="28" rx="14" fill="${accent}" opacity="0.2"/>
  <text x="${mobile ? 115 : 140}" y="${cardY + 40}" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="600" fill="${accent}">Concept UI</text>`;

  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg${index}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#101813"/>
      <stop offset="100%" style="stop-color:#0D1310"/>
    </linearGradient>
    <linearGradient id="card${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#151C18"/>
      <stop offset="100%" style="stop-color:#101813"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg${index})"/>
  <rect x="0" y="0" width="${w}" height="${mobile ? 80 : 64}" fill="#151C18" opacity="0.9"/>
  <text x="${mobile ? 24 : 40}" y="${mobile ? 50 : 40}" font-family="system-ui" font-size="${mobile ? 18 : 16}" font-weight="600" fill="#EEE7DC">${safeName}</text>
  <text x="${mobile ? 24 : 40}" y="${cardY - 16}" font-family="system-ui" font-size="${mobile ? 28 : 32}" font-weight="700" fill="#EEE7DC">${safeTitle}</text>
  <text x="${mobile ? 24 : 40}" y="${cardY + 16}" font-family="system-ui" font-size="${mobile ? 15 : 16}" fill="#B7B2A8">${safeSubtitle}</text>
  <rect x="${mobile ? 24 : 40}" y="${cardY + 40}" width="${mobile ? 342 : 1200}" height="${cardH}" rx="16" fill="url(#card${index})" stroke="rgba(62,180,137,0.22)" stroke-width="1"/>
  ${badge}
  ${bars}
  <circle cx="${mobile ? 320 : 1100}" cy="${cardY + cardH - 60}" r="40" fill="${accent}" opacity="0.25"/>
  <circle cx="${mobile ? 320 : 1100}" cy="${cardY + cardH - 60}" r="24" fill="${accent}" opacity="0.5"/>
</svg>`;
}

async function writeImage(dir, name, svg, width, height) {
  const pngPath = path.join(dir, name.replace(".webp", ".png"));
  const webpPath = path.join(dir, name.endsWith(".webp") ? name : `${name}.webp`);

  const buffer = Buffer.from(svg);
  const pipeline = sharp(buffer).resize(width, height);

  await pipeline.png({ quality: 90 }).toFile(pngPath);
  await sharp(pngPath).webp({ quality: 82 }).toFile(webpPath);
}

async function main() {
  for (const project of projects) {
    const dir = path.join(PUBLIC, project.id);
    fs.mkdirSync(dir, { recursive: true });

    const iconSvgStr = iconSvg({
      letter: project.iconLetter,
      accent: project.accent,
      name: project.name,
    });
    await writeImage(dir, "icon.webp", iconSvgStr, 512, 512);
    await sharp(path.join(dir, "icon.png")).webp({ quality: 82 }).toFile(path.join(dir, "icon.webp"));

    for (let i = 0; i < project.screens.length; i++) {
      const screen = project.screens[i];
      const svg = screenshotSvg({
        ...screen,
        accent: project.accent,
        name: project.name,
        index: i,
        mobile: project.mobile,
      });
      const w = project.mobile ? 390 : 1280;
      const h = project.mobile ? 844 : 800;
      const filename = `screenshot-0${i + 1}.webp`;
      await writeImage(dir, filename, svg, w, h);
    }

    console.log(`✓ Generated assets for ${project.name}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
