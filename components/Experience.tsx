"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const experiences = [
  {
    company: "Cipher Spectacle Media",
    role: "Lead Front-End Developer & AI Engineer",
    period: "2026 – Present",
    description:
      "Leading frontend architecture, AI initiatives, automation systems, and scalable React applications.",
    highlights: [
      "Lead frontend architecture for production web applications",
      "Drive AI initiatives and workflow automation systems",
      "Build scalable React and TypeScript application experiences",
    ],
  },
  {
    company: "241Runners Awareness",
    role: "Lead Developer",
    period: "2024 – Present",
    description:
      "Architected React, React Native, and .NET solutions with Azure cloud infrastructure for a production nonprofit platform.",
    highlights: [
      "Built secure APIs with JWT, OAuth, and 2FA authentication",
      "Designed compliance-focused (HIPAA-style) secure systems",
      "Improved performance by 70% and scaled for high usage",
    ],
  },
  {
    company: "Event Garage Parking",
    role: "Lead Backend Developer",
    period: "2025 · 3 Months",
    description:
      "Led backend development for high-traffic event parking systems during a focused 3-month engagement.",
    highlights: [
      "Designed Django and PostgreSQL backend architecture",
      "Managed AWS EC2 and Docker deployments",
      "Implemented CI/CD pipelines and automation",
    ],
  },
  {
    company: "DekuWorks",
    role: "Founder & Senior Full-Stack Developer",
    period: "2021 – Present",
    description:
      "Founded and operate a software studio delivering SaaS products, client solutions, and AI integrations.",
    highlights: [
      "Built SaaS products, client platforms, and AI-powered tools",
      "Led full SDLC from planning to deployment",
      "Developed secure cloud-based production systems",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Experience" subtitle="Professional journey" />
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 text-center transition-all hover:border-jade/25 hover:shadow-glow-sm sm:p-8"
            >
              <h3 className="text-lg font-bold text-cream">{exp.company}</h3>
              <p className="mt-1 text-sm font-medium text-jade">{exp.role}</p>
              <p className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">
                {exp.period}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {exp.description}
              </p>
              <ul className="mt-4 space-y-2 text-left text-sm text-cream/85 sm:mx-auto sm:max-w-md">
                {exp.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-jade" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
