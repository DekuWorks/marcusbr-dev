"use client";

import { motion } from "framer-motion";
import { Code2, FolderKanban, Rocket, Brain } from "lucide-react";

const stats = [
  { icon: Code2, label: "8+ Years Professional Development" },
  { icon: FolderKanban, label: "15+ Production Projects Delivered" },
  { icon: Rocket, label: "Founder of DekuWorks" },
  { icon: Brain, label: "AI & SaaS Product Builder" },
];

export default function Stats() {
  return (
    <section className="w-full px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-card group rounded-xl p-6 text-center transition-all hover:border-jade/25 hover:shadow-glow-sm"
          >
            <stat.icon
              className="mx-auto mb-3 h-8 w-8 text-jade transition-transform group-hover:scale-110"
              aria-hidden
            />
            <p className="text-sm font-semibold leading-snug text-cream sm:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
