/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Disable fallback for the 'fs' module
    config.resolve.fallback = { fs: false }

    return config
  },
}

module.exports = nextConfig
