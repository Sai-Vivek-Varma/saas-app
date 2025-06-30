import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  tyepscript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{ hostname: "img.clerk.com" }],
  },
};

export default nextConfig;
