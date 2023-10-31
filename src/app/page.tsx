import type { Metadata } from 'next/types'
import { useMemo } from 'react'

import { Recipes } from '../components/recipes'
import { getAllRecipesWithMeta } from '../controllers/recipes'

export const metadata: Metadata = {
    title: 'Signature Cocktails',
    description:
        'Welcome to our home of mixology, where Signature Cocktails take center stage. Explore our curated selection of exceptional cocktail recipes, discover new favorites, and master the art of cocktail creation. Step into a world of flavor and innovation today!',
}

export default function Page(): JSX.Element {
    const recipes = useMemo(() => getAllRecipesWithMeta(), [])

    return (
        <>
            <h1 className="text-4xl mb-4">Signature Cocktails</h1>
            {!!recipes.length && <Recipes recipes={recipes} />}
        </>
    )
}
