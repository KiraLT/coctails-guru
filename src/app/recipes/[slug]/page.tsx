import { useMemo } from 'react'
import {
    getAllRecipes,
    getRecipeBySlug,
} from '@/controllers/recipes'
import { Metadata } from 'next/types'
import { Recipe } from '@/components/recipe'

export interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams(): Promise<Props['params'][]> {
    return getAllRecipes().map((recipe) => ({ slug: recipe.slug }))
}

export async function generateMetadata({
    params: { slug },
}: Props): Promise<Metadata> {
    const recipe = getRecipeBySlug(slug)!

    return {
        title: recipe.data.name,
        description: recipe.data.description,
        openGraph: {
            images: [
                {
                    url: recipe.image.src,
                    width: recipe.image.width,
                    height: recipe.image.height,
                    alt: recipe.data.name,
                },
            ],
        },
    }
}

export default function Page({ params: { slug } }: Props): JSX.Element {
    const recipe = useMemo(() => getRecipeBySlug(slug)!, [slug])
    return <Recipe recipe={recipe}/>
}
