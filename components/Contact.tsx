"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Globe } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import CopyButton from "./CopyButton";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "marcusb0611@gmail.com",
    href: "mailto:marcusb0611@gmail.com",
  },
  {
    icon: MessageSquare,
    label: "Phone",
    value: "8645247473",
    href: "sms:8645247473",
  },
  {
    icon: Globe,
    label: "Website",
    value: "marcusbr.dev",
    href: "https://marcusbr.dev",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="w-full px-6 py-24">
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
            <Button href="mailto:marcusb0611@gmail.com" variant="primary">
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
            <Button href="sms:8645247473" variant="secondary">
              <MessageSquare className="h-4 w-4" />
              Text Me
            </Button>
            <CopyButton
              text="marcusb0611@gmail.com"
              label="Copy Email"
              copiedLabel="Copied"
              variant="ghost"
            />
            <CopyButton
              text="8645247473"
              label="Copy Phone"
              copiedLabel="Copied"
              variant="ghost"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
