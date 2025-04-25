/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    serverActions: true
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    }
    return config
  },
  swcMinify: false
}

export default nextConfig 