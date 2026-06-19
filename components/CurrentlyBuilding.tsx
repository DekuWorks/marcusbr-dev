"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import SectionHeader from "./SectionHeader";

const building = [
  {
    name: "Cipher Jobs",
    description: "AI-powered job platform at Cipher Spectacle Media",
  },
  {
    name: "DayPilot",
    description: "AI scheduling SaaS",
  },
  {
    name: "241Runners AI",
    description: "Image matching, chatbot, predictive sightings",
  },
  {
    name: "Bookmarked",
    description: "Book tracking and social reader platform",
  },
  {
    name: "SoleVault",
    description: "Custom sneaker box ordering platform",
  },
  {
    name: "DekuWorks",
    description: "Software and creative technology brand",
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Currently Building"
          subtitle="Active focus areas and work in progress"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {building.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card flex flex-col items-center rounded-xl p-5 text-center transition-all hover:border-jade/25 hover:shadow-glow-sm"
            >
              <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-jade/10">
                <Hammer className="h-5 w-5 text-jade" />
              </div>
              <div>
                <h3 className="font-semibold text-cream">{item.name}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
