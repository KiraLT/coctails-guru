import type { Metadata } from 'next/types'
import { useMemo } from 'react'

import { Recipes } from '../components/recipes'
import { getAllRecipes } from '../controllers/recipes'
import { sortBy } from 'common-stuff'

export default function Page(): JSX.Element {
    const recipes = useMemo(
        () =>
            sortBy(
                getAllRecipes(),
                (v) => v.data.labels?.includes('signature'),
            ),
        [],
    )

    return (
        <>
            <div className="prose">
                <h1 className="text-3xl mb-4 font-medium">
                    Signature Cocktails
                </h1>
            </div>
            {!!recipes.length && <Recipes recipes={recipes} />}
        </>
    )
}
