"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  FileText,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { GitHubIcon } from "./icons/SocialIcons";

type ProjectStatus =
  | "In Development"
  | "Production / Active Client"
  | "Client Project"
  | "Planning / MVP"
  | "Founder Brand";

interface Project {
  name: string;
  description: string;
  impact: string;
  stack: string[];
  status: ProjectStatus;
  link?: string;
  github?: string;
  caseStudy?: string;
}

const projects: Project[] = [
  {
    name: "DayPilot",
    description:
      "AI-powered calendar and scheduling platform for individuals, teams, and businesses.",
    impact:
      "Architecting an intelligent scheduling SaaS that reduces manual coordination, automates workflows, and helps teams scale operations with AI-driven productivity.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    status: "In Development",
    link: "https://www.daypilot.co",
  },
  {
    name: "241Runners Awareness",
    description:
      "Technology platform helping protect and support missing autistic individuals and their families.",
    impact:
      "Leading development of a production React + .NET 8 platform with JWT, OAuth, 2FA, and HIPAA-style compliance — improving performance by 70% while scaling for high community usage.",
    stack: [
      "React",
      ".NET 8",
      "Azure SQL",
      "Azure App Service",
      "React Native",
    ],
    status: "Production / Active Client",
    link: "https://241runnersawareness.org",
  },
  {
    name: "Bookmarked",
    description:
      "Social reading platform for book tracking, reviews, events, book clubs, and reader discovery.",
    impact:
      "Building a community-driven reading platform that connects readers through discovery, reviews, clubs, and events — designed for engagement and long-term retention.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    status: "Client Project",
    link: "https://www.bookmarked.online",
  },
  {
    name: "SoleVault",
    description:
      "Custom sneaker box SaaS for scanning shoe boxes, submitting files, and ordering custom replicas.",
    impact:
      "Designing a mobile-first MVP with scan-to-order workflows, file submission pipelines, and Stripe-powered payments for a specialized e-commerce experience.",
    stack: ["React Native", "Expo", "Firebase", "Stripe"],
    status: "Planning / MVP",
  },
  {
    name: "DekuWorks",
    description:
      "Software, web, mobile, cloud, AI, and 3D printing brand focused on practical tools and creative products.",
    impact:
      "Founding a product studio that ships SaaS platforms, AI tools, cloud systems, and client solutions for businesses, startups, and mission-driven organizations.",
    stack: ["Full-Stack Development", "AI", "Cloud", "3D Printing"],
    status: "Founder Brand",
    github: "https://github.com/DekuWorks",
  },
];

const statusColors: Record<ProjectStatus, string> = {
  "In Development": "bg-jade/15 text-jade border-jade/25",
  "Production / Active Client": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "Client Project": "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "Planning / MVP": "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "Founder Brand": "bg-purple-500/15 text-purple-400 border-purple-500/25",
};

function ProjectActions({ project }: { project: Project }) {
  const hasActions = project.link || project.github || project.caseStudy;
  if (!hasActions) return null;

  return (
    <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2">
      {project.link && (
        <Button
          href={project.link}
          variant="primary"
          className="min-w-[120px] px-4 py-2 text-xs sm:text-sm"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Link
        </Button>
      )}
      {project.github && (
        <Button
          href={project.github}
          variant="secondary"
          className="min-w-[120px] px-4 py-2 text-xs sm:text-sm"
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          GitHub
        </Button>
      )}
      {project.caseStudy && (
        <Button
          href={project.caseStudy}
          variant="ghost"
          className="min-w-[120px] px-4 py-2 text-xs sm:text-sm"
        >
          <FileText className="h-3.5 w-3.5" />
          Case Study
        </Button>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        type: "spring",
        stiffness: 400,
        damping: 28,
      }}
      className="project-card glass-card group relative flex flex-col items-center overflow-hidden rounded-2xl p-6 text-center sm:p-8"
    >
      <div className="project-card-shine" aria-hidden />
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
      <p className="relative z-10 mb-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <p className="relative z-10 mb-5 flex-1 text-sm leading-relaxed text-cream/85">
        {project.impact}
      </p>
      <div className="relative z-10 flex flex-wrap justify-center gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-jade/10 bg-white/5 px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-jade/20 group-hover:bg-jade/10 group-hover:text-cream"
          >
            {tech}
          </span>
        ))}
      </div>
      <ProjectActions project={project} />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Featured Projects"
          subtitle="Impact-focused products across SaaS, nonprofit tech, and client platforms"
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
