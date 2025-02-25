import type { NextConfig } from "next";

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
console.warn("DEBUG[77]: next.config.ts:4: token=", token);
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
