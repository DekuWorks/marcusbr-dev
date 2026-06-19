"use client";

import { motion } from "framer-motion";
import {
  Server,
  Rocket,
  Brain,
  Code2,
  HeartHandshake,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const results = [
  {
    icon: Server,
    title: "Production Systems Delivered",
    description:
      "Web, backend, mobile, and admin platforms shipped for active clients and real users in production environments.",
  },
  {
    icon: Rocket,
    title: "SaaS Products Launched",
    description:
      "Founder-led SaaS products built from concept through MVP, deployment, and ongoing iteration.",
  },
  {
    icon: Brain,
    title: "AI-Powered Solutions Built",
    description:
      "LLM integrations, automation workflows, and intelligent product features designed for practical business impact.",
  },
  {
    icon: Code2,
    title: "Full-Stack Applications Developed",
    description:
      "End-to-end applications spanning React, Next.js, .NET, cloud infrastructure, databases, and DevOps pipelines.",
  },
  {
    icon: HeartHandshake,
    title: "Nonprofit Technology Leadership",
    description:
      "Led technical delivery for mission-driven platforms supporting families, communities, and social impact initiatives.",
  },
];

export default function ResultsImpact() {
  return (
    <section id="impact" className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Results & Impact"
          subtitle="Measurable outcomes from building products that solve real problems"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card group rounded-2xl p-6 text-center transition-all hover:border-jade/30 hover:shadow-glow-sm lg:last:col-span-1"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jade/10 transition-transform group-hover:scale-110">
                <item.icon className="h-6 w-6 text-jade" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-cream">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
