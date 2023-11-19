import { useMemo } from 'react'
import { Metadata } from 'next/types'
import {
    getAllIngredients,
    getIngredientBySlug,
} from '@/controllers/ingredients'
import { Recipe } from '@/components/recipe'

export interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams(): Promise<Props['params'][]> {
    return getAllIngredients().map((ingredient) => ({ slug: ingredient.slug }))
}

export async function generateMetadata({
    params: { slug },
}: Props): Promise<Metadata> {
    const ingredient = getIngredientBySlug(slug)

    return ingredient
        ? {
              title: ingredient.data.name,
              description: ingredient.data.description,
              openGraph: {
                  images: [
                      {
                          url: ingredient.image.src,
                          width: ingredient.image.width,
                          height: ingredient.image.height,
                          alt: ingredient.data.name,
                      },
                  ],
              },
          }
        : {}
}

export default function Page({ params: { slug } }: Props): JSX.Element {
    const ingredient = useMemo(() => getIngredientBySlug(slug)!, [slug])

    return <Recipe recipe={ingredient} />
}
