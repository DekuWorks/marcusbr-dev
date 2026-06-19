"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeader from "./SectionHeader";

const education = [
  {
    school: "Western Governors University",
    credential: "B.S. Computer Science",
    period: "Expected 2026",
  },
  {
    school: "Full Sail University",
    credential: "Application Development Fundamentals",
    period: "",
  },
  {
    school: "Codecademy",
    credential: "Front-End Engineer Certificate",
    period: "",
  },
];

export default function Education() {
  return (
    <section id="education" className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Education" subtitle="Continuous learning and formal training" />
        <div className="space-y-5">
          {education.map((item, index) => (
            <motion.div
              key={item.credential}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card flex flex-col items-center gap-3 rounded-xl p-6 text-center transition-all hover:border-jade/25 hover:shadow-glow-sm sm:flex-row sm:justify-center sm:gap-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-jade/10">
                <GraduationCap className="h-5 w-5 text-jade" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-cream">{item.credential}</h3>
                <p className="mt-1 text-sm text-jade">{item.school}</p>
                {item.period && (
                  <p className="mt-1 text-xs text-muted">{item.period}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
