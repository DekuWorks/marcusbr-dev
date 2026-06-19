"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Redux Toolkit",
    ],
  },
  {
    title: "Backend",
    skills: [
      "ASP.NET Core",
      "Node.js",
      "Express",
      "Django",
      "REST APIs",
      "EF Core",
    ],
  },
  {
    title: "Mobile",
    skills: ["React Native", "Expo", "Firebase"],
  },
  {
    title: "Cloud & Database",
    skills: [
      "Azure",
      "Supabase",
      "PostgreSQL",
      "Firebase",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    title: "AI Engineering",
    skills: [
      "OpenAI API",
      "AI Agents",
      "Prompt Engineering",
      "RAG Systems",
      "AI Automation",
      "LLM Integrations",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Tech Stack"
          subtitle="Detailed breakdown of technologies behind the banner stats"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`apex-skill-card rounded-2xl p-6 text-center transition-all hover:border-gold/30 hover:shadow-glow-gold ${
                group.title === "AI Engineering"
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-jade">
                <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(201,162,39,0.6)]" />
                {group.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-gold/20 bg-jade/5 px-3 py-1 text-xs font-medium text-cream sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
