/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Laravel backend (local)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },

      // Your existing entries
      { protocol: "https", hostname: "solamoenergy.com" },
      { protocol: "http", hostname: "solamoenergy.com" },
      { protocol: "https", hostname: "sahirgogari.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;