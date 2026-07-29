"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import SiteLogo from "./SiteLogo";
import EffectsToggle from "./EffectsToggle";
import CommandPaletteHint from "./CommandPaletteHint";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b border-jade/10 shadow-glow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="flex items-center gap-2 rounded-sm text-cream transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <SiteLogo priority />
          <span className="text-sm font-bold tracking-wide sm:text-base">
            Marcus Brown
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <CommandPaletteHint />
          <EffectsToggle />
          <Button href="#contact" variant="secondary" className="min-h-11">
            Let&apos;s Work Together
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-cream transition-colors hover:bg-jade/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card border-t border-jade/10 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 text-sm text-muted transition-colors hover:bg-jade/10 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <EffectsToggle className="w-full justify-center" />
              </li>
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-jade/30 bg-jade px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-jade/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Let&apos;s Work Together
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
