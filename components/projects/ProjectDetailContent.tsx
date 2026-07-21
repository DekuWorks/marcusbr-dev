import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { FeaturedProject } from "@/lib/projects";
import { SITE } from "@/lib/site";
import Button from "@/components/Button";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import ProjectScreenshotGallery from "@/components/projects/ProjectScreenshotGallery";

interface ProjectDetailContentProps {
  project: FeaturedProject;
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-jade-border bg-card/60 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-cream">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function ProjectDetailContent({
  project,
}: ProjectDetailContentProps) {
  return (
    <div className="grid-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Featured Products
        </Link>

        <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="overflow-hidden rounded-2xl border border-jade-border bg-background-secondary p-1 shadow-glow-sm">
            <Image
              src={project.icon}
              alt={`${project.name} app icon`}
              width={80}
              height={80}
              className="h-16 w-16 rounded-xl object-cover sm:h-20 sm:w-20 sm:rounded-2xl"
              priority
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-jade-bright">
              {project.statusLabel}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-2 text-muted">{project.category}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-jade-border bg-jade/10 px-3 py-1 text-xs font-semibold tracking-wide text-jade-bright uppercase">
                {project.status}
              </span>
              {project.conceptUI && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber-300 uppercase">
                  Concept UI previews
                </span>
              )}
            </div>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream/90 sm:text-lg">
              {project.synopsis}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button href={project.liveUrl} variant="primary">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              )}
              {project.repositoryUrl && (
                <Button href={project.repositoryUrl} variant="secondary">
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </header>

        <div className="mt-10">
          <ProjectScreenshotGallery
            screenshots={project.screenshots}
            alts={project.screenshotAlts}
            accent={project.accent}
            conceptUI={project.conceptUI}
            deviceFrame={project.deviceFrame}
            priority
          />
        </div>

        <div className="mt-10 space-y-6">
          <DetailSection title="Problem">
            <p>{project.problem}</p>
          </DetailSection>

          <DetailSection title="Solution">
            <p>{project.solution}</p>
            <p className="mt-4">{project.longDescription}</p>
          </DetailSection>

          <DetailSection title="Major Features">
            <ul className="space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade"
                    aria-hidden
                  />
                  <span className="text-cream/90">{feature}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Technology Stack">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-jade-border bg-background-secondary px-3 py-1.5 text-sm text-cream/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Architecture Overview">
            <p>{project.architecture}</p>
          </DetailSection>

          <DetailSection title="Development Status">
            <p>{project.developmentFocus}</p>
          </DetailSection>

          <DetailSection title="Current Focus & Lessons">
            <p>{project.lessonsLearned}</p>
          </DetailSection>

          {project.disclaimer && (
            <aside className="rounded-2xl border border-jade-border/60 bg-background-secondary/50 p-5 text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-cream">Disclaimer:</strong>{" "}
              {project.disclaimer}
            </aside>
          )}
        </div>

        <div className="mt-12 rounded-2xl border border-jade/25 bg-gradient-to-br from-card to-background-secondary p-8 text-center shadow-glow-sm">
          <h2 className="text-xl font-bold text-cream">
            Interested in {project.name} or similar work?
          </h2>
          <p className="mt-3 text-muted">
            I&apos;m available for SaaS, mobile, AI, and full-stack product
            development.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button href={`mailto:${SITE.email}`} variant="primary">
              Contact Marcus
            </Button>
            <Button href="/#projects" variant="secondary">
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
