import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files — no Next.js server. `next build` must emit
  // a fully static `out/` directory instead of a server build.
  output: "export",
  // No Image Optimization API on Pages, so <Image> must serve the raw files.
  images: { unoptimized: true },
  // Pages does not rewrite `/foo` -> `/foo/index.html`, so emit directory-style
  // URLs that resolve without a server.
  trailingSlash: true,
};

export default nextConfig;
