import type { Metadata } from 'next'
import Link from 'next/link'
import Content from './content'
import { FaPlus } from 'react-icons/fa6'

export const metadata: Metadata = {
    title: 'My lists',
    description:
        'Discover, explore, and manage your custom-made cocktail recipes with ease. Our "My Cocktail Lists" page allows you to access all your favorite cocktail creations in one place. Join us to add a dash of flavor to your mixology skills.',
}

export default function Page(): JSX.Element {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl">My lists</h1>
                <Link href="/list" className="btn btn-success btn-outline">
                    <FaPlus />
                    <div className='hidden md:block'>Create</div>
                </Link>
            </div>
            <Content />
        </>
    )
}
