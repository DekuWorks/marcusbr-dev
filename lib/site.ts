export const SITE = {
  name: "Marcus Brown",
  title: "Senior Full-Stack Developer & AI Engineer",
  location: "Spartanburg, SC",
  url: "https://marcusbr.dev",
  email: "marcusb0611@gmail.com",
  phone: "8645247473",
  recruiterSummary:
    "Full Stack Engineer with 5+ years in .NET/C# and 8+ years overall experience building scalable, secure, production-grade applications — with strong expertise in AWS cloud deployments, CI/CD pipelines, authentication systems, and high-availability SaaS platforms.",
  social: {
    github: "https://github.com/DekuWorks",
    linkedin: "https://www.linkedin.com/in/marcus-brown-6b1643259/",
  },
  resumePath: "/Marcus-Brown-Resume.pdf",
  resumeFilename: "Marcus-Brown-Resume.pdf",
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
  "C#",
  "AWS",
  "Azure",
  "Django",
  "PostgreSQL",
  "Docker",
  "CI/CD",
  "GitHub Actions",
] as const;
