"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import Button from "./Button";
import MagneticButton from "@/components/motion/MagneticButton";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import ReadableCopy from "@/components/layout/ReadableCopy";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { GitHubIcon, LinkedInIcon } from "./icons/SocialIcons";
import { SITE } from "@/lib/site";

const roleTags = [
  "Senior Developer",
  "AI Engineer",
  "Mobile Developer",
] as const;

const statusBadges = [
  { icon: Sparkles, label: "Available for Opportunities" },
  { icon: Users, label: "Open to Collaboration" },
  { icon: MapPin, label: `Based in ${SITE.location}` },
] as const;

export default function Hero() {
  const { motionEnabled } = useMotionEnabled();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[min(100dvh,920px)] overflow-hidden pt-[max(7rem,env(safe-area-inset-top,0px)+5rem)] pb-16 sm:pb-20 lg:pt-32"
    >
      <PortfolioContainer className="relative z-10">
        <div
          className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(340px,0.9fr)_minmax(500px,1.5fr)] lg:gap-12 xl:gap-16"
        >
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionEnabled ? 0.55 : 0 }}
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
              Senior Full Stack Developer,{" "}
              <span className="text-jade-bright">AI Engineer</span> &amp; Mobile
              Application Developer
            </p>

            <ReadableCopy className="mx-auto mt-5 text-base leading-relaxed text-muted lg:mx-0">
              <p>{SITE.recruiterSummary}</p>
            </ReadableCopy>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <MagneticButton className="w-full sm:w-auto">
                <Button href="#projects" variant="primary" className="min-h-11 w-full sm:w-auto">
                  View My Work
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <Button
                  href={SITE.resumePath}
                  download={SITE.resumeFilename}
                  variant="secondary"
                  className="min-h-11 w-full sm:w-auto"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download Resume
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  href={`mailto:${SITE.email}`}
                  variant="secondary"
                  className="min-h-11 min-w-11 px-3"
                  aria-label="Email Marcus Brown"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </MagneticButton>
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
            initial={motionEnabled ? { opacity: 0, scale: 0.96 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: motionEnabled ? 0.6 : 0, delay: motionEnabled ? 0.1 : 0 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none lg:justify-self-end"
          >
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[min(300px,72vw)] sm:max-w-[320px] lg:max-w-[min(380px,100%)] xl:max-w-[min(420px,100%)]">
              <div className="hero-portrait-glow" aria-hidden />
              <div className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl border border-jade-border bg-[#0D1310]/45 shadow-glow backdrop-blur-md">
                <Image
                  src="/marcus-brown.webp"
                  alt="Marcus Brown — Senior Full-Stack Developer & AI Engineer"
                  width={576}
                  height={1024}
                  sizes="(max-width: 1024px) 72vw, 420px"
                  className="h-full w-full rounded-2xl object-contain object-center"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent p-4 pt-16">
                  <div className="rounded-xl border border-jade-border bg-card/55 p-3 backdrop-blur-md">
                    <p className="text-sm font-semibold text-cream">
                      Marcus <span className="text-jade-bright">B.</span>, 29
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ul
              className="mt-5 space-y-2 md:max-w-xs lg:absolute lg:top-6 lg:-right-2 lg:mt-0 lg:max-w-none lg:w-52 xl:-right-4"
              aria-label="Availability and location"
            >
              {statusBadges.map((badge) => (
                <li key={badge.label}>
                  <div className="flex items-center gap-2 rounded-full border border-jade-border bg-card/50 px-3 py-2 text-xs text-cream backdrop-blur-md">
                    <badge.icon className="h-3.5 w-3.5 shrink-0 text-jade" aria-hidden />
                    <span>{badge.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </PortfolioContainer>
    </section>
  );
}
