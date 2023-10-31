import { List, getListRecipes } from '@/controllers/lists'
import {
    Recipe,
    getAllRecipes,
} from '@/controllers/recipes'
import Fuse from 'fuse.js'
import { useState, useMemo } from 'react'
import { FaBars } from 'react-icons/fa6'
import { ReactSortable } from 'react-sortablejs'
import { Button, Input, Alert } from 'react-daisyui'

export function EditList({
    list: originalList,
    onSave,
}: {
    list: List
    onSave: (list: List) => void
}) {
    const [list, setList] = useState(originalList)
    const [addMode, setAddMode] = useState(false)

    const allRecipes = useMemo(() => getAllRecipes(), [])
    const listRecipes = useMemo(() => {
        return getListRecipes(list)
    }, [list])
    const nonListRecipes = useMemo(() => {
        return allRecipes.filter((v) => !list.recipes.includes(v.slug))
    }, [allRecipes, list.recipes])

    return (
        <>
            <Input
                type="text"
                placeholder="Unnamed"
                defaultValue={list.name}
                onChange={(event) =>
                    setList({ ...list, name: event.target.value })
                }
                className="mb-3 w-full"
            />
            {addMode ? (
                <>
                    <Button
                        color="primary"
                        variant="outline"
                        className="mb-3 w-full"
                        onClick={() => setAddMode(false)}
                    >
                        Close
                    </Button>
                    <AddView
                        recipes={nonListRecipes}
                        onAdd={(id) => {
                            setList({
                                ...list,
                                recipes: [...list.recipes, id],
                            })
                        }}
                    />
                </>
            ) : (
                <>
                    <Button
                        color="primary"
                        variant="outline"
                        className="mb-3 w-full"
                        onClick={() => setAddMode(true)}
                    >
                        Add recipe
                    </Button>
                    <EditView
                        recipes={listRecipes}
                        onRemove={(id) => {
                            setList({
                                ...list,
                                recipes: list.recipes.filter((v) => v !== id),
                            })
                        }}
                        onReorder={(recipes) => {
                            setList({
                                ...list,
                                recipes,
                            })
                        }}
                    />
                </>
            )}
            <Button
                color="success"
                className="mt-3 w-full"
                variant="outline"
                onClick={() => {
                    onSave(list)
                }}
            >
                Save
            </Button>
        </>
    )
}

function AddView({
    recipes,
    onAdd,
}: {
    recipes: Recipe[]
    onAdd(slug: string): void
}): JSX.Element {
    const [query, setQuery] = useState('')

    const fuse = useMemo(() => {
        return new Fuse(recipes, {
            keys: ['data.name'],
        })
    }, [recipes])

    const result = useMemo(() => {
        return query.trim() ? fuse.search(query).map((v) => v.item) : recipes
    }, [fuse, query, recipes])

    return (
        <div>
            <Input
                type="search"
                placeholder="Search..."
                className="mb-3 w-full"
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value)
                }}
            />
            {!!recipes.length && (
                <ul className="text-sm font-medium divide-y border-primary-content">
                    {result.map((v) => (
                        <li
                            key={v.slug}
                            className="w-full px-2 py-4"
                            onClick={() => onAdd(v.slug)}
                            style={{ cursor: 'pointer' }}
                        >
                            {v.data.name}
                        </li>
                    ))}
                </ul>
            )}
            {!result.length && (
                <Alert color="info">No recipes were found</Alert>
            )}
        </div>
    )
}

function EditView({
    recipes,
    onRemove,
    onReorder,
}: {
    recipes: Recipe[]
    onReorder(recipes: string[]): void
    onRemove(slug: string): void
}): JSX.Element {
    return (
        <>
            {!!recipes.length && (
                <ul className="text-sm font-medium divide-y">
                    <ReactSortable
                        tag="li"
                        list={recipes.map((v) => ({
                            id: v.slug,
                        }))}
                        setList={(state) => {
                            onReorder(state.map((v) => v.id))
                        }}
                        handle=".handle"
                    >
                        {recipes.map((v) => (
                            <div
                                key={v.slug}
                                className="flex justify-between items-center my-2"
                            >
                                <div className="handle cursor-move mx-4 text-lg">
                                    <FaBars />
                                </div>
                                <div className="grow">{v.data.name}</div>
                                <div>
                                    <Button
                                        color="error"
                                        variant="outline"
                                        onClick={() => {
                                            onRemove(v.slug)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </ul>
            )}
            {!recipes.length && (
                <Alert color="info">List is empty, add recipes to it</Alert>
            )}
        </>
    )
}
