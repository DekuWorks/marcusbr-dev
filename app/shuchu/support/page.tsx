import type { Metadata } from "next";
import Link from "next/link";
import { SHUCHU_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shuchu Focus — Support",
  description: "Support and contact for Shuchu Focus by DekuWorks.",
  alternates: { canonical: "https://marcusbr.dev/shuchu/support/" },
  openGraph: {
    title: "Shuchu Focus — Support",
    description: "Support and contact for Shuchu Focus by DekuWorks.",
    url: "https://marcusbr.dev/shuchu/support/",
    siteName: "Marcus Brown Portfolio",
    type: "website",
    images: [SHUCHU_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuchu Focus — Support",
    description: "Support and contact for Shuchu Focus by DekuWorks.",
    images: [SHUCHU_OG_IMAGE.url],
  },
};

export default function ShuchuSupportPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-zinc-800">
      <p className="text-sm font-medium tracking-wide text-sky-700">
        Shuchu Focus
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Support</h1>
      <p className="mt-2 text-sm text-zinc-500">DekuWorks</p>

      <div className="mt-10 space-y-6 text-[15px] leading-7 text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900">Get help</h2>
          <p>
            For questions, feedback, or account issues with Shuchu Focus, email
            us at{" "}
            <a
              className="text-sky-700 underline underline-offset-2"
              href="mailto:ghxstyyfps@gmail.com?subject=Shuchu%20Focus%20Support"
            >
              ghxstyyfps@gmail.com
            </a>
            . We typically respond within 1–2 business days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">
            Common topics
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Focus Sessions:</strong> Start from Home or the Focus
              tab. Pause, resume, or end anytime. Emergency Exit ends Focus
              Protection immediately.
            </li>
            <li>
              <strong>Focus Protection:</strong> Uses Apple Screen Time on a
              physical device. Grant Screen Time permission in Settings →
              Permission Health / Focus Protection.
            </li>
            <li>
              <strong>Sign in with Apple:</strong> Optional. You can continue
              offline for core features.
            </li>
            <li>
              <strong>Subscriptions:</strong> Manage or cancel in iOS Settings →
              Apple ID → Subscriptions.
            </li>
            <li>
              <strong>Delete account:</strong> Available in the App under
              Settings when signed in.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">Privacy</h2>
          <p>
            Read our{" "}
            <Link
              href="/shuchu/privacy/"
              className="text-sky-700 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-zinc-500">
        <Link href="/" className="text-sky-700 underline">
          marcusbr.dev
        </Link>
      </p>
    </main>
  );
}
