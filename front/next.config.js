/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: { ignoreDuringBuilds: true },
  distDir: "build",
  output: "standalone",
  images: {
    domains: ["https://nodbe-app.liara.run"],
  },
};
