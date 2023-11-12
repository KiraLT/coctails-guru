const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    cacheOnFrontEndNav: true,
})
const withExportImages = require('next-export-optimize-images')
const withYaml = require('next-plugin-yaml')

module.exports = withYaml(withExportImages(withPWA({
    reactStrictMode: false,
    output: 'export',
    trailingSlash: true,
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
})))
