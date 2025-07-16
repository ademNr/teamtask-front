//import type { NextConfig } from "next";

const nextConfig = {
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: '/api/proxy/:path*',
    },
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;


