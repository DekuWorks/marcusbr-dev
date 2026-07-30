/**
 * @fileoverview In-page hash link with smooth scroll and liquid section emit.
 *
 * Prevents default anchor jump; uses `scrollToSection` with motion preference.
 */

"use client";

import { type MouseEvent, type ReactNode } from "react";
import { scrollToSection } from "@/lib/scrollToSection";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { useLiquidInteractionEmitter } from "@/hooks/useLiquidInteraction";

type SectionHashLinkProps = {
  href: `#${string}`;
  className?: string;
  children: ReactNode;
};

export default function SectionHashLink({
  href,
  className,
  children,
}: SectionHashLinkProps) {
  const { motionEnabled } = useMotionEnabled();
  const { emitSectionFromHref } = useLiquidInteractionEmitter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    emitSectionFromHref(href);
    scrollToSection(href, motionEnabled);
    window.history.pushState(null, "", href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
