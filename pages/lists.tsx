import type { NextPage } from 'next'
import { Alert, Button, Col, ListGroup, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useAsync } from 'react-async-hook'

import { Layout } from '../components/layout'
import { deleteListByName, getAllLists, getListUrl } from '../controllers/lists'

const Lists: NextPage = () => {
    const lists = useAsync(async () => getAllLists(), [])

    return (
        <Layout title="Search">
            <section className="best-receipe-area">
                <div className="container">
                    <Row className="mb-3">
                        <Col sm={8}>
                            <h1>My lists</h1>
                        </Col>
                        <Col sm={4} className="text-right">
                            <Link href="list" passHref>
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
                                <ListGroup.Item key={v.name}>
                                    <Row>
                                        <Col className="justify-content-center align-self-center">
                                            <Link href={getListUrl(v)}>
                                                <span className="text-truncate">
                                                    {v.name}
                                                </span>{' '}
                                                </Link>
                                                <small className="text-muted">
                                                    ({v.recipes.length} recipes)
                                                </small>
                                        </Col>
                                        <Col
                                            className="text-right justify-content-center align-self-center"
                                            md={'auto'}
                                        >
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => {
                                                    deleteListByName(v.name)
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
