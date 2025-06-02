import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Optional: Add base path if deploying to a subdirectory
  // basePath: '/church',
  // Optional: Add trailing slash if needed
  trailingSlash: true,
  // Asset prefix for static files (useful for CDN or custom domain)
  assetPrefix: 'https://breezychurch.org',
};

export default nextConfig;
