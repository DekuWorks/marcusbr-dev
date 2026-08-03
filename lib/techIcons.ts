/**
 * Local tech logo paths for skill / technology UI.
 * Assets live under `public/tech/` (static, GH Pages / offline safe).
 *
 * Conceptual skills without a single brand mark map to the closest official
 * related logo. No skill percentages are defined here.
 */

export type TechIconSource = "brand" | "related";

export interface TechIconMeta {
  /** Public path under /tech/ */
  src: string;
  source: TechIconSource;
  /** Accessible brand label for the mark */
  alt: string;
}

const BRAND = (slug: string, alt: string, ext: "svg" | "webp" = "svg"): TechIconMeta => ({
  src: `/tech/${slug}.${ext}`,
  source: "brand",
  alt,
});

const RELATED = (slug: string, alt: string, ext: "svg" | "webp" = "svg"): TechIconMeta => ({
  src: `/tech/${slug}.${ext}`,
  source: "related",
  alt,
});

/** Exact skill / technology name → local logo. */
const TECH_ICON_MAP: Record<string, TechIconMeta> = {
  HTML: BRAND("html5", "HTML5"),
  CSS: BRAND("css", "CSS"),
  JavaScript: BRAND("javascript", "JavaScript"),
  React: BRAND("react", "React"),
  "Next.js": BRAND("nextdotjs", "Next.js"),
  TypeScript: BRAND("typescript", "TypeScript"),
  "Tailwind CSS": BRAND("tailwindcss", "Tailwind CSS"),
  "Redux Toolkit": BRAND("redux", "Redux"),
  Redux: BRAND("redux", "Redux"),
  Vite: BRAND("vite", "Vite"),
  Swift: BRAND("swift", "Swift"),
  SwiftUI: RELATED("swift", "SwiftUI"),
  SwiftData: RELATED("swift", "SwiftData"),
  "React Native": BRAND("react", "React Native"),
  Expo: BRAND("expo", "Expo"),
  EAS: RELATED("expo", "Expo Application Services"),
  Flutter: BRAND("flutter", "Flutter"),
  Dart: BRAND("dart", "Dart"),
  "C#": BRAND("csharp", "C#"),
  "ASP.NET Core 8": BRAND("dotnet", ".NET"),
  ".NET 8": BRAND("dotnet", ".NET"),
  Python: BRAND("python", "Python"),
  FastAPI: BRAND("fastapi", "FastAPI"),
  Django: BRAND("django", "Django"),
  Ruby: BRAND("ruby", "Ruby"),
  Rails: BRAND("rubyonrails", "Ruby on Rails"),
  "Ruby on Rails": BRAND("rubyonrails", "Ruby on Rails"),
  "Node.js": BRAND("nodedotjs", "Node.js"),
  Express: BRAND("express", "Express"),
  "REST APIs": RELATED("openapiinitiative", "OpenAPI"),
  Supabase: BRAND("supabase", "Supabase"),
  "Edge Functions": RELATED("supabase", "Supabase Edge Functions"),
  SQL: RELATED("postgresql", "SQL"),
  "SQL Server": RELATED("mysql", "SQL"),
  "Azure SQL": RELATED("microsoftazure", "Azure SQL"),
  PostgreSQL: BRAND("postgresql", "PostgreSQL"),
  Firebase: BRAND("firebase", "Firebase"),
  "EF Core": RELATED("dotnet", ".NET"),
  AWS: BRAND("amazonaws", "AWS"),
  Azure: BRAND("microsoftazure", "Microsoft Azure"),
  Docker: BRAND("docker", "Docker"),
  "CI/CD": RELATED("githubactions", "CI/CD"),
  "GitHub Actions": BRAND("githubactions", "GitHub Actions"),
  Nginx: BRAND("nginx", "Nginx"),
  "OpenAI API": BRAND("openai", "OpenAI"),
  "LLM Apps": RELATED("huggingface", "Hugging Face"),
  "Prompt Engineering": RELATED("openai", "OpenAI"),
  Prompts: RELATED("openai", "OpenAI"),
  "AI Agents": RELATED("langchain", "LangChain"),
  RAG: RELATED("langchain", "LangChain"),
  "RAG Systems": RELATED("langchain", "LangChain"),
  "Gen AI": RELATED("openai", "OpenAI"),
  "LLM Integrations": RELATED("openai", "OpenAI"),
  "AI-assisted insights": RELATED("openai", "AI insights"),
  "AI-generated explanations": RELATED("openai", "AI explanations"),
  "Supabase Auth": RELATED("supabase", "Supabase Auth"),
  "Real-time messaging": RELATED("supabase", "Supabase Realtime"),
  "Push notifications": RELATED("firebase", "Push notifications"),
  "Maps & location": RELATED("expo", "Maps and location"),
  "TanStack Query": RELATED("react", "TanStack Query"),
  StoreKit: RELATED("swift", "StoreKit"),
  Plaid: BRAND("plaid", "Plaid", "webp"),
  Stripe: BRAND("stripe", "Stripe"),
  "Secure authentication": RELATED("supabase", "Secure authentication"),
  "Secure storage": RELATED("expo", "Secure storage"),
  "Biometric authentication": RELATED("expo", "Biometric authentication"),
};

const GENERIC: TechIconMeta = RELATED("generic", "Technology");

export function getTechIcon(techName: string): TechIconMeta {
  return TECH_ICON_MAP[techName] ?? GENERIC;
}

export function listMappedTechIcons(): typeof TECH_ICON_MAP {
  return TECH_ICON_MAP;
}
