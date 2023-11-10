'use client'
import { useMemo } from 'react'
import { Recipes } from '@/components/recipes'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    getListFromUrlQuery,
    getListRecipes,
    getListUrl,
    replaceList,
} from '@/controllers/lists'
import { Share } from '@/components/share'
import { Alert, Modal, Button } from 'react-daisyui'
import { EditList } from '@/app/list/edit-list'
import { FaShareFromSquare, FaPenToSquare } from 'react-icons/fa6'

export default function Content(): JSX.Element {
    const router = useRouter()
    const searchParams = useSearchParams()

    const shareDialog = Modal.useDialog()
    const editDialog = Modal.useDialog()

    const list = useMemo(() => {
        return getListFromUrlQuery(Object.fromEntries(searchParams))
    }, [searchParams])

    const recipes = useMemo(() => {
        return getListRecipes(list)
    }, [list])

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl md:text-4xl">
                    {list.name || 'Unnamed list'}
                </h1>
                <div className="whitespace-nowrap ml-2">
                    <Button
                        color="primary"
                        variant="outline"
                        startIcon={<FaShareFromSquare />}
                        onClick={() => {
                            shareDialog.handleShow()
                        }}
                        className="m-1"
                    >
                        <span className="hidden md:block">Share</span>
                    </Button>
                    <Button
                        color="secondary"
                        variant="outline"
                        startIcon={<FaPenToSquare />}
                        onClick={() => {
                            editDialog.handleShow()
                        }}
                        className="ml-1"
                    >
                        <span className="hidden md:block">Edit</span>
                    </Button>
                </div>
            </div>
            {!list.recipes.length && (
                <Alert color="info">List is empty, add recipes to it</Alert>
            )}
            {!!list.recipes.length && <Recipes recipes={recipes} />}
            <shareDialog.Dialog backdrop={true}>
                <form method="dialog">
                    <Button
                        size="sm"
                        color="ghost"
                        shape="circle"
                        className="absolute right-2 top-2"
                    >
                        x
                    </Button>
                </form>
                <Modal.Header>Share</Modal.Header>
                <Modal.Body>
                    <Share />
                </Modal.Body>
            </shareDialog.Dialog>
            <editDialog.Dialog backdrop={true}>
                <form method="dialog">
                    <Button
                        size="sm"
                        color="ghost"
                        shape="circle"
                        className="absolute right-2 top-2"
                    >
                        x
                    </Button>
                </form>
                <Modal.Header>Edit</Modal.Header>
                <Modal.Body>
                    <EditList
                        list={list}
                        onSave={(v) => {
                            replaceList(list, v)
                            router.replace(getListUrl(v))

                            editDialog.handleHide()
                        }}
                    />
                </Modal.Body>
            </editDialog.Dialog>
        </>
    )
}
