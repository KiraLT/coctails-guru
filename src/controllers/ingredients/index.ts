import { ingredients } from './loader'
import { Ingredient } from './schema'
export type { Ingredient }

const specialNumbers: Record<string, number> = {
    '½': 0.5,
    '¼': 0.25,
    '¾': 0.75,
    '⅓': 0.33,
    '⅔': 0.66,
    '⅛': 0.125,
    '⅜': 0.375,
    '⅝': 0.625,
    '⅞': 0.875,
}

export function getIngredientBySlug(slug: string): Ingredient | undefined {
    return ingredients.find((recipe) => recipe.slug === slug)
}

export function getAllIngredients(): Ingredient[] {
    return ingredients
}
export function parseQuantity(quantity: string): [number, string] {
    const [amount, ...parts] = quantity.split(' ')
    const amountLastChar = amount[amount.length - 1]

    if (parts[0] in specialNumbers) {
        return [
            (parseFloat(amount) || 0) + specialNumbers[parts[0]],
            parts.slice(1).join(' '),
        ]
    } else if (amountLastChar in specialNumbers) {
        return [
            (parseFloat(amount.slice(0, -1)) || 0) +
                specialNumbers[amountLastChar],
            parts.join(' '),
        ]
    }
    return [parseFloat(amount), parts.join(' ')]
}

export function stringifyQuantity(amount: number, unit: string): string {
    const digits = amount % 1
    const rounded = Math.trunc(amount)

    const specialNumber = Object.entries(specialNumbers).find(
        ([, value]) => value === digits,
    )
    if (specialNumber) {
        return `${rounded || ''} ${specialNumber[0]} ${unit}`
    }

    return `${amount} ${unit}`
}
