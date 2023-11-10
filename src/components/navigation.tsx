'use client'

import { FaMagnifyingGlass, FaBars, FaHouse, FaList } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { Navbar, Menu, Dropdown } from 'react-daisyui'

import logo from 'public/logo.svg'
import Link from 'next/link'

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
]

export function Navigation(): JSX.Element {
    return (
        <Navbar>
            <Navbar.Start className="hidden md:block">
                <Link href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-8 md:h-10" src={logo.src} alt="" />
                </Link>
            </Navbar.Start>
            <Navbar.Center className="grow">
                <SearchBar />
            </Navbar.Center>
            <Navbar.End className="shrink w-auto">
                <Menu className="hidden md:flex" horizontal={true}>
                    {links.map((link) => (
                        <Menu.Item key={link.href}>
                            <Link
                                className="p-3 hover:text-blue-700"
                                href={link.href}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <Dropdown className="md:hidden">
                    <Dropdown.Toggle
                        className="btn btn-ghost rounded-btn text-2xl"
                        button={false}
                    >
                        <FaBars />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100 mt-4 bg-base-300 z-50 !fixed inset-x-0">
                        {links.map((link) => (
                            <Menu.Item key={link.href}>
                                <Link
                                    className="p-3 hover:text-blue-700"
                                    href={link.href}
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
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
