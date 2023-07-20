import type { NextPage } from 'next'
import { Alert, Badge, Button, Col, ListGroup, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useAsync } from 'react-async-hook'

import { Layout } from '../components/layout'
import { List } from '../controllers/lists'

const Lists: NextPage = () => {
    const lists = useAsync(async () => List.getAll(), [])

    return (
        <Layout title="Search">
            <section className="best-receipe-area">
                <div className="container">
                    <Row className="mb-3">
                        <Col sm={8}>
                            <h1>My lists</h1>
                        </Col>
                        <Col sm={4} className="text-right">
                            <Link href={new List().url} passHref>
                                <Button variant="outline-info">
                                    Create new list
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    {!lists.result?.length && (
                        <Alert variant="info">
                            {"You don't have any list"}
                        </Alert>
                    )}
                    {!!lists.result?.length && (
                        <ListGroup variant="flush">
                            {lists.result?.map((v) => (
                                <ListGroup.Item
                                    style={{ cursor: 'pointer' }}
                                    key={v.name}
                                >
                                    <Row>
                                        <Link href={v.url}>
                                            <Col className="justify-content-center align-self-center">
                                                <span className="text-truncate">
                                                    {v.name}
                                                </span>{' '}
                                                <small className="text-muted">
                                                    ({v.recipes.length} recipes)
                                                </small>
                                            </Col>
                                        </Link>
                                        <Col
                                            className="text-right justify-content-center align-self-center"
                                            md={'auto'}
                                        >
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => {
                                                    v.delete()
                                                    lists.execute()
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export default Lists
