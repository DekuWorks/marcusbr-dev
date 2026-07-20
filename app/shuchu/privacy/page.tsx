import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shuchu Focus — Privacy Policy",
  description:
    "Privacy Policy for Shuchu Focus, the iOS focus and productivity app by DekuWorks.",
  alternates: { canonical: "https://marcusbr.dev/shuchu/privacy/" },
};

export default function ShuchuPrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-zinc-800">
      <p className="text-sm font-medium tracking-wide text-sky-700">
        Shuchu Focus
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Last updated: July 19, 2026 · DekuWorks
      </p>

      <div className="prose-legal mt-10 space-y-6 text-[15px] leading-7 text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900">Overview</h2>
          <p>
            Shuchu Focus (“Shuchu,” “the App”) helps you organize Tasks and
            Goals, run Focus Sessions, and optionally use Focus Protection
            (Screen Time blocking) on your device. This policy explains what
            information we collect, how it is used, and the choices you have.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            Information we collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Account information:</strong> If you choose Sign in with
              Apple, we receive an opaque Apple user identifier and, if you
              share it, an email address managed by Apple.
            </li>
            <li>
              <strong>App content you create:</strong> Tasks, Goals, Focus
              Session history, preferences, and related metadata you enter in
              the App.
            </li>
            <li>
              <strong>Diagnostics (optional / limited):</strong> Basic
              operational logs needed to keep the service reliable. We do not
              sell personal data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            Focus Protection &amp; Screen Time
          </h2>
          <p>
            If you enable Focus Protection, Apple’s Screen Time / Family
            Controls APIs are used to block apps you select. Those selections
            are stored only in an on-device App Group and are{" "}
            <strong>never uploaded</strong> to DekuWorks servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            How we use information
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide sync and backup when you are signed in</li>
            <li>Operate Focus Sessions, Insights, and account features</li>
            <li>Respond to support requests</li>
            <li>Comply with law and protect the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            Offline / local-first use
          </h2>
          <p>
            You can use core features without creating an account. In offline
            mode, your data stays on your device unless you later sign in and
            choose to sync.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            Data sharing
          </h2>
          <p>
            We do not sell your personal information. We may use processors
            that help us host authentication and database services (for
            example, Supabase) under agreements that limit use to providing the
            App. Apple processes Sign in with Apple and in-app purchases under
            Apple’s policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            Retention &amp; deletion
          </h2>
          <p>
            You may delete your account and associated cloud data from the App
            settings when signed in. Local-only data can be removed by deleting
            the App. Apple subscriptions are managed separately in your Apple
            ID settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">Children</h2>
          <p>
            Shuchu Focus is not directed to children under 13. We do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">Contact</h2>
          <p>
            Questions about privacy:{" "}
            <a
              className="text-sky-700 underline underline-offset-2"
              href="mailto:ghxstyyfps@gmail.com"
            >
              ghxstyyfps@gmail.com
            </a>{" "}
            (DekuWorks — Shuchu Focus).
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-zinc-500">
        <Link href="/shuchu/support/" className="text-sky-700 underline">
          Support
        </Link>
        {" · "}
        <Link href="/" className="text-sky-700 underline">
          marcusbr.dev
        </Link>
      </p>
    </main>
  );
}
