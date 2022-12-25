import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Form, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

export function Layout({
    children, title
}: {
    title: string
    children: JSX.Element
}): React.ReactElement {
    const router = useRouter()
    const { q } = router.query
    const query = typeof q === 'string' ? q : ''

    return <>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container className="mt-5 mb-3">
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <Link href="/">
                            <a>
                                <Image src="/logo.png" alt="" width={200} height={59} />
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
                            <Link href="/" passHref>
                                <Nav.Link>
                                    Home
                                </Nav.Link>
                            </Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={event => {
                            event.preventDefault()
                            
                            const data = new FormData(event.target as HTMLFormElement)
                            const query = data.get('query')

                            if (query) {
                                router.push(`/search?${new URLSearchParams({
                                    q: String(query)
                                })}`)
                            }
                        }}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                name="query"
                                defaultValue={query}
                            />
                            <Button variant="link" type="submit">
                                <FaSearch/>
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
        {children}
    </>
}