import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
//config fake api
images: {
    domains: ['fakestoreapi.com'],
    // allow github usercontent for images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;
