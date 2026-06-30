import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dn710007.ca.archive.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dn721808.ca.archive.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dn721601.ca.archive.org',
        pathname: '/**',
      },
      // If you ever need placeholder images (optional)
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
  // Allow audio files to be played (no special config needed, but allow archive.org for audio requests)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
