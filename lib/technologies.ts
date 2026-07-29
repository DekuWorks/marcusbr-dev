export const stats = [
  { icon: "Code2", value: "8+", label: "Years Coding" },
  { icon: "FolderKanban", value: "15+", label: "Projects Built" },
  { icon: "Rocket", value: "5", label: "Platforms Launched" },
  { icon: "Brain", value: "100%", label: "Passion & Drive" },
] as const;

export const techStack = [
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Vite",
    ],
  },
  {
    title: "Mobile",
    items: ["React Native", "Expo", "Flutter", "Dart"],
  },
  {
    title: "Backend",
    items: [
      "C#",
      "ASP.NET Core 8",
      "Python",
      "Django",
      "Node.js",
      "Express",
      "REST APIs",
      "Supabase",
      "SQL",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "CI/CD", "GitHub Actions", "Nginx"],
  },
  {
    title: "AI & Tools",
    items: [
      "OpenAI API",
      "LLM Apps",
      "Prompt Engineering",
      "AI Agents",
      "RAG",
      "PostgreSQL",
      "Firebase",
    ],
  },
] as const;

export type TechStackGroup = (typeof techStack)[number];
