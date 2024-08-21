const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/apikey",
        destination: `/${API_KEY}`,
      },
    ];
  },
};

export default nextConfig;
