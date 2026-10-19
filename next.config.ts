import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static mentor guide in public/hack-apertus/ (single HTML file)
  async rewrites() {
    return [{ source: '/hack-apertus', destination: '/hack-apertus/index.html' }];
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
