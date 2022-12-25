const withYAML = require('next-yaml')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = withYAML(module.exports)
