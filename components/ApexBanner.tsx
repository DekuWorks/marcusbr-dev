"use client";

import { motion } from "framer-motion";
import { Download, Mail, MessageSquare, Building2, Layers, Sparkles } from "lucide-react";
import Button from "./Button";
import CopyButton from "./CopyButton";

const contactText = `Marcus Brown
Email: marcusb0611@gmail.com
Phone: 8645247473
Website: marcusbr.dev`;

export const skillTrackers = [
  { label: "Full-Stack", value: "7+", unit: "Years" },
  { label: "AI Engineering", value: "Expert", unit: "Level" },
  { label: "Mobile / React Native", value: "Advanced", unit: "Level" },
];

export const achievementBadges = [
  { title: "SaaS Founder", icon: Sparkles },
  { title: "DekuWorks", icon: Building2 },
  { title: "Senior Full-Stack", icon: Layers },
];

function TrackerBar({
  label,
  value,
  unit,
  index,
}: {
  label: string;
  value: string;
  unit: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      className="apex-tracker group"
    >
      <div className="apex-tracker-cap apex-tracker-cap-left" aria-hidden />
      <div className="apex-tracker-body">
        <div className="apex-tracker-glow" aria-hidden />
        <div className="apex-tracker-ornament apex-tracker-ornament-left" aria-hidden />
        <div className="apex-tracker-ornament apex-tracker-ornament-right" aria-hidden />
        <div className="apex-tracker-content">
          <span className="apex-tracker-label">{label}</span>
          <div className="apex-tracker-value-row">
            <span className="apex-tracker-value">{value}</span>
            <span className="apex-tracker-unit">{unit}</span>
          </div>
        </div>
      </div>
      <div className="apex-tracker-cap apex-tracker-cap-right" aria-hidden />
    </motion.div>
  );
}

function AchievementBadge({
  title,
  icon: Icon,
  index,
}: {
  title: string;
  icon: typeof Sparkles;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      className="apex-badge-row"
      title={title}
    >
      <div className="apex-badge apex-badge-diamond">
        <div className="apex-badge-inner">
          <Icon className="h-4 w-4 text-gold-pale sm:h-5 sm:w-5" strokeWidth={1.75} />
        </div>
      </div>
      <span className="apex-badge-label">{title}</span>
    </motion.div>
  );
}

function PortraitFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="apex-portrait-wrap mx-auto w-full max-w-[240px] sm:max-w-[260px] lg:mx-0 lg:max-w-none"
    >
      <div className="apex-portrait-frame">
        <div className="apex-portrait-glow" aria-hidden />
        <div className="apex-portrait-rays" aria-hidden />
        <div className="apex-portrait-arch" aria-hidden />
        <div className="apex-portrait-inner">
          <div className="apex-avatar">
            <span className="apex-avatar-initials">MB</span>
          </div>
        </div>
        <div className="apex-portrait-pedestal" aria-hidden />
      </div>
    </motion.div>
  );
}

export default function ApexBanner() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6">
      <div className="glow-orb pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb-gold pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="apex-banner">
            <div className="apex-banner-border" aria-hidden />
            <div className="apex-banner-corner apex-banner-corner-tl" aria-hidden />
            <div className="apex-banner-corner apex-banner-corner-tr" aria-hidden />
            <div className="apex-banner-corner apex-banner-corner-bl" aria-hidden />
            <div className="apex-banner-corner apex-banner-corner-br" aria-hidden />

            <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
              <div className="order-2 flex flex-col gap-6 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="mb-1 text-[10px] font-medium tracking-[0.25em] text-jade uppercase sm:text-xs">
                    marcusbr.dev
                  </p>
                  <h1 className="apex-username">Marcus Brown</h1>
                  <p className="mt-1 text-sm font-medium text-gold-light sm:text-base">
                    Senior Full-Stack Developer &amp; AI Engineer
                  </p>
                </motion.div>

                <div className="apex-badge-stack">
                  {achievementBadges.map((badge, index) => (
                    <AchievementBadge key={badge.title} {...badge} index={index} />
                  ))}
                </div>

                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {skillTrackers.map((tracker, index) => (
                    <TrackerBar key={tracker.label} {...tracker} index={index} />
                  ))}
                </div>
              </div>

              <div className="order-1 flex items-center justify-center lg:order-2 lg:items-start lg:pt-2">
                <PortraitFrame />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/Marcus-Brown-Resume.pdf" download variant="primary">
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
          <Button href="mailto:marcusb0611@gmail.com" variant="secondary">
            <Mail className="h-4 w-4" />
            Email Me
          </Button>
          <Button href="sms:8645247473" variant="secondary">
            <MessageSquare className="h-4 w-4" />
            Text Me
          </Button>
          <CopyButton
            text={contactText}
            label="Copy Contact"
            copiedLabel="Contact copied."
            variant="ghost"
          />
        </motion.div>
      </div>
    </section>
  );
}
