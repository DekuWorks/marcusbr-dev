/**
 * Desktop command-center side rail — existing destinations + real socials only.
 * Hidden below `lg` to avoid mobile clutter.
 */

"use client";

import {
  Briefcase,
  FolderKanban,
  Home,
  Mail,
  UserRound,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { scrollToSection } from "@/lib/scrollToSection";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { SITE } from "@/lib/site";

/** Mockup destinations only — Journey maps to existing #experience. */
const sectionLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: UserRound },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#experience", label: "Journey", icon: Briefcase },
  { href: "#contact", label: "Contact", icon: Mail },
] as const;

export default function CommandSideRail() {
  const { motionEnabled } = useMotionEnabled();

  return (
    <aside
      className="command-side-rail pointer-events-none fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 lg:block xl:left-5"
      aria-label="Section shortcuts"
    >
      <div className="command-side-rail__shell pointer-events-auto flex flex-col items-center gap-2 rounded-full border border-jade-border bg-card/55 px-2 py-3 shadow-glow-sm backdrop-blur-xl">
        <nav aria-label="Quick section navigation">
          <ul className="flex flex-col items-center gap-1.5">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  title={link.label}
                  aria-label={link.label}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.href, motionEnabled);
                    window.history.pushState(null, "", link.href);
                  }}
                  className="command-side-rail__link flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-muted transition-colors hover:border-jade/35 hover:bg-jade/10 hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
                >
                  <link.icon className="h-4 w-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="my-1 h-px w-6 bg-jade-border" aria-hidden />
        <ul
          className="flex flex-col items-center gap-1.5"
          aria-label="Social profiles"
        >
          <li>
            <a
              href={SITE.social.github}
              aria-label="GitHub profile"
              className="command-side-rail__link flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-jade/10 hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a
              href={SITE.social.linkedin}
              aria-label="LinkedIn profile"
              className="command-side-rail__link flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-jade/10 hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
