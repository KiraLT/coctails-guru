/** @type {import('next-sitemap').IConfig} */
module.exports = {
    output: 'export',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    trailingSlash: true,
    exclude: ['/404/', '/list/', '/lists/', '/search/'],
}
