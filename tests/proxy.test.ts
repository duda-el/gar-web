import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { config, proxy } from "@/proxy";

const run = (path: string) => proxy(new NextRequest(new URL(path, "https://www.gargari.ge")));

describe("language proxy", () => {
  it("serves unprefixed URLs as Georgian", () => {
    expect(run("/").headers.get("x-middleware-rewrite")).toBe("https://www.gargari.ge/ka");
    expect(run("/services").headers.get("x-middleware-rewrite")).toBe("https://www.gargari.ge/ka/services");
  });

  it("passes English URLs through", () => {
    for (const path of ["/en", "/en/projects/gree"]) {
      const res = run(path);
      expect(res.headers.get("x-middleware-rewrite")).toBeNull();
      expect(res.headers.get("x-middleware-next")).toBe("1");
    }
  });

  it("redirects /ka URLs permanently to the clean address", () => {
    const res = run("/ka/about?x=1");
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://www.gargari.ge/about?x=1");
    expect(run("/ka").headers.get("location")).toBe("https://www.gargari.ge/");
  });

  it("does not run for static files and Next internals", () => {
    const matcher = new RegExp(`^${config.matcher[0]}$`);
    expect(matcher.test("/services")).toBe(true);
    expect(matcher.test("/robots.txt")).toBe(false);
    expect(matcher.test("/_next/static/chunk.js")).toBe(false);
    expect(matcher.test("/icon-192.png")).toBe(false);
  });
});
