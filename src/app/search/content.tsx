'use client'
import { Recipes } from '@/components/recipes'
import { getAllRecipes } from '@/controllers/recipes'
import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Content(): JSX.Element {
    const searchParams = useSearchParams()
    const recipes = useMemo(() => getAllRecipes(), [])
    const fuse = useMemo(() => {
        return new Fuse(recipes, {
            keys: ['data.name'],
        })
    }, [recipes])
    const query = searchParams.get('q')

    const result = useMemo(() => {
        return query ? fuse.search(query).map((v) => v.item) : recipes
    }, [fuse, query, recipes])

    return (
        <>
            <div className="prose">
                <h1 className="text-3xl mb-4 font-medium">
                    {query ? `Search for: ${query}` : 'All recipes'}
                </h1>
            </div>
            <Recipes recipes={result} />
        </>
    )
}
