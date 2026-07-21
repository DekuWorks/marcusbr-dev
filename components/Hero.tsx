"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import Button from "./Button";
import { GitHubIcon, LinkedInIcon } from "./icons/SocialIcons";
import { SITE } from "@/lib/site";

const roleTags = [
  "Software Engineer",
  "AI Engineer",
  "Founder",
] as const;

const statusBadges = [
  { icon: Sparkles, label: "Available for Opportunities" },
  { icon: Users, label: "Open to Collaboration" },
  { icon: MapPin, label: `Based in ${SITE.location}` },
] as const;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20"
    >
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jade/10 opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[min(70vw,500px)] w-[min(70vw,500px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jade/5"
        aria-hidden
      />
      <div className="glow-orb pointer-events-none absolute top-1/4 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
          className="text-center lg:text-left"
        >
          <p className="mb-4 inline-flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-jade uppercase lg:justify-start">
            {roleTags.map((tag, index) => (
              <span key={tag} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <span className="text-jade/40" aria-hidden>
                    •
                  </span>
                )}
                {tag}
              </span>
            ))}
          </p>

          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-cream sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            Hi, I&apos;m Marcus{" "}
            <span className="text-jade-bright">Brown</span>
          </h1>

          <p className="mt-4 text-lg font-medium text-cream/90 sm:text-xl">
            Senior Full-Stack Developer,{" "}
            <span className="text-jade-bright">AI Engineer</span> &amp; SaaS
            Founder
          </p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted lg:mx-0">
            {SITE.recruiterSummary}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
            <Button href="#projects" variant="primary" className="min-h-11 w-full sm:w-auto">
              View My Work
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href={SITE.resumePath}
              download={SITE.resumeFilename}
              variant="secondary"
              className="min-h-11 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Resume
            </Button>
            <Button
              href={`mailto:${SITE.email}`}
              variant="secondary"
              className="min-h-11 min-w-11 px-3"
              aria-label="Email Marcus Brown"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>

          <div
            className="mt-6 flex items-center justify-center gap-3 lg:justify-start"
            role="list"
            aria-label="Social profiles"
          >
            <a
              href={SITE.social.github}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border bg-card/60 text-muted transition-colors hover:border-jade/40 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="GitHub profile"
              role="listitem"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.social.linkedin}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border bg-card/60 text-muted transition-colors hover:border-jade/40 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="LinkedIn profile"
              role="listitem"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border bg-card/60 text-muted transition-colors hover:border-jade/40 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Send email"
              role="listitem"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px]">
            <div className="hero-portrait-glow" aria-hidden />
            <div className="relative h-full overflow-hidden rounded-2xl border border-jade-border bg-transparent shadow-glow">
              <Image
                src="/marcus-brown.webp"
                alt="Marcus Brown — Senior Full-Stack Developer & AI Engineer"
                width={576}
                height={1024}
                className="h-full w-full object-cover object-top"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent p-4 pt-16">
                <div className="rounded-xl border border-jade-border bg-card/90 p-3 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-cream">
                    <span className="text-jade-bright">MB</span> Founder of
                    DekuWorks
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Building software. Solving problems. Creating impact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ul
            className="mt-5 space-y-2 lg:absolute lg:top-6 lg:-right-2 lg:mt-0 lg:w-52 xl:-right-8"
            aria-label="Availability and location"
          >
            {statusBadges.map((badge) => (
              <li key={badge.label}>
                <div className="flex items-center gap-2 rounded-full border border-jade-border bg-card/80 px-3 py-2 text-xs text-cream backdrop-blur-sm">
                  <badge.icon className="h-3.5 w-3.5 shrink-0 text-jade" aria-hidden />
                  <span>{badge.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
