const withYAML = require('next-yaml')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = withYAML(nextConfig)
