/** Offset for fixed navbar when scrolling to section anchors. */
export const NAV_SCROLL_OFFSET = 120;

export function getSectionElements(
  ids: readonly string[],
): HTMLElement[] {
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

  const top =
    target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: smooth ? "smooth" : "auto",
  });
}
