import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // static export
  images: { unoptimized: true }, // disable next/image optimization for GitHub Pages
};

export default nextConfig;
