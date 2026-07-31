"use client";

import { motion } from "framer-motion";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const { motionEnabled } = useMotionEnabled();

  return (
    <motion.div
      initial={motionEnabled ? { opacity: 0, y: 22 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: motionEnabled ? 0.42 : 0, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 sm:mb-14 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-muted sm:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`cinema-metal-accent mt-5 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      />
    </motion.div>
  );
}
