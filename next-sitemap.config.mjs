// @ts-check

/**
 * @type {import('next-sitemap').IConfig}
 */
export default {
    output: 'export',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://cocktailsguru.me',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    trailingSlash: true,
    exclude: ['/404/', '/list/', '/lists/', '/search/'],
}
