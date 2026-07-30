import { GitHubIcon, LinkedInIcon } from "./icons/SocialIcons";
import SiteLogo from "./SiteLogo";
import CommandPaletteHint from "./CommandPaletteHint";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import { SITE } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

const services = [
  "Full-Stack Development",
  "AI Engineering",
  "SaaS Product Development",
  "Mobile App Development",
  "Cloud Architecture",
  "Technical Consulting",
] as const;

export default function Footer() {
  return (
    <footer className="w-full border-t border-jade/10 bg-background/35 py-12 backdrop-blur-md">
      <PortfolioContainer>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 text-cream">
              <SiteLogo />
              <span className="font-bold">Marcus Brown</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Senior Full-Stack Developer and AI Engineer building scalable SaaS
              platforms, mobile apps, and AI-powered products through DekuWorks.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={SITE.social.github}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border text-muted transition-colors hover:border-jade/40 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
                aria-label="GitHub profile"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.social.linkedin}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border text-muted transition-colors hover:border-jade/40 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-jade-border text-muted transition-colors hover:border-jade/40 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
                aria-label="Send email"
              >
                <span className="text-sm font-semibold">@</span>
              </a>
              <CommandPaletteHint alwaysVisible />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-cream uppercase">
                Quick Links
              </h2>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade rounded-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-cream uppercase">
                Services
              </h2>
              <ul className="mt-4 space-y-2">
                {services.map((service) => (
                  <li key={service} className="text-sm text-muted">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-cream uppercase">
              Let&apos;s Connect
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-mono text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade rounded-sm"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`sms:${SITE.phone}`}
                  className="text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade rounded-sm"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.url}
                  className="text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade rounded-sm"
                >
                  marcusbr.dev
                </a>
              </li>
              <li>
                <a
                  href={SITE.resumePath}
                  download={SITE.resumeFilename}
                  className="text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade rounded-sm"
                >
                  Download resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-jade/10 pt-6 text-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Marcus Brown &bull; DekuWorks &bull;
            marcusbr.dev
          </p>
        </div>
      </PortfolioContainer>
    </footer>
  );
}
