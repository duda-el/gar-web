import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/services",
        destination: "/",
      },
      {
        source: "/projects",
        destination: "/",
      },
      {
        source: "/about",
        destination: "/",
      },
      {
        source: "/contact",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;