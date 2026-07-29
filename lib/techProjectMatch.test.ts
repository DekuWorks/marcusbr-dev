import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS } from "@/lib/projects";
import {
  getProjectsForTechnology,
  projectUsesTechnology,
} from "@/lib/techProjectMatch";

describe("projectUsesTechnology", () => {
  it("matches exact technology names case-insensitively", () => {
    const project = FEATURED_PROJECTS[0];
    const tech = project.technologies[0];
    expect(projectUsesTechnology(project, tech.toUpperCase())).toBe(true);
  });

  it("returns false for unrelated technologies", () => {
    const project = FEATURED_PROJECTS[0];
    expect(projectUsesTechnology(project, "COBOL")).toBe(false);
  });
});

describe("getProjectsForTechnology", () => {
  it("returns projects that list the technology", () => {
    const reactProjects = getProjectsForTechnology("React");
    expect(reactProjects.length).toBeGreaterThan(0);
    expect(reactProjects.every((p) => projectUsesTechnology(p, "React"))).toBe(
      true,
    );
  });
});
