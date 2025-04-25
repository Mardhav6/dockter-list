/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    serverActions: true
  },
  output: 'export',
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig; 