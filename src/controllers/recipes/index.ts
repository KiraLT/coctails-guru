import { recipes } from './loader'
import { Recipe } from './schema'
export type { Recipe }

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return recipes.find((recipe) => recipe.slug === slug)
}

export function getAllRecipes(): Recipe[] {
    return recipes
}

export function formatQuantity(ingredient: string, quantity: number): string {
    const q1 = Math.floor(quantity)
    const q2 = quantity - q1

    const mappings: Record<number, string> = {
        0.5: '½',
        0.3: '⅓',
        0.25: '¼',
        0.75: '¾',
        0.6: '⅔',
    }

    const units = getUnits(ingredient, quantity > 1)

    return `${q1 || ''} ${mappings[q2] || q2 || ''} ${units}`
}

function getUnits(ingredient: string, plural: boolean): string {
    if (ingredient.includes('bitter')) {
        return plural ? 'dashes' : 'dash'
    }

    return plural ? 'oz' : 'oz'
}
