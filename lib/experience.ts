export const experiences = [
  {
    company: "Cipher Spectacle Media",
    role: "Developer / AI Engineer",
    period: "2026 – Present",
    description:
      "Develop React and TypeScript applications, AI-enabled workflows, and scalable cloud features.",
    highlights: [
      "Develop React and TypeScript applications and AI-enabled workflows",
      "Build scalable cloud features for production software solutions",
      "Contribute to architecture and code-quality standards",
    ],
  },
  {
    company: "241Runners Awareness",
    role: "Lead Developer",
    period: "2024 – Present",
    description:
      "Architect and ship React, React Native/Expo, and .NET 8 applications for a production nonprofit safety platform.",
    highlights: [
      "Built authentication, RBAC, case management, maps, and admin dashboards",
      "Shipped the 241 Runners mobile app to App Store Connect (1.0.1) with Expo EAS",
      "Manage Azure infrastructure, secure APIs, and ongoing store/release cycles",
    ],
  },
  {
    company: "DekuWorks LLC",
    role: "Founder / Full Stack Developer",
    period: "2021 – Present",
    description:
      "Lead product strategy, UI/UX, system architecture, and client delivery for SaaS, mobile, web, and AI-powered applications.",
    highlights: [
      "Lead product strategy, UI/UX, and system architecture",
      "Deliver SaaS, mobile, web, and AI-powered applications end to end",
      "Own cloud deployment and client delivery across the full SDLC",
    ],
  },
  {
    company: "Event Garage Parking",
    role: "Lead Backend Developer (Contract)",
    period: "Jan 2026 – Mar 2026",
    description:
      "Architected Django and PostgreSQL backend services with secure REST APIs and AWS infrastructure.",
    highlights: [
      "Architected Django and PostgreSQL backend services",
      "Built secure REST APIs and backend business logic",
      "Deployed Docker containers, AWS infrastructure, and Nginx configurations",
    ],
  },
] as const;

export type ExperienceEntry = (typeof experiences)[number];
