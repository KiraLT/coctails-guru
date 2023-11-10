import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Metadata } from 'next/types'

import icon16 from 'public/icon-16x16.png'
import icon32 from 'public/icon-32x32.png'
import icon192 from 'public/icon-192x192.png'
import icon256 from 'public/icon-256x256.png'

import './globals.css'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Cocktails Guru',
    description: 'Cocktails Guru',
    applicationName: 'Cocktails Guru',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
    },
    manifest: '/manifest.json',
    icons: {
        shortcut: '/favicon.ico',
        icon: [
            {
                url: icon32.src,
                sizes: '32x32',
                type: 'image/png',
            },
            {
                url: icon16.src,
                sizes: '16x16',
                type: 'image/png',
            },
        ],
        apple: [
            {
                url: icon192.src,
                sizes: '192x192',
                rel: 'apple-touch-icon',
            },
            {
                url: icon256.src,
                sizes: '256x256',
                rel: 'apple-touch-icon',
            },
        ],
    },
    viewport: {
        minimumScale: 1,
        initialScale: 1,
        width: 'device-width',
        userScalable: false,
        viewportFit: 'cover',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} max-w-screen-lg mx-auto`}>
                <Navigation />
                <main className="m-5 mt-2 md:m-0 md:mt-5">{children}</main>

                {!!process.env.NEXT_PUBLIC_GA_ID && (
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                    />
                )}
                {!!process.env.NEXT_PUBLIC_GA_ID && (
                    <Script id="google-analytics">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                
                        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                    `}
                    </Script>
                )}
            </body>
        </html>
    )
}
