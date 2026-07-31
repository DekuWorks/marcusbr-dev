# marcusbr.dev

Developer portfolio for **Marcus Brown** — Senior Full-Stack Developer & AI Engineer, founder of [DekuWorks](https://marcusbr.dev).

A polished one-page portfolio showcasing projects, skills, experience, and contact actions. Built as a static site and deployed to GitHub Pages with a custom domain.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, static export)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [GitHub Pages](https://pages.github.com/)

## Local Setup

```bash
git clone https://github.com/<your-username>/marcusbr-dev.git
cd marcusbr-dev
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

### Other Commands

```bash
npm run build   # Static export to ./out
npm run lint    # Run ESLint
npm start       # Serve production build (after build)
```

## GitHub Pages Deployment

The site auto-deploys on every push to `main` via `.github/workflows/deploy.yml`.

- **Repository:** [DekuWorks/marcusbr-dev](https://github.com/DekuWorks/marcusbr-dev)
- **Domain:** [marcusbr.dev](https://marcusbr.dev)

### GitHub Pages Settings

In **Settings → Pages**:

1. **Source:** GitHub Actions
2. **Custom domain:** `marcusbr.dev`
3. **Enforce HTTPS:** enabled

### GoDaddy DNS

Configure these records at GoDaddy:

| Type  | Name | Value                  |
| ----- | ---- | ---------------------- |
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | dekuworks.github.io    |

The `public/CNAME` file contains `marcusbr.dev` for GitHub Pages custom domain support.

### Replace Resume

Replace `public/Marcus-Brown-Resume.pdf` with your actual resume PDF. The download button in the Hero section links to this file.

## Project Structure

```
marcusbr-dev/
├── app/
│   ├── globals.css           # Brand theme & utilities
│   ├── layout.tsx            # Root layout & metadata
│   ├── page.tsx              # Main portfolio page
│   └── projects/[slug]/      # Featured product detail pages
├── components/
│   ├── cinematic/            # Atmosphere, roles, section reveals
│   ├── projects/             # Featured product cards & gallery
│   └── sections/             # Page sections (FeaturedProducts)
├── lib/
│   ├── cinematic/            # Ambient asset paths & hero roles
│   ├── projects.ts           # Typed featured product data model
│   └── site.ts               # Site metadata & contact info
├── public/cinematic/         # Abstract ambient WebP textures
├── public/projects/          # Per-project icons & screenshots
│   ├── bookmarked/
│   ├── gridlock/
│   ├── shuchu/
│   └── avryo/
├── docs/
│   └── project-assets-needed.md
├── scripts/
│   └── generate-project-assets.mjs
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages CI/CD
├── next.config.ts            # Static export config
└── tailwind.config.ts        # Brand colors & theme
```

## Featured Products Architecture

The **Featured Products** section (`components/sections/FeaturedProjects.tsx`) showcases four platforms:

1. **Shuchu** — Focus and goal management
2. **Bookmarked** — Social reading platform
3. **Avryo** — Unified financial intelligence
4. **Gridlock** — Secure ownership management

- **Data model:** `lib/projects.ts` (`FeaturedProject` type)
- **Cards:** `components/projects/FeaturedProjectCard.tsx`
- **Gallery:** `components/projects/ProjectScreenshotGallery.tsx` (carousel + lightbox)
- **Detail pages:** `app/projects/[slug]/page.tsx` with `generateStaticParams` for static export
- **Assets:** `public/projects/{id}/icon.png`, `icon.webp`, `screenshot-0X.webp`

Regenerate concept UI placeholders:

```bash
node scripts/generate-project-assets.mjs
```

See `docs/project-assets-needed.md` for the asset checklist.

## Brand Colors

| Token      | Hex       |
| ---------- | --------- |
| Background | `#050807` |
| Secondary Background | `#0A100D` |
| Jade Green | `#3EB489` |
| Jade Bright | `#4ADE9A` |
| Jade Border | `rgba(62, 180, 137, 0.22)` |
| Foreground | `#F2F4F3` |
| Card       | `rgba(14, 20, 17, 0.72)` |
| Muted Text | `#9AA39E` |

## Cinematic Atmosphere

Abstract ambient textures live in `public/cinematic/` (WebP, lazy-loaded). Generated offline via Higgsfield and committed locally — production never depends on temporary CDN URLs. See `public/cinematic/README.md`.

## License

© 2026 Marcus Brown • DekuWorks • [marcusbr.dev](https://marcusbr.dev)
