"use client";

import Link from "next/link";
import {
  type ComponentProps,
  type MouseEvent,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type ProjectTransitionLinkProps = ComponentProps<typeof Link>;

/**
 * Link that uses the View Transitions API when available.
 * Falls back to normal navigation so back-button behavior stays intact.
 */
export default function ProjectTransitionLink({
  href,
  onClick,
  children,
  ...rest
}: ProjectTransitionLinkProps) {
  const router = useRouter();
  const { motionEnabled } = useMotionEnabled();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (!motionEnabled) return;
      if (typeof document === "undefined") return;
      if (!("startViewTransition" in document)) return;

      const url =
        typeof href === "string"
          ? href
          : `${href.pathname ?? ""}${href.search ?? ""}${href.hash ?? ""}`;
      if (!url || url.startsWith("http") || url.startsWith("#")) return;

      event.preventDefault();
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => void;
      };
      doc.startViewTransition?.(() => {
        router.push(url);
      });
    },
    [href, motionEnabled, onClick, router],
  );

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
