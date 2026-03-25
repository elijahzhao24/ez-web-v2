import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const repoRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: false,
  transpilePackages: ["react-spotify-embed"],
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
