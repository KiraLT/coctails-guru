'use client'

import { FaMagnifyingGlass, FaBars, FaHouse, FaList, FaGithub } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { Navbar, Menu, Dropdown } from 'react-daisyui'

import logo from 'public/logo.svg'
import Link from 'next/link'
import { useRef } from 'react'

const links = [
    {
        name: 'Home',
        href: '/',
        icon: <FaHouse />,
    },
    {
        name: 'Lists',
        href: '/lists',
        icon: <FaList />,
    },
    {
        name: 'GitHub',
        href: 'https://github.com/KiraLT/cocktails-guru',
        icon: <FaGithub/>
    }
]

export function Navigation(): JSX.Element {
    const ref = useRef<HTMLDetailsElement>(null)

    return (
        <Navbar className="px-5 py-2">
            <Navbar.Start className="hidden md:block w-auto grow">
                <Link href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-8 lg:h-10" src={logo.src} alt="" />
                </Link>
            </Navbar.Start>
            <Navbar.Center className="grow">
                <SearchBar />
            </Navbar.Center>
            <Navbar.End className="shrink w-auto">
                <Menu className="hidden lg:flex" horizontal={true}>
                    {links.map((link) => (
                        <Menu.Item key={link.href}>
                            {link.href.startsWith('/') ? (
                                <Link
                                    className="p-3 hover:text-blue-700"
                                    href={link.href}
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    className="p-3 hover:text-blue-700"
                                    href={link.href}
                                    rel="nofollow noopener"
                                    target="_blank"
                                >
                                    {link.icon}
                                    {link.name}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu>
                <Dropdown.Details className="lg:hidden ml-2" ref={ref}>
                    <Dropdown.Details.Toggle className="text-2xl">
                        <FaBars />
                    </Dropdown.Details.Toggle>
                    <Dropdown.Menu className="w-100 mt-4 bg-base-300 z-50 !fixed inset-x-2.5">
                        {links.map((link) => (
                            <Menu.Item key={link.href}>
                                {link.href.startsWith('/') ? (
                                    <Link
                                        className="p-3 hover:text-blue-700"
                                        href={link.href}
                                        onClick={() => {
                                            ref.current?.removeAttribute('open')
                                        }}
                                    >
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        className="p-3 hover:text-blue-700"
                                        href={link.href}
                                        rel="nofollow noopener"
                                        target="_blank"
                                    >
                                        {link.icon}
                                        {link.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown.Details>
            </Navbar.End>
        </Navbar>
    )
}

function SearchBar(): JSX.Element {
    const router = useRouter()

    return (
        <form
            className="flex items-center bg-base-200 p-2 rounded-full w-full"
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
                className="ml-2 outline-none bg-transparent w-full"
                type="search"
                name="query"
                placeholder="Search..."
            />
        </form>
    )
}
