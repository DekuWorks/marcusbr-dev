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

This project is configured for static export and GitHub Pages deployment.

### 1. Push to GitHub

Create a repository named `marcusbr-dev` (or your preferred name) and push this project to the `main` branch.

### 2. Enable GitHub Pages

1. Go to your repository **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` runs automatically on every push to `main`

### 3. Custom Domain

The `public/CNAME` file is configured for:

```
marcusbr.dev
```

In **Settings → Pages → Custom domain**, enter `marcusbr.dev` and configure your DNS:

| Type  | Name | Value              |
| ----- | ---- | ------------------ |
| A     | @    | 185.199.108.153    |
| A     | @    | 185.199.109.153    |
| A     | @    | 185.199.110.153    |
| A     | @    | 185.199.111.153    |
| CNAME | www  | `<username>.github.io` |

Enable **Enforce HTTPS** once DNS propagates.

### 4. Replace Resume

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
