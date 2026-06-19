"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
  url?: string;
}

const projects: Project[] = [
  {
    name: "DayPilot",
    description:
      "AI-powered calendar and scheduling platform for individuals, teams, and businesses.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    status: "In Development",
    url: "https://www.daypilot.co",
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
    url: "https://241runnersawareness.org",
  },
  {
    name: "Bookmarked",
    description:
      "Social reading platform for book tracking, reviews, events, book clubs, and reader discovery.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    status: "Client Project",
    url: "https://www.bookmarked.online",
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

function ProjectCardContent({ project }: { project: Project }) {
  return (
    <>
      <div className="project-card-shine" aria-hidden />
      {project.url && (
        <span className="project-card-link-icon">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
      <div className="relative z-10 mb-3 flex flex-col items-center gap-2">
        <h3 className="text-xl font-bold text-cream transition-colors group-hover:text-jade">
          {project.name}
        </h3>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}
        >
          {project.status}
        </span>
      </div>
      <p className="relative z-10 mb-5 flex-1 text-sm leading-relaxed text-muted transition-colors group-hover:text-cream/90">
        {project.description}
      </p>
      <div className="relative z-10 flex flex-wrap justify-center gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted transition-colors group-hover:bg-jade/10 group-hover:text-cream"
          >
            {tech}
          </span>
        ))}
      </div>
      {project.url && (
        <p className="relative z-10 mt-5 text-xs font-medium tracking-wide text-jade opacity-0 transition-all duration-300 group-hover:opacity-100">
          Visit site →
        </p>
      )}
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardClass =
    "project-card glass-card group relative flex flex-col items-center overflow-hidden rounded-2xl p-6 text-center";

  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    whileHover: { y: -8, scale: 1.02 },
    whileTap: { scale: 0.97, y: -2 },
    viewport: { once: true, margin: "-60px" as const },
    transition: {
      duration: 0.4,
      delay: index * 0.08,
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  };

  if (project.url) {
    return (
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
        className={`${cardClass} cursor-pointer`}
        aria-label={`Visit ${project.name}`}
      >
        <ProjectCardContent project={project} />
      </motion.a>
    );
  }

  return (
    <motion.article {...motionProps} className={cardClass}>
      <ProjectCardContent project={project} />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Featured Projects"
          subtitle="Products and platforms I've built or am building"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
