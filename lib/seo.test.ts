import { describe, expect, it } from "vitest";
import { toAbsoluteUrl } from "@/lib/seo";

describe("toAbsoluteUrl", () => {
  it("returns absolute URLs unchanged", () => {
    expect(toAbsoluteUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
  });

  it("prefixes root-relative paths with the site URL", () => {
    expect(toAbsoluteUrl("/marcus-brown.jpg")).toBe(
      "https://marcusbr.dev/marcus-brown.jpg",
    );
  });

  it("normalizes paths without a leading slash", () => {
    expect(toAbsoluteUrl("resume.pdf")).toBe(
      "https://marcusbr.dev/resume.pdf",
    );
  });
});
