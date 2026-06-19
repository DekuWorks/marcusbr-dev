"use client";

import { motion } from "framer-motion";
import { Search, Palette, Code, Rocket } from "lucide-react";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Understand the problem, users, and goals",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Plan clean UI, flows, and architecture",
  },
  {
    icon: Code,
    title: "Build",
    description:
      "Develop scalable frontend, backend, mobile, and AI features",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deploy, test, improve, and support",
  },
];

export default function Process() {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Process" subtitle="How I approach every project" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card group rounded-2xl p-6 text-center transition-all hover:border-jade/25 hover:shadow-glow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jade/10 transition-transform group-hover:scale-110">
                <step.icon className="h-6 w-6 text-jade" />
              </div>
              <h3 className="text-lg font-semibold text-cream">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
