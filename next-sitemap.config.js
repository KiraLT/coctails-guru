/** @type {import('next-sitemap').IConfig} */
module.exports = {
    output: 'export',
    siteUrl: 'https://cocktailsguru.me',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    trailingSlash: true,
    exclude: ['404']
}
