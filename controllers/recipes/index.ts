import { isNot, isUndefined } from "common-stuff";
import { Recipe, recipes } from "./data";
export type { Recipe };

export interface RecipeWithMeta extends Recipe {
    meta: {
        slug: string;
        id: number;
    };
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return recipes[slug];
}

export function getAllRecipeSlugs(): string[] {
    return Object.keys(recipes);
}

export function getRecipeById(id: number): Recipe | undefined {
    return Object.values(recipes).find((_, i) => i === id);
}

export function getAllRecipes(): Recipe[] {
    return Object.values(recipes);
}

export function getAllRecipesWithMeta(): RecipeWithMeta[] {
    return Object.entries(recipes).map(([slug, recipe], id) => ({
        ...recipe,
        meta: {
            slug,
            id,
        },
    }));
}

export function formatQuantity(quantity: number): string {
    const q1 = Math.floor(quantity);
    const q2 = quantity - q1;

    const mappings: Record<number, string> = {
        0.5: "½",
        0.3: "⅓",
        0.25: "¼",
        0.75: "¾",
        0.6: "⅔",
    };

    return `${q1 || ""} ${mappings[q2] || q2 || ""} oz`;
}

export function getRecipesWithMetaByIds(ids: number[]): RecipeWithMeta[] {
    const recipes = getAllRecipesWithMeta();

    return ids
        .map((id) => recipes.find((recipe) => recipe.meta.id === id))
        .filter(isNot(isUndefined));
}
