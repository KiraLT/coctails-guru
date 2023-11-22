'use client'

import { getAllLists, getListUrl, deleteListByName } from '@/controllers/lists'
import Link from 'next/link'
import { useAsync } from 'react-async-hook'
import { Button, Alert } from 'react-daisyui'
import { FaCircleInfo, FaTrashCan } from 'react-icons/fa6'

export default function Content(): JSX.Element {
    const lists = useAsync(async () => getAllLists(), [])

    return (
        <>
            {!lists.loading && !lists.result?.length && (
                <Alert status="info" icon=<FaCircleInfo />>
                    {"You don't have any list"}
                </Alert>
            )}

            {lists.result?.map((v) => (
                <ul key={v.name} className="text-sm font-medium divide-y">
                    <li className="flex justify-between items-center my-2 border-primary-content">
                        <div>
                            <Link href={getListUrl(v)}>
                                <span className="text-truncate">
                                    {v.name || 'Unnamed list'}
                                </span>{' '}
                            </Link>
                            <small className="text-muted">
                                ({v.recipes.length} recipes)
                            </small>
                        </div>
                        <Button
                            color="error"
                            variant="outline"
                            startIcon={<FaTrashCan />}
                            onClick={() => {
                                deleteListByName(v.name)
                                lists.execute()
                            }}
                        >
                            <div className="hidden md:block">Delete</div>
                        </Button>
                    </li>
                </ul>
            ))}
        </>
    )
}
