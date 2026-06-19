"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { SITE } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="w-full px-4 py-20 sm:px-6 sm:py-24">
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
            based in {SITE.location}, with 8+ years of experience building modern
            SaaS platforms, cloud-native systems, mobile apps, and AI-powered
            products.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            I specialize in React, TypeScript, C#, .NET, Azure and AWS cloud
            architecture, CI/CD automation, and AI integrations — delivering
            scalable applications from frontend architecture through backend
            systems and deployment.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            As the founder of{" "}
            <span className="font-medium text-jade">DekuWorks</span>, I lead the
            full SDLC — from architecture and development to deployment — for
            SaaS products, client platforms, and mission-driven technology
            solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
