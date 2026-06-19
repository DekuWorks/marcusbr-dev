"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type ProjectStatus =
  | "In Development"
  | "Production / Active Client"
  | "Client Project"
  | "Planning / MVP"
  | "Founder Brand";

interface Project {
  name: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
}

const projects: Project[] = [
  {
    name: "DayPilot",
    description:
      "AI-powered calendar and scheduling platform for individuals, teams, and businesses.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    status: "In Development",
  },
  {
    name: "241Runners Awareness",
    description:
      "Technology platform helping protect and support missing autistic individuals and their families.",
    stack: [
      "React",
      ".NET 8",
      "Azure SQL",
      "Azure App Service",
      "React Native",
    ],
    status: "Production / Active Client",
  },
  {
    name: "Bookmarked",
    description:
      "Social reading platform for book tracking, reviews, events, book clubs, and reader discovery.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    status: "Client Project",
  },
  {
    name: "SoleVault",
    description:
      "Custom sneaker box SaaS for scanning shoe boxes, submitting files, and ordering custom replicas.",
    stack: ["React Native", "Expo", "Firebase", "Stripe"],
    status: "Planning / MVP",
  },
  {
    name: "DekuWorks",
    description:
      "Software, web, mobile, cloud, AI, and 3D printing brand focused on practical tools and creative products.",
    stack: ["Full-Stack Development", "AI", "Cloud", "3D Printing"],
    status: "Founder Brand",
  },
];

const statusColors: Record<ProjectStatus, string> = {
  "In Development": "bg-jade/15 text-jade border-jade/25",
  "Production / Active Client": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "Client Project": "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "Planning / MVP": "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "Founder Brand": "bg-purple-500/15 text-purple-400 border-purple-500/25",
};

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Featured Projects"
          subtitle="Products and platforms I've built or am building"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card group flex flex-col rounded-2xl p-6 transition-all hover:border-jade/25 hover:shadow-glow"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-cream group-hover:text-jade transition-colors">
                  {project.name}
                </h3>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
              </div>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
