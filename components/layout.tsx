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
                <link rel="icon" href="/favicon.ico" />
                {!!description && (
                    <meta name="description" content={description} />
                )}
                {!!image && <meta name="og:image" content={image} />}
                {!!schema && (
                    <script type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                )}
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
