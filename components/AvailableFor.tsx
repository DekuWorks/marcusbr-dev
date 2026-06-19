"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Layers,
  Brain,
  Briefcase,
  Rocket,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const opportunities = [
  { icon: Layout, label: "Senior Frontend Roles" },
  { icon: Layers, label: "Full Stack Development" },
  { icon: Brain, label: "AI Engineering Projects" },
  { icon: Briefcase, label: "Contract Consulting" },
  { icon: Rocket, label: "Startup MVP Development" },
];

export default function AvailableFor() {
  return (
    <section id="available" className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Currently Available For"
          subtitle="Open to roles, contracts, and high-impact product collaborations"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {opportunities.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-card group flex flex-col items-center rounded-xl p-5 text-center transition-all hover:border-jade/30 hover:shadow-glow-sm"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-jade/10 transition-transform group-hover:scale-110">
                <item.icon className="h-5 w-5 text-jade" aria-hidden />
              </div>
              <p className="text-sm font-semibold text-cream">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
