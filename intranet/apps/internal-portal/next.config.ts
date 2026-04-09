import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@platform/auth", "@platform/config", "@platform/types", "@platform/ui"],
};

export default nextConfig;
