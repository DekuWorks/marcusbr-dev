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
│   ├── globals.css      # Brand theme & utilities
│   ├── layout.tsx       # Root layout & metadata
│   └── page.tsx         # Main portfolio page
├── components/          # Section & UI components
├── public/
│   ├── CNAME            # Custom domain for GitHub Pages
│   └── Marcus-Brown-Resume.pdf
├── .github/workflows/
│   └── deploy.yml       # GitHub Pages CI/CD
├── next.config.ts       # Static export config
└── tailwind.config.ts   # Brand colors & theme
```

## Brand Colors

| Token      | Hex       |
| ---------- | --------- |
| Background | `#0D1310` |
| Jade Green | `#3EB489` |
| Cream Text | `#EEE7DC` |
| Card       | `#151C18` |
| Muted Text | `#B7B2A8` |

## License

© 2026 Marcus Brown • DekuWorks • [marcusbr.dev](https://marcusbr.dev)
