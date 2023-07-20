import type { NextPage } from "next";
import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    Row,
    Col,
    Modal,
    Form,
    InputGroup,
    ListGroup,
} from "react-bootstrap";
import { generateUUID } from "common-stuff";
import { QRCodeCanvas } from "qrcode.react";

import { Layout } from "../components/layout";
import { Recipes } from "../components/recipes";
import { useRouter } from "next/router";
import {
    List,
    getListFromUrlQuery,
    getListUrl,
    replaceList,
} from "../controllers/lists";
import Fuse from "fuse.js";
import {
    getAllRecipesWithMeta,
    getRecipesWithMetaByIds,
} from "../controllers/recipes";

const ListPage: NextPage = () => {
    const router = useRouter();
    const [shareOpen, setShareOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const list = useMemo(() => {
        return getListFromUrlQuery(router.query);
    }, [router.query]);

    const recipes = useMemo(() => {
        return getRecipesWithMetaByIds(list.recipes);
    }, [list.recipes]);

    return (
        <Layout title="Search">
            <section className="best-receipe-area">
                <div className="container">
                    <Row className="mb-3">
                        <Col sm={8}>
                            <h1>{list.name || "Unnamed list"}</h1>
                        </Col>
                        <Col sm={4} className="text-right">
                            <Button
                                variant="outline-info"
                                className="mr-2"
                                onClick={() => setShareOpen(true)}
                            >
                                Share
                            </Button>
                            <Button
                                variant="outline-info"
                                onClick={() => setEditOpen(true)}
                            >
                                Edit
                            </Button>
                        </Col>
                    </Row>
                    {!list.recipes.length && (
                        <Alert variant="info">
                            List is empty, add recipes to it
                        </Alert>
                    )}
                    {!!list.recipes.length && <Recipes recipes={recipes} />}
                </div>
                <Modal show={shareOpen} onHide={() => setShareOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Share</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SharePage />
                    </Modal.Body>
                </Modal>
                <Modal show={editOpen} onHide={() => setEditOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditListPage
                            list={list}
                            onSave={(v) => {
                                replaceList(list, v);
                                router.replace(getListUrl(v));
                                setEditOpen(false);
                            }}
                        />
                    </Modal.Body>
                </Modal>
            </section>
        </Layout>
    );
};

function EditListPage({
    list: originalList,
    onSave,
}: {
    list: List;
    onSave: (list: List) => void;
}) {
    const [list, setList] = useState(originalList);
    const [addMode, setAddMode] = useState(false);
    const [query, setQuery] = useState("");

    const allRecipes = useMemo(() => getAllRecipesWithMeta(), []);

    const fuse = useMemo(() => {
        return new Fuse(allRecipes, {
            keys: ["data.name"],
        });
    }, [allRecipes]);

    const recipes = useMemo(() => {
        const result = query.trim()
            ? fuse.search(query).map((v) => v.item)
            : allRecipes;

        return result.filter((v) => !list.recipes.includes(v.meta.id));
    }, [fuse, query, list, allRecipes]);

    const listRecipes = useMemo(() => {
        return getRecipesWithMetaByIds(list.recipes);
    }, [list.recipes]);

    return (
        <>
            <Form.Control
                type="text"
                placeholder="Unnamed"
                defaultValue={list.name}
                onChange={(event) =>
                    setList({ ...list, name: event.target.value })
                }
                className="mb-3"
            />
            {addMode ? (
                <>
                    <Button
                        variant="outline-primary w-100"
                        className="mb-3"
                        onClick={() => setAddMode(false)}
                    >
                        Close
                    </Button>
                    <Form.Control
                        type="search"
                        placeholder="Search..."
                        className="mb-3"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                        }}
                    />
                    {!!recipes.length && (
                        <ListGroup
                            variant="flush"
                            style={{
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >
                            {recipes.map((v) => (
                                <ListGroup.Item
                                    key={v.meta.id}
                                    onClick={() =>
                                        setList({
                                            ...list,
                                            recipes: [
                                                ...list.recipes,
                                                v.meta.id,
                                            ],
                                        })
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {v.data.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    {!recipes.length && (
                        <Alert variant="info">No recipes were found</Alert>
                    )}
                </>
            ) : (
                <>
                    <Button
                        variant="outline-primary w-100"
                        className="mb-3"
                        onClick={() => setAddMode(true)}
                    >
                        Add recipe
                    </Button>
                    {!!listRecipes.length && (
                        <ListGroup
                            variant="flush"
                            style={{
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >
                            {listRecipes.map((v) => (
                                <ListGroup.Item key={v.meta.id}>
                                    <Row>
                                        <Col>{v.data.name}</Col>
                                        <Col
                                            className="text-right justify-content-center align-self-center"
                                            md={"auto"}
                                        >
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => {
                                                    setList({
                                                        ...list,
                                                        recipes:
                                                            list.recipes.filter(
                                                                (r) =>
                                                                    r !=
                                                                    v.meta.id
                                                            ),
                                                    });
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
                    {!list.recipes.length && (
                        <Alert variant="info">
                            List is empty, add recipes to it
                        </Alert>
                    )}
                </>
            )}
            <Button
                variant="outline-success w-100"
                className="mb-3"
                onClick={() => {
                    onSave(list);
                }}
            >
                Save
            </Button>
        </>
    );
}

function SharePage() {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== "undefined" ? window.location.href : "";
    const id = `share-${generateUUID()}`;

    return (
        <>
            <Alert variant="info" className="mb-2">
                You can safely share this link to the list
            </Alert>
            <InputGroup className="mb-3">
                <Form.Control disabled={true} value={url} />
                <Button
                    variant={copied ? "outline-success" : "outline-secondary"}
                    onClick={() => {
                        navigator.clipboard.writeText(url);
                        setCopied(true);
                    }}
                >
                    Copy
                </Button>
            </InputGroup>
            <div className="text-center">
                <div>
                    <QRCodeCanvas value={url} size={264} id={id} />
                </div>
                <Button
                    variant="link"
                    onClick={() => {
                        const canvas = document.getElementById(id);
                        console.log(canvas);
                        if (canvas instanceof HTMLCanvasElement) {
                            const pngUrl = canvas
                                .toDataURL("image/png")
                                .replace("image/png", "image/octet-stream");
                            let downloadLink = document.createElement("a");
                            downloadLink.href = pngUrl;
                            downloadLink.download = `share.png`;
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        }
                    }}
                >
                    {" "}
                    Download QR{" "}
                </Button>
            </div>
        </>
    );
}

export default ListPage;
