import { fileURLToPath } from "node:url";
import { basename } from "node:path";
import { defineConfig, type Plugin } from "vitest/config";

// Next.js turns image imports into { src, width, height }; mimic that so data files load in tests
const nextImages: Plugin = {
  name: "next-static-images",
  enforce: "pre",
  load(id) {
    if (/\.(png|jpe?g|webp|svg)$/.test(id)) {
      return `export default { src: "/_next/static/media/${basename(id)}", width: 1200, height: 800 };`;
    }
  },
};

export default defineConfig({
  plugins: [nextImages],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
