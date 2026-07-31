/**
 * Compatibility helpers for tech brand marks.
 * Canonical mapping lives in `lib/techIcons.ts`.
 */

import { getTechIcon } from "./techIcons";

export type TechLogoEntry = {
  src: string;
  alt: string;
};

export function getTechLogo(techName: string): TechLogoEntry {
  const icon = getTechIcon(techName);
  return { src: icon.src, alt: icon.alt };
}

export function hasTechLogo(techName: string): boolean {
  const icon = getTechIcon(techName);
  return icon.src !== "/tech/generic.svg";
}
