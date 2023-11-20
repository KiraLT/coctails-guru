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
            keys: [
                {
                    name: 'name',
                    weight: 3,
                    getFn: v => v.data.name
                },
                {
                    name: 'data.ingredients',
                    weight: 2,
                    getFn: v => Object.keys(v.data.ingredients).join(' ')
                },
                {
                    name: 'description',
                    weight: 1,
                    getFn: v => v.data.description ?? ''
                }
            ],
            threshold: 0.3
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
