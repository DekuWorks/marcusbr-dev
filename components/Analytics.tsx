import Script from "next/script";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Optional privacy-friendly analytics via Plausible.
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN (e.g. marcusbr.dev) to enable — disabled by default.
 */
export default function Analytics() {
  if (!plausibleDomain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={plausibleDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
