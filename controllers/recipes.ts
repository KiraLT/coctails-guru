import * as z from 'zod'
import slugify from 'slugify'
import { titleCase } from 'common-stuff'

import rawRecipes from '../data/recipes.yaml'

const schema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    instructions: z.array(z.string()),
    ingredients: z.record(z.number()),
})
export type RawRecipe = z.infer<typeof schema>

export class Ingredient {
    constructor(private name: string, private quantity: number) {}

    getRepresentation(): string {
        const q1 = Math.floor(this.quantity)
        const q2 = this.quantity - q1

        const mappings: Record<number, string> = {
            0.5: '½',
            0.3: '⅓',
            0.25: '¼',
            0.75: '¾',
            0.6: '⅔',
        }

        return `${q1 || ''} ${mappings[q2] || q2 || ''} oz ${this.name}`
    }
}

export class Recipe {
    constructor(private data: RawRecipe) {}

    get id(): number {
        return this.data.id
    }

    get name(): string {
        return titleCase(this.data.name)
    }

    get slug(): string {
        return slugify(this.data.name.toLowerCase())
    }

    get url(): string {
        return `/recipes/${this.slug}`
    }

    get image(): string {
        return `/recipes/${this.data.image}`
    }

    get instructions(): string[] {
        return this.data.instructions
    }

    get ingredients(): Ingredient[] {
        return Object.entries(this.data.ingredients).map(
            ([k, v]) => new Ingredient(k, v)
        )
    }

    serialize(): RawRecipe {
        return this.data
    }

    static getAll(): Recipe[] {
        const slugs = new Set()
        return z
            .array(schema)
            .parse(rawRecipes)
            .map((r) => {
                const recipe = new Recipe(r)
                const slug = recipe.slug

                if (slugs.has(slug)) {
                    throw new Error('Fatal error')
                }

                slugs.add(slug)
                return recipe
            })
    }

    static fromSlug(slug: string): Recipe | undefined {
        return this.getAll().find((v) => v.slug === slug)
    }

    static fromId(id: number): Recipe | undefined {
        return Recipe.getAll().find((v) => v.id === id)
    }
}
