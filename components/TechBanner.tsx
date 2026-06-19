"use client";

import { motion } from "framer-motion";
import { FEATURED_TECHNOLOGIES } from "@/lib/site";

export default function TechBanner() {
  return (
    <section
      aria-label="Featured technologies"
      className="w-full border-y border-jade/10 bg-card/40 px-4 py-6 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-medium leading-relaxed tracking-wide text-cream/90 sm:text-base"
        >
          {FEATURED_TECHNOLOGIES.join(" • ")}
        </motion.p>
      </div>
    </section>
  );
}
