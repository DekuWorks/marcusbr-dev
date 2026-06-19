"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="w-full px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="About Me" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8 text-center shadow-glow-sm sm:p-10"
        >
          <p className="text-lg leading-relaxed text-muted">
            I&apos;m Marcus Brown, a Senior Full-Stack Developer and AI Engineer
            focused on building modern SaaS platforms, mobile apps, AI-powered
            tools, and cloud-native systems.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            As the founder of{" "}
            <span className="font-medium text-jade">DekuWorks</span>, I create
            software that helps businesses, nonprofits, and communities solve
            real-world problems through technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
