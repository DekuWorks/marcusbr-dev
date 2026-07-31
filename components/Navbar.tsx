/**
 * @fileoverview Floating glass navbar with scroll-spy and mobile menu.
 *
 * Tracks active section via `getActiveSectionHref`, pausing during programmatic
 * scroll (`isScrollSpyPaused`). Emits liquid section-change events on nav.
 *
 * @see lib/scrollToSection.ts — anchor scrolling and spy pause lock
 * @see components/nav/* — scroll progress, magnetic links
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import SiteLogo from "./SiteLogo";
import CommandPaletteHint from "./CommandPaletteHint";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import CursorSpotlight from "@/components/liquid/CursorSpotlight";
import ScrollProgressBar from "@/components/nav/ScrollProgressBar";
import NavMagneticLink from "@/components/nav/NavMagneticLink";
import { useLiquidInteractionEmitter } from "@/hooks/useLiquidInteraction";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { hrefToSectionId } from "@/lib/liquid/interactionState";
import { SITE } from "@/lib/site";
import {
  getActiveSectionHref,
  getSectionElements,
  isScrollSpyPaused,
  scrollToSection,
  SECTION_NAVIGATE_EVENT,
  type SectionNavigateDetail,
} from "@/lib/scrollToSection";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(navLinks[0].href);
  const { emit, emitSectionFromHref } = useLiquidInteractionEmitter();
  const { motionEnabled } = useMotionEnabled();
  const prevSectionRef = useRef(activeSection);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      setActiveSection(href);
      emitSectionFromHref(href);
      scrollToSection(href, motionEnabled);
      window.history.pushState(null, "", href);
    },
    [emitSectionFromHref, motionEnabled],
  );

  const updateActiveSection = useCallback(() => {
    if (isScrollSpyPaused()) return;
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const sections = getSectionElements(sectionIds);
    const current = getActiveSectionHref(sections);
    setActiveSection(current);
  }, []);

  useEffect(() => {
    const onSectionNavigate = (event: Event) => {
      const { href } = (event as CustomEvent<SectionNavigateDetail>).detail;
      setActiveSection(href);
    };
    window.addEventListener(SECTION_NAVIGATE_EVENT, onSectionNavigate);
    return () =>
      window.removeEventListener(SECTION_NAVIGATE_EVENT, onSectionNavigate);
  }, []);

  useEffect(() => {
    if (activeSection === prevSectionRef.current) return;
    prevSectionRef.current = activeSection;
    const section = hrefToSectionId(activeSection);
    if (section) emit({ type: "sectionChange", section });
  }, [activeSection, emit]);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [updateActiveSection]);

  // Close mobile drawer on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const linkClass = (href: string) =>
    `nav-link nav-link-underline relative z-10 shrink-0 rounded-full px-2 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background 2xl:px-3 2xl:text-xs ${
      activeSection === href
        ? "font-medium text-jade-bright"
        : "text-muted hover:text-cream"
    }`;

  return (
    <header
      className={`nav-floating ${scrolled ? "is-scrolled is-compact" : ""}`}
    >
      <ScrollProgressBar />
      <PortfolioContainer className="pt-3">
        <CursorSpotlight className="relative">
          <div className="nav-floating__shell px-3 sm:px-4">
            <nav
              className="flex min-w-0 items-center gap-2 py-2.5 xl:gap-3"
              aria-label="Main navigation"
            >
              <a
                href="#home"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick("#home");
                }}
                className={`relative z-10 flex min-w-0 shrink-0 items-center gap-2 rounded-sm text-cream transition-all duration-300 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  scrolled ? "scale-[0.97]" : "scale-100"
                }`}
              >
                <SiteLogo className="h-8 w-auto shrink-0 sm:h-9" priority />
                <span
                  className={`hidden font-bold tracking-wide transition-all duration-300 sm:inline xl:hidden 2xl:inline ${
                    scrolled ? "text-sm" : "text-sm sm:text-base"
                  }`}
                >
                  Marcus Brown
                </span>
              </a>

              <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
                {navLinks.map((link) => (
                  <li key={link.href} className="shrink-0">
                    <NavMagneticLink>
                      <a
                        href={link.href}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className={linkClass(link.href)}
                        aria-current={
                          activeSection === link.href ? "page" : undefined
                        }
                      >
                        {activeSection === link.href && (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="nav-active-pill"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        <span className="relative z-10 uppercase tracking-[0.12em]">
                          {link.label}
                        </span>
                      </a>
                    </NavMagneticLink>
                  </li>
                ))}
              </ul>

              <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-2 xl:flex xl:gap-3">
                <CommandPaletteHint />
                <Button
                  href={SITE.resumePath}
                  download={SITE.resumeFilename}
                  variant="ghost"
                  className="min-h-10 px-3"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Resume
                </Button>
                <Button
                  variant="primary"
                  className="min-h-10 uppercase tracking-[0.12em]"
                  onClick={() => handleNavClick("#contact")}
                >
                  Let&apos;s Connect
                  <ArrowUpRight className="btn-icon-shift h-4 w-4" aria-hidden />
                </Button>
              </div>

              <button
                type="button"
                className="relative z-10 ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-cream transition-colors hover:bg-jade/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade xl:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </nav>
          </div>
        </CursorSpotlight>
      </PortfolioContainer>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 border-t border-jade/10 bg-[rgba(10,16,13,0.92)] backdrop-blur-xl xl:hidden"
          >
            <PortfolioContainer>
              <ul className="flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNavClick(link.href);
                        setMobileOpen(false);
                      }}
                      className={`nav-link relative flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade ${
                        activeSection === link.href
                          ? "font-medium text-jade-bright"
                          : "text-muted"
                      }`}
                      aria-current={
                        activeSection === link.href ? "page" : undefined
                      }
                    >
                      {activeSection === link.href && (
                        <motion.span
                          layoutId="nav-active-pill-mobile"
                          className="nav-active-pill nav-active-pill-drawer"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={SITE.resumePath}
                    download={SITE.resumeFilename}
                    className="mb-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-jade-border bg-card/50 px-5 py-2.5 text-sm font-medium text-cream transition-all hover:border-jade/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download Resume
                  </a>
                  <a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick("#contact");
                      setMobileOpen(false);
                    }}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-jade/30 bg-jade px-5 py-2.5 text-sm font-medium tracking-[0.12em] text-background uppercase transition-all hover:bg-jade/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Let&apos;s Connect
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              </ul>
            </PortfolioContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
