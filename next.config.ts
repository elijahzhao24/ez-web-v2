import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const withMDX = createMDX({});

const nextConfig: NextConfig = {
  reactCompiler: false,
  transpilePackages: ["react-spotify-embed"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    root: repoRoot,
  },
};

export default withMDX(nextConfig);
