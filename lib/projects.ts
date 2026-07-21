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
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  developmentFocus: string;
  lessonsLearned: string;
  disclaimer?: string;
  deviceFrame?: boolean;
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
    screenshots: [
      asset("shuchu", "screenshot-01.webp"),
      asset("shuchu", "screenshot-02.webp"),
      asset("shuchu", "screenshot-03.webp"),
      asset("shuchu", "screenshot-04.webp"),
    ],
    screenshotAlts: [
      "Shuchu login screen with Sign in with Apple and offline mode",
      "Shuchu goals overview screen",
      "Shuchu task details view",
      "Shuchu progress and insights screen",
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
    statusLabel: "Focus and Goal Management",
    accent: "#4ADE9A",
    liveUrl: "https://apps.apple.com/us/app/shuchu-focus/id6792583924",
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
      "Refining the Today experience, improving goal-to-task linking, and expanding AI-assisted progress insights while keeping the interface minimal.",
    lessonsLearned:
      "Simplicity wins — users respond better to clear tasks and goals than gamified complexity. Mobile-first focus sessions drive daily engagement.",
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
    screenshots: [
      asset("daypilot", "screenshot-01.webp"),
      asset("daypilot", "screenshot-02.webp"),
      asset("daypilot", "screenshot-03.webp"),
      asset("daypilot", "screenshot-04.webp"),
    ],
    screenshotAlts: [
      "DayPilot calendar dashboard overview",
      "DayPilot team scheduling view",
      "DayPilot AI scheduling assistant",
      "DayPilot workflow automation settings",
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
    conceptUI: true,
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
      "Shipping core calendar views, AI scheduling assistant, and team coordination features while refining the onboarding flow for business accounts.",
    lessonsLearned:
      "Scheduling UX lives or dies on speed — users need instant clarity on availability before AI suggestions add value.",
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
    screenshots: [
      asset("bookmarked", "screenshot-01.webp"),
      asset("bookmarked", "screenshot-02.webp"),
      asset("bookmarked", "screenshot-03.webp"),
      asset("bookmarked", "screenshot-04.webp"),
    ],
    screenshotAlts: [
      "Bookmarked discovery and home dashboard",
      "Bookmarked book details and reading tracker",
      "Bookmarked book club and community screen",
      "Bookmarked events and messaging screen",
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
    conceptUI: true,
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
      "Expanding community features, improving event discovery, and strengthening reader engagement through clubs and social discovery.",
    lessonsLearned:
      "Community features drive retention — readers stay when they can connect around shared stories, not just track shelves.",
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
    screenshots: [
      asset("avryo", "screenshot-01.webp"),
      asset("avryo", "screenshot-02.webp"),
      asset("avryo", "screenshot-03.webp"),
      asset("avryo", "screenshot-04.webp"),
    ],
    screenshotAlts: [
      "Avryo net-worth dashboard overview",
      "Avryo connected accounts screen",
      "Avryo spending breakdown chart",
      "Avryo AI financial health insights screen",
    ],
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
      "Defining the data model for multi-account aggregation, designing net-worth visualizations, and scoping secure Plaid integration.",
    lessonsLearned:
      "Financial clarity starts with trustworthy aggregation — users need one honest view before AI explanations add value.",
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
      asset("gridlock", "screenshot-03.webp"),
      asset("gridlock", "screenshot-04.webp"),
    ],
    screenshotAlts: [
      "Gridlock inventory dashboard",
      "Gridlock individual item profile",
      "Gridlock loadout and accessory organizer",
      "Gridlock bill-of-sale document generator preview",
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
    conceptUI: true,
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
      "MVP scoping around secure inventory CRUD, document generation templates, and jurisdiction-aware compliance disclaimers.",
    lessonsLearned:
      "Security and clarity matter more than feature breadth — owners need trust in how their records are stored and accessed.",
  },
];

export const FEATURED_PROJECT_ORDER = [
  "shuchu",
  "daypilot",
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

export function getProjectById(id: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((p) => p.id === id);
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
