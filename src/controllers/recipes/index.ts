import { Recipe, recipes } from './data'
export type { Recipe }

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return recipes.find((recipe) => recipe.slug === slug)
}

export function getAllRecipes(): Recipe[] {
    return recipes
}

export function formatQuantity(quantity: number): string {
    const q1 = Math.floor(quantity)
    const q2 = quantity - q1

    const mappings: Record<number, string> = {
        0.5: '½',
        0.3: '⅓',
        0.25: '¼',
        0.75: '¾',
        0.6: '⅔',
    }

    return `${q1 || ''} ${mappings[q2] || q2 || ''} oz`
}
