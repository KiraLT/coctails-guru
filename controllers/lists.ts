import { deduplicateBy, isNot, isUndefined } from 'common-stuff'
import { Recipe } from './recipes'

interface RawList {
    name: string
    recipes: number[]
}

export class List {
    static localStorageKey = 'my-lists'

    constructor(public name: string = '', public recipes: Recipe[] = []) {}

    save(): List {
        List.save([
            ...List.getAll(),
            this
        ])
        return this
    }

    delete(): List {
        List.save(List.getAll().filter(v => v.name != this.name))
        return this
    }

    get url(): string {
        return `/list?${new URLSearchParams({
            n: this.name,
            r: this.recipes.map((v) => v.id).join(' '),
        })}`
    }

    setName(name: string): List {
        return new List(name, this.recipes)
    }

    addRecipe(recipe: Recipe): List {
        return new List(this.name, deduplicateBy([...this.recipes, recipe], v => v.id))
    }

    removeRecipe(recipe: Recipe): List {
        return new List(this.name, this.recipes.filter(v => v.id != recipe.id))
    }

    static getAll(): List[] {
        if (typeof window === 'undefined') {
            return []
        }
        const string = window.localStorage.getItem(List.localStorageKey)
        const data = string ? (JSON.parse(string) as RawList[]) : []

        return data.map((v) => List.create(v.name, v.recipes))
    }

    static create(name: string = '', recipes: number[] = []): List {
        return new List(
            name,
            recipes.map(Recipe.fromId).filter(isNot(isUndefined))
        )
    }

    static fromUrlQuery(query: Record<string, string | string[] | undefined | null>): List {
        const name = typeof query.n === 'string' ? query.n : ''
        const recipeIds = typeof query.r === 'string' ?
            query.r.split(' ').map((v) => parseInt(v, 10) || undefined).filter(isNot(isUndefined)) :
            []

        return List.create(name, recipeIds)
    }

    static save(lists: List[]): void {
        window.localStorage.setItem(
            List.localStorageKey,
            JSON.stringify(
                deduplicateBy(
                    lists.map(v => ({
                        name: v.name,
                        recipes: v.recipes.map((v) => v.id),
                    } as RawList)),
                    (v) => v.name
                )
            )
        )
    }
}
