"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Brain, Code2, FolderKanban, Rocket } from "lucide-react";
import Button from "@/components/Button";
import { SITE } from "@/lib/site";

const stats = [
  { icon: Code2, value: "8+", label: "Years Coding" },
  { icon: FolderKanban, value: "15+", label: "Projects Built" },
  { icon: Rocket, value: "5", label: "Platforms Launched" },
  { icon: Brain, value: "100%", label: "Passion & Drive" },
] as const;

const techStack = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    title: "Backend",
    items: ["C#", ".NET 8", "Python", "Django", "Node.js", "REST APIs"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "CI/CD", "GitHub Actions"],
  },
  {
    title: "AI & Tools",
    items: ["OpenAI API", "AI Agents", "RAG Systems", "Supabase", "PostgreSQL"],
  },
] as const;

export default function AboutStatsTech() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <h2
              id="about-heading"
              className="text-2xl font-bold text-cream sm:text-3xl"
            >
              About Me
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                I&apos;m Marcus Brown, a Senior Full-Stack Developer and AI
                Engineer based in {SITE.location}, with 8+ years of experience
                building modern SaaS platforms, cloud-native systems, mobile
                apps, and AI-powered products.
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
              href="#experience"
              variant="secondary"
              className="mt-6 min-h-11 w-full sm:w-auto"
            >
              More About Me
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </motion.article>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.45,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
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

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.45,
              delay: prefersReducedMotion ? 0 : 0.16,
            }}
            className="glass-card rounded-2xl p-6 sm:p-8"
            id="skills"
          >
            <h2 className="text-2xl font-bold text-cream sm:text-3xl">
              Tech Stack
            </h2>
            <div className="mt-5 space-y-5">
              {techStack.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-2 text-sm font-semibold text-jade">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-jade-border bg-background-secondary/80 px-2.5 py-1 text-xs text-cream/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
