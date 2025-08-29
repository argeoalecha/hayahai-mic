/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Optimize for production
  },
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
  },
}

module.exports = nextConfig