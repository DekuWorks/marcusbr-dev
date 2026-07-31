import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { techStack } from "./technologies";
import { getTechLogo, hasTechLogo } from "./techLogos";

describe("techLogos compatibility", () => {
  it("exposes logos for every techStack skill with on-disk assets", () => {
    const root = process.cwd();
    for (const name of techStack.flatMap((group) => [...group.items])) {
      expect(hasTechLogo(name), `unmapped: ${name}`).toBe(true);
      const logo = getTechLogo(name);
      const filePath = path.join(root, "public", logo.src.replace(/^\//, ""));
      expect(existsSync(filePath), `${name} → ${filePath}`).toBe(true);
    }
  });
});
