'use client'

import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

import logo from 'public/logo.svg'
import Link from 'next/link'

const links = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Lists',
        href: '/lists',
    },
]

export function Navigation(): JSX.Element {
    return (
        <nav className="navbar bg-base-100">
            <Link href="/" className="flex-1 hidden md:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-8 md:h-10" src={logo.src} alt="" />
            </Link>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 items-center">
                    <li className="md:mr-5">
                        <SearchBar />
                    </li>
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                className="p-3 hover:text-blue-700"
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

function SearchBar(): JSX.Element {
    const router = useRouter()

    return (
        <form
            className="flex items-center bg-base-200 p-2 rounded-full"
            onSubmit={(event) => {
                event.preventDefault()

                const data = new FormData(event.target as HTMLFormElement)
                const query = data.get('query')

                if (query) {
                    router.push(
                        `/search?${new URLSearchParams({
                            q: String(query),
                        })}`,
                    )
                }
            }}
        >
            <FaMagnifyingGlass className="h-5 w-5 pt-0.5" />
            <input
                className="ml-2 outline-none bg-transparent"
                type="search"
                name="query"
                placeholder="Search..."
            />
        </form>
    )
}
