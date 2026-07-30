/**
 * @fileoverview Section anchor scrolling and scroll-spy coordination.
 *
 * Handles programmatic navigation to in-page `#section` anchors with a fixed
 * navbar offset. Dispatches `SECTION_NAVIGATE_EVENT` so the navbar can sync
 * active state without waiting for scroll-spy. Pauses scroll-spy during smooth
 * scroll to prevent highlight flicker.
 *
 * @see lib/navigation.ts — section id definitions
 * @see components/Navbar.tsx — scroll-spy consumer
 */

/** Offset for fixed navbar when scrolling to section anchors (matches scroll-margin-top). */
export const NAV_SCROLL_OFFSET = 112;

/** Duration to suppress scroll-spy updates after programmatic navigation. */
export const SCROLL_SPY_PAUSE_MS = 800;

let scrollSpyPausedUntil = 0;

/** @returns Whether scroll-spy should skip updating the active section. */
export function isScrollSpyPaused(): boolean {
  return Date.now() < scrollSpyPausedUntil;
}

/**
 * Temporarily disable scroll-spy so programmatic scroll does not fight highlight updates.
 * @param durationMs — lock duration in milliseconds
 */
export function pauseScrollSpy(durationMs = SCROLL_SPY_PAUSE_MS): void {
  scrollSpyPausedUntil = Date.now() + durationMs;
}

export const SECTION_NAVIGATE_EVENT = "section-navigate";

export type SectionNavigateDetail = { href: string };

function dispatchSectionNavigate(href: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<SectionNavigateDetail>(SECTION_NAVIGATE_EVENT, {
      detail: { href },
    }),
  );
}

/**
 * Resolve section elements by id and sort by document position (top → bottom).
 * DOM order may differ from nav link order — sorting is required for scroll-spy.
 */
export function getSectionElements(ids: readonly string[]): HTMLElement[] {
  return ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el))
    .sort(
      (a, b) =>
        a.getBoundingClientRect().top +
        window.scrollY -
        (b.getBoundingClientRect().top + window.scrollY),
    );
}

/**
 * Determine which section is currently "active" based on viewport position.
 * A section is active when its top edge has scrolled past the navbar offset.
 */
export function getActiveSectionHref(
  sectionElements: HTMLElement[],
  offset = NAV_SCROLL_OFFSET,
): string {
  let current = sectionElements[0] ? `#${sectionElements[0].id}` : "#home";

  for (const section of sectionElements) {
    if (section.getBoundingClientRect().top <= offset) {
      current = `#${section.id}`;
    }
  }

  return current;
}

/**
 * Scroll to an in-page section anchor.
 * @param href — hash selector, e.g. `#projects`
 * @param smooth — use smooth scrolling when true
 * @param offset — pixels from top (navbar height + breathing room)
 */
export function scrollToSection(
  href: string,
  smooth = true,
  offset = NAV_SCROLL_OFFSET,
): void {
  const target = document.querySelector(href);
  if (!(target instanceof HTMLElement)) return;

  dispatchSectionNavigate(href);
  // Lock scroll-spy for the full smooth-scroll duration to avoid highlight flicker.
  pauseScrollSpy(smooth ? SCROLL_SPY_PAUSE_MS : 150);

  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: smooth ? "smooth" : "auto",
  });

  if (smooth && "onscrollend" in window) {
    const onScrollEnd = () => {
      pauseScrollSpy(150);
      window.removeEventListener("scrollend", onScrollEnd);
    };
    window.addEventListener("scrollend", onScrollEnd, { once: true });
  }
}
