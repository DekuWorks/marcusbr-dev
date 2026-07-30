/** Offset for fixed navbar when scrolling to section anchors (matches scroll-margin-top). */
export const NAV_SCROLL_OFFSET = 112;

export const SCROLL_SPY_PAUSE_MS = 800;

let scrollSpyPausedUntil = 0;

export function isScrollSpyPaused(): boolean {
  return Date.now() < scrollSpyPausedUntil;
}

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

export function scrollToSection(
  href: string,
  smooth = true,
  offset = NAV_SCROLL_OFFSET,
): void {
  const target = document.querySelector(href);
  if (!(target instanceof HTMLElement)) return;

  dispatchSectionNavigate(href);
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
