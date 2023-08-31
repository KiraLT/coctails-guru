import Head from 'next/head'
import Image from 'next-image-export-optimizer'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { Form, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import type { WithContext, Thing } from 'schema-dts'

import logo from '../public/logo.svg'

export function Layout<T extends Thing>({
    children,
    title,
    description,
    image,
    schema,
}: {
    title: string
    description?: string
    tags?: string
    image?: string
    schema?: WithContext<T>
    children: JSX.Element
}): React.ReactElement {
    const router = useRouter()
    const { q } = router.query
    const query = typeof q === 'string' ? q : ''

    return (
        <>
            <Head>
                <title>{title}</title>
                {!!description && (
                    <meta name="description" content={description} />
                )}
                {!!image && <meta name="og:image" content={image} />}
                {!!schema && (
                    <script type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                )}

                <meta name="application-name" content="Cocktails Guru" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Cocktails Guru"
                />
                <meta
                    name="description"
                    content="Home of mixology, where Signature Cocktails take center stage. Explore our curated selection of exceptional cocktail recipes, discover new favorites, and master the art of cocktail creation."
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#000000" />

                <link rel="apple-touch-icon" href={logo} />
                <link rel="apple-touch-icon" sizes="152x152" href={logo} />
                <link rel="apple-touch-icon" sizes="180x180" href={logo} />
                <link rel="apple-touch-icon" sizes="167x167" href={logo} />

                <link rel="icon" type="image/png" sizes="32x32" href={logo} />
                <link rel="icon" type="image/png" sizes="16x16" href={logo} />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href={logo} color="#5bbad5" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <Container className="mt-5 mb-3">
                <Navbar expand="lg">
                    <Container fluid>
                        <Navbar.Brand>
                            <Link href="/" passHref legacyBehavior>
                                <a>
                                    <Image
                                        src={logo}
                                        alt=""
                                        width={200}
                                        height={59}
                                        unoptimized={true}
                                    />
                                </a>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0 ml-5"
                                style={{ maxHeight: '100px', flexGrow: '1' }}
                                navbarScroll
                            >
                                <Link href="/" passHref legacyBehavior>
                                    <Nav.Link>Home</Nav.Link>
                                </Link>
                                <Link href="/lists" passHref legacyBehavior>
                                    <Nav.Link>My Lists</Nav.Link>
                                </Link>
                            </Nav>
                            <Form
                                className="d-flex"
                                onSubmit={(event) => {
                                    event.preventDefault()

                                    const data = new FormData(
                                        event.target as HTMLFormElement,
                                    )
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
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    name="query"
                                    defaultValue={query}
                                />
                                <Button variant="link" type="submit">
                                    <FaSearch />
                                </Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
            {children}

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
        </>
    )
}
