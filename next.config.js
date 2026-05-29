/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Vercel
  output: 'standalone',
  
  // Image optimization
  images: {
    unoptimized: true, // For static export
  },
}

module.exports = nextConfig
