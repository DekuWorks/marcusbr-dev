"use client";

import { motion } from "framer-motion";
import { Calendar, Mail, MessageSquare, Rocket } from "lucide-react";
import Button from "./Button";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { SITE } from "@/lib/site";

export default function CTABar() {
  const { motionEnabled } = useMotionEnabled();

  return (
    <section
      aria-labelledby="cta-heading"
      className="w-full px-4 py-16 sm:px-6 sm:py-20"
    >
      <motion.div
        initial={motionEnabled ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: motionEnabled ? 0.45 : 0 }}
        className="mx-auto max-w-6xl rounded-2xl border border-jade-border bg-card/80 p-8 text-center shadow-glow backdrop-blur-sm sm:p-10"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jade/15">
          <Rocket className="h-6 w-6 text-jade-bright" aria-hidden />
        </div>
        <h2 id="cta-heading" className="text-2xl font-bold text-cream sm:text-3xl">
          Let&apos;s Build Something Amazing
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Have a project, role, or collaboration in mind? Reach out and let&apos;s
          talk about what we can build together.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            href={`mailto:${SITE.email}`}
            variant="secondary"
            className="min-h-11 w-full sm:w-auto"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email Me
          </Button>
          <Button
            href={`sms:${SITE.phone}`}
            variant="secondary"
            className="min-h-11 w-full sm:w-auto"
          >
            <MessageSquare className="h-4 w-4" aria-hidden />
            Text Me
          </Button>
          <Button
            href={`mailto:${SITE.email}?subject=Schedule%20a%20Call`}
            variant="primary"
            className="min-h-11 w-full sm:w-auto"
          >
            <Calendar className="h-4 w-4" aria-hidden />
            Schedule a Call
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
