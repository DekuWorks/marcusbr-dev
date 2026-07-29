"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Code2, FolderKanban, Rocket } from "lucide-react";
import Button from "@/components/Button";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { SITE } from "@/lib/site";
import { stats as statsData } from "@/lib/technologies";

const statIcons = {
  Code2,
  FolderKanban,
  Rocket,
  Brain,
} as const;

const stats = statsData.map((stat) => ({
  ...stat,
  icon: statIcons[stat.icon],
}));

export default function AboutStatsTech() {
  const { motionEnabled } = useMotionEnabled();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-6">
          <motion.article
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: motionEnabled ? 0.45 : 0 }}
            className="glass-card rounded-2xl p-6 sm:p-8 lg:col-span-3"
          >
            <h2
              id="about-heading"
              className="text-2xl font-bold text-cream sm:text-3xl"
            >
              About Me
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                I&apos;m Marcus Brown, a Senior Full Stack Developer and AI
                Engineer based in {SITE.location}, with 8+ years of experience
                building SaaS platforms, cross-platform mobile applications,
                cloud-native systems, and AI-assisted product experiences.
              </p>
              <p>
                As the founder of{" "}
                <span className="font-medium text-jade">DekuWorks</span>, I lead
                the full SDLC — from architecture and development to deployment
                — for SaaS products, client platforms, and mission-driven
                technology solutions.
              </p>
            </div>
            <Button
              href="#skills"
              variant="secondary"
              className="mt-6 min-h-11 w-full sm:w-auto"
            >
              Explore Tech Stack
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </motion.article>

          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: motionEnabled ? 0.45 : 0,
              delay: motionEnabled ? 0.08 : 0,
            }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2"
            aria-label="Career statistics"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card flex flex-col items-center justify-center rounded-xl p-4 text-center sm:p-5"
              >
                <stat.icon className="mb-2 h-6 w-6 text-jade" aria-hidden />
                <p className="text-2xl font-bold text-jade-bright sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
