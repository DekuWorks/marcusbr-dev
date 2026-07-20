import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shuchu Focus",
  description:
    "Shuchu Focus — enter focus, protect deep work. An iOS productivity app by DekuWorks.",
  alternates: { canonical: "https://marcusbr.dev/shuchu/" },
};

export default function ShuchuMarketingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-zinc-800">
      <p className="text-sm font-medium tracking-wide text-sky-700">
        DekuWorks
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Shuchu Focus
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600">
        Enter Focus. Protect deep work. Organize Tasks and Goals, run Focus
        Sessions, and optionally block distractions with Focus Protection.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link
          href="/shuchu/privacy/"
          className="rounded-full bg-sky-700 px-5 py-2.5 font-medium text-white"
        >
          Privacy Policy
        </Link>
        <Link
          href="/shuchu/support/"
          className="rounded-full border border-zinc-300 px-5 py-2.5 font-medium text-zinc-800"
        >
          Support
        </Link>
        <a
          href="https://apps.apple.com/us/app/shuchu-focus/id6792583924"
          className="rounded-full border border-zinc-300 px-5 py-2.5 font-medium text-zinc-800"
        >
          App Store
        </a>
      </div>
    </main>
  );
}
