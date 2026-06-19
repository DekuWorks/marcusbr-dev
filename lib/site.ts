export const SITE = {
  name: "Marcus Brown",
  title: "Senior Full-Stack Developer & AI Engineer",
  location: "Spartanburg, SC",
  url: "https://marcusbr.dev",
  email: "marcusb0611@gmail.com",
  phone: "8645247473",
  recruiterSummary:
    "Senior Full Stack Developer and AI Engineer with 8+ years of experience building scalable SaaS platforms, cloud-native applications, secure APIs, and AI-powered solutions using React, TypeScript, .NET, Python, Azure, and AWS.",
  social: {
    github: "https://github.com/DekuWorks",
    linkedin: "https://www.linkedin.com/in/marcus-brown-6b1643259/",
    linktree: "https://linktr.ee/DekuWorks",
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
