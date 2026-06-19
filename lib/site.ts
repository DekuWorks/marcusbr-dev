export const SITE = {
  name: "Marcus Brown",
  title: "Senior Full-Stack Developer & AI Engineer",
  url: "https://marcusbr.dev",
  email: "marcusb0611@gmail.com",
  phone: "8645247473",
  recruiterSummary:
    "Senior Full-Stack Developer with 7+ years building SaaS platforms, cloud-native applications, AI-powered products, and mobile experiences.",
  social: {
    github: "https://github.com/DekuWorks",
    linkedin: "https://www.linkedin.com/in/marcusbrown",
  },
} as const;

export const CONTACT_TEXT = `${SITE.name}
Email: ${SITE.email}
Phone: ${SITE.phone}
Website: marcusbr.dev`;

export const FEATURED_TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  ".NET 8",
  "Azure",
  "React Native",
  "Supabase",
  "PostgreSQL",
  "OpenAI",
  "Docker",
  "GitHub Actions",
] as const;
