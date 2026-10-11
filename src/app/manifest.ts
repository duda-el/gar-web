import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gargari — ვებ საიტების დამზადება",
    short_name: "Gargari",
    description: "ვებ საიტების დამზადება, UI/UX დიზაინი და ბრენდინგი თბილისში",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "ka",
    background_color: "#FFFFFF",
    theme_color: "#121212",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
