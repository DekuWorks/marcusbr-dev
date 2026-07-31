"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import Button from "./Button";
import MagneticButton from "@/components/motion/MagneticButton";
import AnimatedRoles from "@/components/cinematic/AnimatedRoles";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import ReadableCopy from "@/components/layout/ReadableCopy";
import TiltCard from "@/components/motion/TiltCard";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { GitHubIcon, LinkedInIcon } from "./icons/SocialIcons";
import { CINEMATIC_ASSETS } from "@/lib/cinematic/assets";
import { SITE } from "@/lib/site";
import { stats as careerStats } from "@/lib/technologies";

const statusBadges = [
  { icon: Sparkles, label: "Available for Opportunities" },
  { icon: Users, label: "Open to Collaboration" },
  { icon: MapPin, label: `Based in ${SITE.location}` },
] as const;

/** Compact hero stats — values come only from `lib/technologies` (no invented metrics). */
const heroStats = careerStats.filter((stat) =>
  ["Years Coding", "Projects Built", "Platforms Launched"].includes(stat.label),
);

export default function Hero() {
  const { motionEnabled } = useMotionEnabled();

  const fade = (delay: number, y = 18) =>
    motionEnabled
      ? {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }
      : {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        };

  const photoEntrance = motionEnabled
    ? {
        initial: { opacity: 0, scale: 1.04, filter: "blur(10px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        transition: {
          duration: 0.75,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      }
    : {
        initial: false as const,
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        transition: { duration: 0 },
      };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="cinematic-hero relative w-full min-h-[min(100dvh,960px)] overflow-hidden pt-[max(7rem,env(safe-area-inset-top,0px)+5rem)] pb-20 sm:pb-24 lg:pb-28 lg:pt-32"
    >
      {/* Hero-local lighting plane — behind portrait, never over the face */}
      <div className="cinematic-hero__lighting pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={CINEMATIC_ASSETS.heroLighting}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-55 mix-blend-soft-light"
        />
        <div className="cinematic-hero__lighting-fade" />
      </div>

      <PortfolioContainer className="relative z-10">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(320px,1fr)_minmax(280px,0.95fr)] lg:gap-14 xl:grid-cols-[minmax(380px,1.05fr)_minmax(320px,0.9fr)] xl:gap-16">
          <div className="text-center lg:text-left">
            <motion.div {...fade(0.08)}>
              <AnimatedRoles className="mb-4" />
            </motion.div>

            <motion.h1
              id="hero-heading"
              {...fade(0.16)}
              className="text-[clamp(2.35rem,5.5vw,3.75rem)] font-bold tracking-tight text-cream lg:leading-[1.08]"
            >
              Hi, I&apos;m Marcus{" "}
              <span className="text-jade-bright">Brown</span>
            </motion.h1>

            <motion.p
              {...fade(0.22)}
              className="mt-4 text-lg font-medium text-cream/90 sm:text-xl"
            >
              Senior Full Stack Developer,{" "}
              <span className="text-jade-bright">AI Engineer</span> &amp; Mobile
              Application Developer
            </motion.p>

            <motion.div {...fade(0.28)}>
              <ReadableCopy className="mx-auto mt-5 text-base leading-relaxed text-muted lg:mx-0">
                <p>{SITE.recruiterSummary}</p>
              </ReadableCopy>
            </motion.div>

            <motion.div
              {...fade(0.36)}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <MagneticButton className="w-full sm:w-auto">
                <Button
                  href="#projects"
                  variant="primary"
                  className="min-h-11 w-full sm:w-auto"
                >
                  View My Work
                  <ArrowRight className="btn-icon-shift h-4 w-4" aria-hidden />
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
            </motion.div>

            {heroStats.length > 0 && (
              <motion.dl
                {...fade(0.4)}
                className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-2 lg:mx-0 lg:max-w-lg"
                aria-label="Career statistics"
              >
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-jade-border bg-card/90 px-2.5 py-3 text-center"
                  >
                    <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted sm:text-[11px]">
                      {stat.label}
                    </dt>
                    <dd className="mt-0.5 text-lg font-bold text-jade-bright sm:text-xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            )}

            <motion.div
              {...fade(0.42)}
              className="mt-6 flex items-center justify-center gap-3 lg:justify-start"
              role="list"
              aria-label="Social profiles"
            >
              <a
                href={SITE.social.github}
                className="social-icon-btn flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border bg-card/60 text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="GitHub profile"
                role="listitem"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.social.linkedin}
                className="social-icon-btn flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border bg-card/60 text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="LinkedIn profile"
                role="listitem"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="social-icon-btn flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border bg-card/60 text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Send email"
                role="listitem"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            {...photoEntrance}
            className="relative mx-auto w-full max-w-sm lg:max-w-none lg:justify-self-end"
          >
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[min(300px,72vw)] sm:max-w-[320px] lg:max-w-[min(380px,100%)] xl:max-w-[min(420px,100%)]">
              <div className="hero-portrait-glow" aria-hidden />
              <div className="hero-portrait-rim" aria-hidden />
              <TiltCard maxTilt={5} className="h-full">
                {/* Solid plate under photo — no backdrop-blur sampling of WebGL/video */}
                <div className="hero-portrait-frame relative flex h-full items-center justify-center overflow-hidden rounded-2xl">
                  <Image
                    src="/marcus-brown.webp"
                    alt="Marcus Brown — Senior Full-Stack Developer & AI Engineer"
                    width={576}
                    height={1024}
                    sizes="(max-width: 1024px) 72vw, 420px"
                    className="h-full w-full rounded-2xl object-contain object-center"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent p-4 pt-16">
                    <div className="rounded-xl border border-jade-border bg-card/90 p-3">
                      <p className="text-sm font-semibold text-cream">
                        Marcus <span className="text-jade-bright">B.</span>, 29
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            <ul
              className="mt-5 space-y-2 md:max-w-xs lg:absolute lg:top-6 lg:-right-2 lg:mt-0 lg:w-52 lg:max-w-none xl:-right-4"
              aria-label="Availability and location"
            >
              {statusBadges.map((badge, index) => (
                <motion.li
                  key={badge.label}
                  {...fade(0.48 + index * 0.06, 10)}
                >
                  <div className="flex items-center gap-2 rounded-full border border-jade-border bg-card/90 px-3 py-2 text-xs text-cream shadow-glow-sm">
                    <badge.icon
                      className="h-3.5 w-3.5 shrink-0 text-jade"
                      aria-hidden
                    />
                    <span>{badge.label}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </PortfolioContainer>

      <a
        href="#projects"
        className="cinematic-scroll-cue"
        aria-label="Scroll to featured projects"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4" aria-hidden />
      </a>
    </section>
  );
}
