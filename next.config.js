const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
})

const withExportImages = require('next-export-optimize-images')


module.exports = withPWA(withExportImages({
    reactStrictMode: false,
    output: 'export',
    trailingSlash: true
}))
