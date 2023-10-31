import { StaticImageData } from 'next/image'
import { groupBy } from 'common-stuff'

export type RecipeLabel = 'signature'

export interface Recipe {
    slug: string
    image: StaticImageData
    data: {
        name: string
        description?: string
        ingredients: Record<string, number>
        instructions: string[]
        tips?: string[]
        labels?: RecipeLabel[]
    }
}

declare const require: {
    context(
        path: string,
        deep?: boolean,
        filter?: RegExp,
    ): {
        keys(): string[]
        <T>(id: string): T
    }
}

const loader = require.context('.', true, /\.(png|yaml)$/)

export const recipes = groupBy(
    loader.keys().map((v) => {
        const slug = v.split('/').slice(-2, -1)[0]
        if (v.endsWith('.png')) {
            return {
                slug,
                type: 'image' as const,
                data: loader<{ default: StaticImageData }>(v).default,
            }
        }
        return {
            slug,
            type: 'recipe',
            data: loader(v),
        }
    }),
    (v) => v.slug,
)
    .map<Recipe>(([slug, values]) => {
        return {
            slug,
            data: values.find((v) => v.type === 'recipe')
                ?.data as Recipe['data'],
            image: values.find((v) => v.type === 'image')
                ?.data as Recipe['image'],
        }
    })
    .map((v) => {
        if (!v.image || !v.data) {
            throw new Error(`Recipe ${v.slug} is missing image or data`)
        }
        return v
    })
