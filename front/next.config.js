/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["nodbe-app.liara.run"],
  },
  output: "standalone",
};

module.exports = nextConfig;
