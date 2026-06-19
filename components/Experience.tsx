"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const experiences = [
  {
    company: "Cipher Specter Media",
    role: "Developer | AI Engineer",
    period: "2026 – Present",
    description:
      "Develop modern web applications and AI-powered features for scalable software solutions.",
    highlights: [
      "Build production applications with React, TypeScript, and cloud technologies",
      "Design and implement AI-powered features and automation workflows",
      "Contribute to architecture decisions, code quality, and engineering best practices",
    ],
  },
  {
    company: "241Runners Awareness",
    role: "Lead Developer",
    period: "2024 – Present",
    description:
      "Architect and maintain React, React Native, and .NET 8 applications for a production nonprofit platform.",
    highlights: [
      "Built authentication, RBAC, case management, and administrative dashboards",
      "Implemented emergency contacts and secure platform features",
      "Manage Azure infrastructure, APIs, and platform growth initiatives",
    ],
  },
  {
    company: "DekuWorks LLC",
    role: "Founder & Full Stack Developer",
    period: "2021 – Present",
    description:
      "Build SaaS platforms, client software, mobile applications, and AI-powered solutions.",
    highlights: [
      "Lead software architecture, development strategy, and client delivery",
      "Deliver SaaS products, client platforms, and AI integrations end to end",
      "Own the full SDLC from planning through deployment",
    ],
  },
  {
    company: "Event Garage Parking",
    role: "Lead Backend Developer (Contract)",
    period: "Jan 2026 – Mar 2026",
    description:
      "Contract engagement architecting Django backend services and PostgreSQL databases for event parking systems.",
    highlights: [
      "Architected Django backend services and PostgreSQL databases",
      "Built secure REST APIs and backend business logic",
      "Supported AWS infrastructure, Docker deployments, and Nginx configurations",
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
