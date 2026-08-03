export type ProjectStatus =
  | "Planning"
  | "In Development"
  | "Active"
  | "Client Project";

export type ProjectFilter =
  | "all"
  | "mobile"
  | "saas"
  | "ai"
  | "client"
  | "planning";

export type FeaturedProject = {
  id: string;
  name: string;
  category: string;
  synopsis: string;
  longDescription: string;
  icon: string;
  screenshots: string[];
  screenshotAlts: string[];
  technologies: string[];
  status: ProjectStatus;
  statusLabel: string;
  accent: string;
  liveUrl?: string;
  repositoryUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  filters: Exclude<ProjectFilter, "all">[];
  conceptUI: boolean;
  /** Zero-based screenshot indices that show the app icon instead of a mockup. */
  conceptScreenshotIndices?: number[];
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  developmentFocus: string;
  trackerPhase: string;
  trackerProgress: number;
  trackerDetail?: string;
  lessonsLearned: string;
  disclaimer?: string;
  deviceFrame?: boolean;
  /** Optional 3D orbit position [x, y, z] for hero scene nodes. */
  orbitPosition?: [number, number, number];
};

const asset = (id: string, file: string) => `/projects/${id}/${file}`;

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "shuchu",
    name: "Shuchu",
    category: "Focus, Goals, and Personal Productivity Platform",
    synopsis:
      "Shuchu is a modern productivity platform that helps users turn goals into clear tasks, build consistent routines, track progress, and stay focused without unnecessary complexity.",
    longDescription:
      "Shuchu combines tasks, personal goals, routines, progress tracking, focus tools, reminders, and intelligent insights into a simple experience designed to help users consistently complete meaningful real-world objectives.",
    icon: asset("shuchu", "icon.webp"),
    screenshots: [asset("shuchu", "screenshot-01.webp")],
    screenshotAlts: [
      "Shuchu Today home dashboard with focus session card",
    ],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "Push notifications",
      "AI-assisted insights",
    ],
    status: "In Development",
    statusLabel: "Focus & Goal Management",
    accent: "#4ADE9A",
    caseStudyUrl: "/projects/shuchu/",
    featured: true,
    filters: ["mobile", "saas", "ai"],
    conceptUI: false,
    deviceFrame: true,
    problem:
      "Most productivity apps overwhelm users with features, jargon, and complex workflows — making it harder to stay consistent with real goals.",
    solution:
      "Shuchu keeps the experience simple: clear tasks, personal goals, routines, and progress tracking in one focused mobile app with optional AI-assisted insights.",
    features: [
      "Today dashboard with tasks and focus overview",
      "Personal goals with measurable progress",
      "Routines and recurring task support",
      "Focus sessions and distraction protection",
      "Reminders and push notifications",
      "AI-assisted insights for habit patterns",
    ],
    architecture:
      "React Native + Expo client with Supabase for auth, PostgreSQL data, real-time sync, and server-side logic for notifications and insight generation.",
    developmentFocus:
      "App Store release live — refining Today dashboard, goal-to-task linking, and AI-assisted insights.",
    trackerPhase: "In Development",
    trackerProgress: 80,
    trackerDetail:
      "App Store live — refining tasks, goals, and insights.",
    lessonsLearned:
      "Shipping to the App Store early validated the core loop; simplicity wins over gamified complexity for daily focus habits.",
  },
  {
    id: "daypilot",
    name: "DayPilot",
    category: "AI-Powered Calendar and Scheduling Platform",
    synopsis:
      "DayPilot is an AI-powered calendar and scheduling platform for individuals, teams, and businesses.",
    longDescription:
      "DayPilot combines intelligent scheduling, automated workflows, and AI-driven productivity tools to help individuals, teams, and businesses reduce manual coordination and scale operations.",
    icon: asset("daypilot", "icon.webp"),
    screenshots: [asset("daypilot", "screenshot-01.webp")],
    screenshotAlts: [
      "DayPilot dashboard with tasks, schedule, and Pilot Brief AI",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
    ],
    status: "In Development",
    statusLabel: "AI Scheduling SaaS",
    accent: "#818CF8",
    liveUrl: "https://www.daypilot.co",
    caseStudyUrl: "/projects/daypilot/",
    featured: true,
    filters: ["saas", "ai"],
    conceptUI: false,
    problem:
      "Teams waste hours coordinating schedules, rescheduling meetings, and juggling calendars across tools — manual scheduling does not scale.",
    solution:
      "DayPilot uses AI to automate scheduling workflows, surface optimal meeting times, and unify calendars for individuals, teams, and businesses in one platform.",
    features: [
      "Unified calendar dashboard for individuals and teams",
      "AI-assisted scheduling and availability matching",
      "Automated meeting coordination and reminders",
      "Team and business scheduling workflows",
      "Integration-ready architecture with Supabase backend",
      "Responsive web experience built with Next.js",
    ],
    architecture:
      "Next.js + React web app with TypeScript, Supabase for auth and data, and an AI layer for intelligent scheduling suggestions and workflow automation.",
    developmentFocus:
      "Live beta at daypilot.co — shipping core dashboard, Pilot Brief AI, and team scheduling workflows.",
    trackerPhase: "In Development",
    trackerProgress: 75,
    trackerDetail:
      "Live beta — core dashboard and Pilot Brief AI shipping next.",
    lessonsLearned:
      "A live beta surfaces real scheduling friction fast — users need instant availability clarity before AI suggestions add value.",
  },
  {
    id: "rigscout",
    name: "RigScout",
    category: "PC Parts Price Tracking and Build Platform",
    synopsis:
      "RigScout helps PC builders find components, compare retailer prices, track complete builds, monitor price history, and receive deal alerts.",
    longDescription:
      "RigScout combines a dark-first hardware dashboard, market analytics, and a beginner build assistant so builders can discover parts, compare prices across retailers, plan compatible builds, and catch deal alerts without juggling tabs.",
    icon: asset("rigscout", "icon.webp"),
    screenshots: [asset("rigscout", "screenshot-01.webp")],
    screenshotAlts: [
      "RigScout dashboard with build tracking and market analytics",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "FastAPI",
      "Python",
      "TanStack Query",
    ],
    status: "In Development",
    statusLabel: "PC Build Intelligence",
    accent: "#00C2FF",
    liveUrl: "https://rigscout.co",
    caseStudyUrl: "/projects/rigscout/",
    featured: true,
    filters: ["saas"],
    conceptUI: false,
    problem:
      "PC builders bounce between retailer sites, spreadsheets, and forums to track prices, check compatibility, and catch deals — losing time and missing drops.",
    solution:
      "RigScout unifies part discovery, retailer price comparison, build planning, price history, and deal alerts in one approachable dashboard for beginners and enthusiasts.",
    features: [
      "Discover parts with search, filters, and deal scoring",
      "Retailer price comparison and 90-day history charts",
      "Build Lab with compatibility guidance and shareable builds",
      "Watchlists and deal alert notifications",
      "Beginner Learn guides for PC building basics",
      "Dashboard with market analytics and build summaries",
    ],
    architecture:
      "React + Vite web app with Supabase auth/Postgres/RLS, a FastAPI Python service for retailer sync and alert jobs, and GitHub Pages for the frontend.",
    developmentFocus:
      "Live at rigscout.co — wiring live retailer credentials, refining Build Lab, and expanding alert delivery.",
    trackerPhase: "In Development",
    trackerProgress: 70,
    trackerDetail:
      "Live beta — catalog, builds, and alerts shipping; retailer keys next.",
    lessonsLearned:
      "A production-safe empty catalog beats demo data in prod — real retailer feeds must be explicit before the product feels trustworthy.",
    orbitPosition: [0.95, -0.25, 0.7],
  },
  {
    id: "bookmarked",
    name: "Bookmarked",
    category: "Social Reading and Book Discovery Platform",
    synopsis:
      "Bookmarked is a social reading platform that helps readers track books, write reviews, discover events, join book clubs, communicate with other readers, and build communities around the stories they love.",
    longDescription:
      "Bookmarked combines book tracking, reviews, reading progress, community groups, event discovery, chat, author and affiliate links, and reader-focused social features in one modern platform.",
    icon: asset("bookmarked", "icon.webp"),
    screenshots: [asset("bookmarked", "screenshot-01.webp")],
    screenshotAlts: [
      "Bookmarked Library page with bookshelf view and reading shelves",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Real-time messaging",
    ],
    status: "Client Project",
    statusLabel: "Social Reading Platform",
    accent: "#E8B86D",
    liveUrl: "https://www.bookmarked.online",
    caseStudyUrl: "/projects/bookmarked/",
    featured: true,
    filters: ["saas", "client"],
    conceptUI: false,
    problem:
      "Readers use fragmented tools for tracking, reviews, clubs, and events — losing community connection and discovery opportunities.",
    solution:
      "Bookmarked unifies book tracking, social reviews, clubs, events, and messaging into one community-driven reading platform.",
    features: [
      "Book tracking and reading progress",
      "Reviews and reader discovery",
      "Book clubs and community groups",
      "Event discovery and RSVPs",
      "Real-time reader messaging",
      "Author and affiliate link integration",
    ],
    architecture:
      "React + TypeScript SPA with Supabase backend, PostgreSQL for relational data, and real-time channels for chat and community updates.",
    developmentFocus:
      "Production site live at bookmarked.online — expanding clubs, messaging, and event discovery for ongoing reader engagement.",
    trackerPhase: "Live in Production",
    trackerProgress: 100,
    trackerDetail:
      "Production client site — ongoing feature delivery.",
    lessonsLearned:
      "A live client platform proves community features drive retention — readers stay when they connect around shared stories.",
  },
  {
    id: "avryo",
    name: "Avryo",
    category: "AI-Powered Personal Financial Command Center",
    synopsis:
      "Avryo is a unified financial platform that helps users understand bank accounts, cards, trusts, recurring expenses, cash flow, credit, and overall financial health from one dashboard.",
    longDescription:
      "Avryo brings checking, savings, prepaid cards, trust distributions, credit cards, bills, spending, net worth, and AI-powered financial explanations into one secure platform.",
    icon: asset("avryo", "icon.webp"),
    screenshots: [asset("avryo", "screenshot-01.webp")],
    screenshotAlts: ["Avryo net-worth dashboard overview"],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Plaid",
      "Secure authentication",
      "AI-generated explanations",
    ],
    status: "Planning",
    statusLabel: "Unified Financial Intelligence",
    accent: "#2DD4BF",
    caseStudyUrl: "/projects/avryo/",
    featured: true,
    filters: ["mobile", "saas", "ai", "planning"],
    conceptUI: false,
    deviceFrame: true,
    disclaimer:
      "Avryo provides informational insights only and is not financial, legal, or investment advice.",
    problem:
      "Personal finances are scattered across banks, cards, trusts, and bills — making it hard to see cash flow, net worth, and financial health in one place.",
    solution:
      "Avryo aggregates accounts, spending, bills, and credit into a unified dashboard with AI-powered explanations of financial health.",
    features: [
      "Unified account dashboard",
      "Total available balance and net-worth overview",
      "Spending breakdowns and recurring bills",
      "Credit-card and trust visibility",
      "Real-time account alerts",
      "AI-powered financial health explanations",
      "Color-coded charts and percentage breakdowns",
    ],
    architecture:
      "React Native + Expo mobile client, Supabase for auth and data, Plaid for financial account aggregation, and AI layer for natural-language financial insights.",
    developmentFocus:
      "MVP net-worth dashboard UI built in simulator — scoping Plaid integration and multi-account data model.",
    trackerPhase: "Planning",
    trackerProgress: 25,
    trackerDetail:
      "MVP dashboard UI built — Plaid integration scoped.",
    lessonsLearned:
      "Concept UI validated the dashboard layout early — trustworthy account aggregation must come before AI explanations add value.",
  },
  {
    id: "241runners",
    name: "241 Runners",
    category: "Missing Person Awareness and Community Safety App",
    synopsis:
      "241 Runners is a community-driven mobile app for missing person cases, sighting reports, and real-time alerts that help families and responders act faster.",
    longDescription:
      "241 Runners connects families, volunteers, and responders around active missing person cases — with secure profiles, map-based sightings, photo evidence, push alerts, and Apple/Google sign-in built for privacy and community response.",
    icon: asset("241runners", "icon.webp"),
    screenshots: [asset("241runners", "screenshot-01.webp")],
    screenshotAlts: [
      "241 Runners mobile sign-in screen with Apple and Google authentication",
    ],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      ".NET 8",
      "Azure",
      "Azure SQL",
      "Push notifications",
      "Maps & location",
    ],
    status: "Client Project",
    statusLabel: "Missing Person Safety App",
    accent: "#C1392B",
    liveUrl: "https://241runnersawareness.org",
    caseStudyUrl: "/projects/241runners/",
    featured: true,
    filters: ["mobile", "client"],
    conceptUI: false,
    deviceFrame: true,
    problem:
      "Families and communities lack a fast, connected way to share verified missing person information, report sightings, and alert nearby helpers in real time.",
    solution:
      "241 Runners puts case browsing, GPS sighting reports, secure auth, and push alerts in one mobile app so communities can respond faster and help reunite families.",
    features: [
      "Active missing person case browsing",
      "Sighting reports with photos and GPS location",
      "Interactive map of nearby cases and alerts",
      "Push notifications for new cases and updates",
      "Apple Sign-In and Google Sign-In",
      "Role-aware profiles for parents, guardians, and responders",
    ],
    architecture:
      "React Native + Expo mobile client with a .NET 8 API on Azure, Azure SQL for case data, secure auth, and push notifications for community alerts.",
    developmentFocus:
      "App Store and Play review cycle — polishing case flows, map sightings, and notification reliability for production release.",
    trackerPhase: "Client Delivery",
    trackerProgress: 90,
    trackerDetail:
      "Mobile app built — store review and production hardening in progress.",
    lessonsLearned:
      "Mission-critical safety apps need privacy-first auth and clear emergency disclaimers before feature expansion earns trust.",
    orbitPosition: [-0.9, 0.45, -0.35],
  },
  {
    id: "gridlock",
    name: "Gridlock",
    category: "Secure Firearm Inventory and Ownership Management App",
    synopsis:
      "Gridlock is a mobile-first firearm inventory and ownership management platform that helps responsible owners organize their collection, document equipment, manage loadouts, store records, and generate private-sale documentation.",
    longDescription:
      "Gridlock is designed as a secure digital vault for firearm records, accessories, maintenance history, loadouts, receipts, serial-number documentation, and ownership-transfer paperwork.",
    icon: asset("gridlock", "icon.webp"),
    screenshots: [
      asset("gridlock", "screenshot-01.webp"),
      asset("gridlock", "screenshot-02.webp"),
    ],
    screenshotAlts: [
      "Gridlock sign-in screen for secure armory access",
      "Gridlock welcome landing screen with brand identity",
    ],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Secure storage",
      "Biometric authentication",
    ],
    status: "Planning",
    statusLabel: "Secure Ownership Management",
    accent: "#6B8CAE",
    caseStudyUrl: "/projects/gridlock/",
    featured: true,
    filters: ["mobile", "planning"],
    conceptUI: false,
    deviceFrame: true,
    disclaimer:
      "Gridlock is an inventory and documentation tool — not a marketplace. Firearm laws vary by jurisdiction; users are responsible for compliance.",
    problem:
      "Responsible owners lack a secure, organized way to document collections, maintenance, loadouts, and ownership-transfer records.",
    solution:
      "Gridlock provides a biometric-protected digital vault for inventory records, accessories, maintenance history, and private-sale documentation.",
    features: [
      "Secure inventory dashboard",
      "Individual item profiles with documentation",
      "Loadout and accessory organization",
      "Maintenance and receipt history",
      "Bill-of-sale document generator",
      "Biometric authentication and encrypted storage",
    ],
    architecture:
      "React Native + Expo with Supabase backend, encrypted local storage for sensitive fields, and biometric gate for app access.",
    developmentFocus:
      "Auth and onboarding screens built — inventory CRUD, document generation, and compliance disclaimers next for MVP.",
    trackerPhase: "Planning",
    trackerProgress: 15,
    trackerDetail:
      "Auth and onboarding built — inventory MVP next.",
    lessonsLearned:
      "Nailing secure sign-in and onboarding first sets the trust bar — inventory features depend on that foundation.",
  },
];

