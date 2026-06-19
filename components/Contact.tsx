"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Globe, Link2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import CopyButton from "./CopyButton";
import { GitHubIcon, LinkedInIcon } from "./icons/SocialIcons";
import { SITE } from "@/lib/site";

const contactButtonClass =
  "min-w-[140px] justify-center px-4 py-2.5 text-sm sm:min-w-[150px]";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MessageSquare,
    label: "Phone",
    value: SITE.phone,
    href: `sms:${SITE.phone}`,
  },
  {
    icon: Globe,
    label: "Website",
    value: "marcusbr.dev",
    href: SITE.url,
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "DekuWorks",
    href: SITE.social.github,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "Marcus Brown",
    href: SITE.social.linkedin,
  },
  {
    icon: Link2,
    label: "Linktree",
    value: "DekuWorks",
    href: SITE.social.linktree,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="w-full px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          title="Let's Build Something"
          subtitle="Have a project, role, or collaboration in mind? Reach out and let's talk."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8 text-center shadow-glow sm:p-10"
        >
          <div className="mb-8 space-y-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-jade/5 sm:flex-row sm:justify-center sm:gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-jade/10">
                  <item.icon className="h-5 w-5 text-jade" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-cream">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`mailto:${SITE.email}`}
              variant="primary"
              className={contactButtonClass}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Send Email
            </Button>
            <Button
              href={`sms:${SITE.phone}`}
              variant="secondary"
              className={contactButtonClass}
            >
              <MessageSquare className="h-4 w-4" aria-hidden />
              Text Me
            </Button>
            <Button
              href={SITE.social.github}
              variant="secondary"
              className={contactButtonClass}
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </Button>
            <Button
              href={SITE.social.linkedin}
              variant="secondary"
              className={contactButtonClass}
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </Button>
            <Button
              href={SITE.social.linktree}
              variant="secondary"
              className={contactButtonClass}
            >
              <Link2 className="h-4 w-4" aria-hidden />
              Linktree
            </Button>
            <CopyButton
              text={SITE.email}
              label="Copy Email"
              copiedLabel="Copied"
              variant="ghost"
              className={contactButtonClass}
            />
            <CopyButton
              text={SITE.phone}
              label="Copy Phone"
              copiedLabel="Copied"
              variant="ghost"
              className={contactButtonClass}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
