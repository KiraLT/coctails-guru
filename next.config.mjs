// @ts-check
import nextPwa from 'next-pwa'
import withExportImages from 'next-export-optimize-images'
import withYaml from 'next-plugin-yaml'

const withPWA = nextPwa({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    cacheOnFrontEndNav: true,
})

export default async () =>
    await withExportImages(
        withYaml(
            withPWA({
                reactStrictMode: false,
                output: 'export',
                trailingSlash: true,
                images: {
                    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
                },
            }),
        ),
    )
