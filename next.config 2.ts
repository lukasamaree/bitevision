import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/dcos',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
