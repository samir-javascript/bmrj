import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.marjanemall.ma',
      },
    ],
  },
};

export default nextConfig;
