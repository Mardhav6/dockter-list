/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  output: 'standalone',
  experimental: {
    serverActions: true
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    }
    return config
  }
}

export default nextConfig 