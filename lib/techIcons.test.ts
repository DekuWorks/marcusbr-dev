import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { techStack } from "./technologies";
import { getTechIcon, listMappedTechIcons } from "./techIcons";

describe("techIcons", () => {
  it("maps every techStack skill to a local public/tech asset that exists", () => {
    const root = process.cwd();
    const names = techStack.flatMap((group) => [...group.items]);

    for (const name of names) {
      const icon = getTechIcon(name);
      expect(icon.src.startsWith("/tech/")).toBe(true);
      expect(
        icon.src.endsWith(".svg") || icon.src.endsWith(".webp"),
      ).toBe(true);
      expect(icon.src).not.toBe("/tech/generic.svg");
      const filePath = path.join(root, "public", icon.src.replace(/^\//, ""));
      expect(existsSync(filePath), `${name} → missing ${filePath}`).toBe(true);
    }
  });

  it("does not invent skill percentages in the icon map", () => {
    const map = listMappedTechIcons();
    for (const meta of Object.values(map)) {
      expect("percent" in meta).toBe(false);
      expect("percentage" in meta).toBe(false);
    }
  });
});
