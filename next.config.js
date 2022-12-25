const withYAML = require('next-yaml')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true
}

module.exports = withYAML(nextConfig)
