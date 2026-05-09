import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: new URL("../..", import.meta.url).pathname,
  serverExternalPackages: ["sql.js"],
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;
