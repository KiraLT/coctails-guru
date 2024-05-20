import { Metadata } from 'next/types'
import Content from './content'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Search',
    description:
        'Discover, explore, and manage your custom-made cocktail recipes with ease. Our "Search" page allows you to access all your favorite cocktail creations in one place. Join us to add a dash of flavor to your mixology skills.',
    robots: {
        index: false,
    },
}

export default function Page(): JSX.Element {
    return (
        <Suspense>
            <Content />
        </Suspense>
    )
}
