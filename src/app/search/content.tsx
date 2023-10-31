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
            <h1 className="text-4xl mb-4">
                {query ? `Search for: ${query}` : 'All recipes'}
            </h1>
            <Recipes recipes={result} />
        </>
    )
}
