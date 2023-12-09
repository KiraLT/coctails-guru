'use client'
import {
    getIngredientBySlug,
    parseQuantity,
    stringifyQuantity,
} from '@/controllers/ingredients'
import { titleCase } from 'common-stuff'
import Link from 'next/link'
import { useState } from 'react'
import { Join, Button } from 'react-daisyui'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useIngredientsStore = create(
    persist<{
        units: 'oz' | 'ml'
        setUnits: (units: 'oz' | 'ml') => void
    }>(
        (set, get) => ({
            units: 'oz',
            setUnits: (units) => set({ units }),
        }),
        {
            name: 'recipe-ingredients-store',
        },
    ),
)

export function Ingredients({
    ingredients,
    className,
}: {
    ingredients: Record<string, string>
    className?: string
}): JSX.Element {
    const [scale, setScale] = useState<1 | 2 | 3>(1)

    const store = useIngredientsStore()

    return (
        <section className={`prose ${className ?? ''}`}>
            <h3 className="flex justify-between">
                <div className="grow">Ingredients</div>
                <div className="relative">
                    <Join>
                        <Button
                            size="sm"
                            className="join-item"
                            active={scale === 1}
                            onClick={() => setScale(1)}
                        >
                            1
                        </Button>
                        <Button
                            size="sm"
                            className="join-item"
                            active={scale === 2}
                            onClick={() => setScale(2)}
                        >
                            2
                        </Button>
                        <Button
                            size="sm"
                            className="join-item"
                            active={scale === 3}
                            onClick={() => setScale(3)}
                        >
                            3
                        </Button>
                    </Join>
                    <div className="absolute right-0">
                        <Join>
                            <Button
                                size="xs"
                                className="join-item"
                                active={store.units === 'oz'}
                                onClick={() => store.setUnits('oz')}
                            >
                                oz
                            </Button>
                            <Button
                                size="xs"
                                className="join-item"
                                active={store.units === 'ml'}
                                onClick={() => store.setUnits('ml')}
                            >
                                ml
                            </Button>
                        </Join>
                    </div>
                </div>
            </h3>

            <ul className="list-none p-0" suppressHydrationWarning>
                {Object.entries(ingredients).map(([slug, quantity]) => {
                    const ingredient = getIngredientBySlug(slug)
                    const [quantityValue, quantityUnits] =
                        parseQuantity(quantity)

                    const scaledQuantity = quantityValue * scale
                    const convertedUnits =
                        quantityUnits === 'oz' ? store.units : quantityUnits
                    const convertedQuantity =
                        quantityUnits === 'oz' && store.units === 'ml'
                            ? Math.round(scaledQuantity * 30)
                            : scaledQuantity
                    const formattedQuantity = stringifyQuantity(
                        convertedQuantity,
                        convertedUnits,
                    )
                    return (
                        <li key={slug}>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="checkbox mr-2"
                                />
                                {ingredient ? (
                                    <>
                                        {formattedQuantity}
                                        <Link
                                            href={`/ingredients/${slug}`}
                                            className="ml-1"
                                        >
                                            {ingredient.data.name}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {`${formattedQuantity} ${titleCase(
                                            slug.split('-').join(' '),
                                        )}`}
                                    </>
                                )}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