export const FEATURED_PROJECT_ORDER = [
  "shuchu",
  "daypilot",
  "rigscout",
  "241runners",
  "bookmarked",
  "avryo",
  "gridlock",
] as const;

/** Display order for the Currently Building tracker on the homepage. */
export const CURRENTLY_BUILDING_ORDER = [
  "rigscout",
  "241runners",
  "daypilot",
  "shuchu",
  "bookmarked",
  "avryo",
  "gridlock",
] as const;

export const PROJECT_FILTERS: {
  id: ProjectFilter;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "saas", label: "SaaS" },
  { id: "ai", label: "AI" },
  { id: "client", label: "Client" },
  { id: "planning", label: "Planning" },
];

export function getFeaturedProjects(): FeaturedProject[] {
  return FEATURED_PROJECT_ORDER.map(
    (id) => FEATURED_PROJECTS.find((p) => p.id === id)!,
  );
}

export function getCurrentlyBuildingProjects(): FeaturedProject[] {
  return CURRENTLY_BUILDING_ORDER.map(
    (id) => FEATURED_PROJECTS.find((p) => p.id === id)!,
  );
}

export function getProjectById(id: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((p) => p.id === id);
}

export function getProjectLiveUrlLabel(
  project: Pick<FeaturedProject, "liveUrl">,
): string {
  return project.liveUrl ? "Link" : "Live Demo";
}

export function isConceptScreenshot(
  project: Pick<FeaturedProject, "conceptScreenshotIndices">,
  index: number,
): boolean {
  return project.conceptScreenshotIndices?.includes(index) ?? false;
}

export function getProjectMetadata(project: FeaturedProject) {
  const title = `${project.name} | ${project.statusLabel} by Marcus Brown`;
  const description = project.synopsis;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcusbr.dev"}/projects/${project.id}/`;
  const image = project.screenshots[0];

  return {
    title,
    description,
    url,
    image,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, alt: project.screenshotAlts[0] }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
  };
}
