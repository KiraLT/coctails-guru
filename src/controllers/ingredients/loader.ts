import { groupBy } from 'common-stuff'
import { Ingredient, ingredientSchema } from './schema'

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

const loader = require.context('./data', true, /\.(png|yaml)$/)

export const ingredients = groupBy(
    loader.keys().map((v) => {
        const slug = v.split('/').slice(-2, -1)[0]
        if (v.endsWith('.png')) {
            return {
                slug,
                type: 'image' as const,
                data: loader<{ default: unknown }>(v).default,
            }
        }
        return {
            slug,
            type: 'recipe',
            data: loader(v),
        }
    }),
    (v) => v.slug,
).map(([slug, values]) => {
    return ingredientSchema.parse({
        slug,
        data: values.find((v) => v.type === 'recipe')?.data,
        image: values.find((v) => v.type === 'image')
            ?.data as Ingredient['image'],
    })
})
