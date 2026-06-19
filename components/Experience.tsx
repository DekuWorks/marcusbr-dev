"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const experiences = [
  {
    company: "DekuWorks",
    role: "Founder / Senior Full-Stack Developer & AI Engineer",
    description:
      "Building SaaS products, client platforms, AI-powered applications, mobile apps, websites, and cloud-native systems.",
  },
  {
    company: "241Runners Awareness",
    role: "Lead Developer",
    description:
      "Built and maintained web, backend, mobile, and admin systems supporting missing autistic individual awareness and family support.",
  },
  {
    company: "EventGarageParking",
    role: "Lead Backend Developer",
    description:
      "Worked on backend architecture, APIs, database models, Docker setup, and deployment workflows.",
  },
  {
    company: "Amptier",
    role: "Associate Full-Stack Developer",
    description:
      "Built full-stack prototypes and business-facing web solutions.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="w-full px-6 py-24">
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
              className="glass-card rounded-xl p-6 text-center transition-all hover:border-jade/25 hover:shadow-glow-sm"
            >
              <h3 className="text-lg font-bold text-cream">{exp.company}</h3>
              <p className="mt-1 text-sm font-medium text-jade">{exp.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
