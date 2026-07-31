/** Contact CTA section with recruiter quick-actions and availability info. */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Mail,
  MapPin,
  MessageSquare,
  Rocket,
  Sparkles,
} from "lucide-react";
import Button from "./Button";
import { GitHubIcon, LinkedInIcon } from "./icons/SocialIcons";
import MagneticButton from "@/components/motion/MagneticButton";
import LiquidBorder from "@/components/liquid/LiquidBorder";
import GlassPanel from "@/components/liquid/GlassPanel";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import ReadableCopy from "@/components/layout/ReadableCopy";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { CINEMATIC_ASSETS } from "@/lib/cinematic/assets";
import { SITE } from "@/lib/site";

const recruiterActions = [
  {
    label: "Download Resume",
    href: SITE.resumePath,
    download: SITE.resumeFilename,
    icon: Download,
    variant: "secondary" as const,
  },
  {
    label: "LinkedIn",
    href: SITE.social.linkedin,
    icon: LinkedInIcon,
    variant: "ghost" as const,
  },
  {
    label: "GitHub",
    href: SITE.social.github,
    icon: GitHubIcon,
    variant: "ghost" as const,
  },
] as const;

export default function CTABar() {
  const { motionEnabled } = useMotionEnabled();

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="w-full section-spacing-compact pb-[max(4rem,env(safe-area-inset-bottom,0px)+1rem)]"
    >
      <PortfolioContainer>
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: motionEnabled ? 0.45 : 0 }}
          className="relative"
        >
          <LiquidBorder className="cta-liquid-border cta-cinematic overflow-hidden rounded-2xl shadow-glow">
            <GlassPanel className="cta-liquid-panel relative overflow-hidden rounded-2xl border-0 p-8 sm:p-10 lg:p-12">
              <div
                className="cta-cinematic__bg pointer-events-none absolute inset-0"
                aria-hidden
              >
                <Image
                  src={CINEMATIC_ASSETS.contactGlow}
                  alt=""
                  fill
                  sizes="(max-width: 1800px) 100vw, 1800px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className="cta-liquid-panel__ambient pointer-events-none absolute inset-0"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-jade/50 to-transparent"
                aria-hidden
              />

              <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
                <div className="text-center lg:text-left">
                  <div className="mb-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full border border-jade-border bg-jade/10 px-3 py-1.5 text-xs font-medium text-jade-bright">
                      <span className="relative flex h-2 w-2" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
                      </span>
                      Available for opportunities
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <MapPin className="h-3.5 w-3.5 text-jade" aria-hidden />
                      {SITE.location}
                    </span>
                  </div>

                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jade/15 ring-1 ring-jade/20 lg:mx-0">
                    <Rocket className="h-6 w-6 text-jade-bright" aria-hidden />
                  </div>

                  <p className="text-[11px] font-semibold tracking-[0.2em] text-jade uppercase">
                    Let&apos;s connect
                  </p>
                  <h2
                    id="cta-heading"
                    className="mt-2 text-2xl font-bold text-cream sm:text-3xl"
                  >
                    Let&apos;s Build Something{" "}
                    <span className="text-jade-bright">Amazing</span>
                  </h2>
                  <ReadableCopy className="mx-auto mt-3 text-base leading-relaxed text-muted lg:mx-0">
                    <p>
                      Have a project, role, or collaboration in mind? I&apos;m open to
                      full-time, contract, and consulting work — reach out and let&apos;s
                      talk about what we can build together.
                    </p>
                  </ReadableCopy>

                  <p className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 text-sm text-muted lg:mx-0 lg:justify-start">
                    <Sparkles className="h-4 w-4 shrink-0 text-jade" aria-hidden />
                    <span>
                      Typical response within{" "}
                      <span className="font-medium text-cream">24–48 hours</span>
                    </span>
                  </p>
                </div>

                <div className="mt-8 lg:mt-0">
                  <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-col lg:items-stretch">
                    <MagneticButton className="w-full sm:w-auto lg:w-full">
                      <Button
                        href={`mailto:${SITE.email}`}
                        variant="secondary"
                        className="min-h-11 w-full sm:w-auto lg:w-full"
                      >
                        <Mail className="h-4 w-4" aria-hidden />
                        Email Me
                      </Button>
                    </MagneticButton>
                    <MagneticButton className="w-full sm:w-auto lg:w-full">
                      <Button
                        href={`sms:${SITE.phone}`}
                        variant="secondary"
                        className="min-h-11 w-full sm:w-auto lg:w-full"
                      >
                        <MessageSquare className="h-4 w-4" aria-hidden />
                        Text Me
                      </Button>
                    </MagneticButton>
                    <MagneticButton className="w-full sm:w-auto lg:w-full">
                      <Button
                        href={`mailto:${SITE.email}?subject=Schedule%20a%20Call`}
                        variant="primary"
                        className="min-h-11 w-full sm:w-auto lg:w-full"
                      >
                        <Calendar className="h-4 w-4" aria-hidden />
                        Schedule a Call
                      </Button>
                    </MagneticButton>
                  </div>

                  <div className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-col lg:items-stretch">
                    {recruiterActions.map((action) => (
                      <MagneticButton key={action.label} className="w-full sm:w-auto lg:w-full">
                        <Button
                          href={action.href}
                          download={"download" in action ? action.download : undefined}
                          variant={action.variant}
                          className="min-h-11 w-full sm:w-auto lg:w-full"
                        >
                          <action.icon className="h-4 w-4" aria-hidden />
                          {action.label}
                        </Button>
                      </MagneticButton>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-jade-border bg-background/30 px-4 py-3 backdrop-blur-sm transition-colors hover:border-jade/30 lg:mt-4">
                    <p className="text-xs font-medium tracking-wide text-muted uppercase">
                      Direct email
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 inline-block font-mono text-sm text-jade-bright transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </LiquidBorder>
        </motion.div>
      </PortfolioContainer>
    </section>
  );
}
