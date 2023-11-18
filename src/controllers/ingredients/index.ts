import { ingredients } from './loader'
import { Ingredient } from './schema'
export type { Ingredient }

export function getIngredientBySlug(slug: string): Ingredient | undefined {
    return ingredients.find((recipe) => recipe.slug === slug)
}

export function getAllIngredients(): Ingredient[] {
    return ingredients
}
