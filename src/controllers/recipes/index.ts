import { recipes } from './loader'
import { Recipe } from './schema'
export type { Recipe }

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return recipes.find((recipe) => recipe.slug === slug)
}

export function getAllRecipes(): Recipe[] {
    return recipes
}
