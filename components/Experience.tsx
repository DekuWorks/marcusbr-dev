"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";

const experiences = [
  {
    company: "DekuWorks LLC",
    role: "Founder & Full Stack Developer",
    period: "2021 – Present",
    description:
      "Build SaaS platforms, client software, mobile applications, and AI-powered solutions end to end.",
  },
  {
    company: "241Runners Awareness",
    role: "Lead Developer",
    period: "2024 – Present",
    description:
      "Architect React, React Native, and .NET 8 applications for a production nonprofit platform.",
  },
  {
    company: "Cipher Spectacle Media",
    role: "Developer | AI Engineer",
    period: "2026 – Present",
    description:
      "Develop modern web applications and AI-powered features for scalable software solutions.",
  },
  {
    company: "Event Garage Parking",
    role: "Lead Backend Developer (Contract)",
    period: "Jan – Mar 2026",
    description:
      "Architected Django backend services, PostgreSQL databases, and AWS infrastructure.",
  },
] as const;

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-jade uppercase">
              <Briefcase className="h-4 w-4" aria-hidden />
              Experience Timeline
            </p>
            <h2
              id="experience-heading"
              className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              Professional Journey
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            View Full Timeline
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="relative">
          <div
            className="absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-jade/30 to-transparent lg:block"
            aria-hidden
          />

          <ol className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-4">
            {experiences.map((exp, index) => (
              <motion.li
                key={exp.company}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                }}
                className="relative"
              >
                <div className="mb-4 hidden lg:flex lg:justify-center">
                  <span
                    className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-jade bg-background"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-jade-bright" />
                  </span>
                </div>
                <article className="glass-card h-full rounded-xl p-5 transition-all hover:border-jade/25 hover:shadow-glow-sm sm:p-6">
                  <h3 className="text-base font-bold text-cream sm:text-lg">
                    {exp.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-jade">
                    {exp.role}
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">
                    {exp.period}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
