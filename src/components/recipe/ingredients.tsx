'use client'
import { getIngredientBySlug, parseQuantity, stringifyQuantity } from '@/controllers/ingredients'
import { titleCase } from 'common-stuff'
import Link from 'next/link'
import { useState } from 'react'
import { Join, Button } from 'react-daisyui'

export function Ingredients({
    ingredients,
    className,
}: {
    ingredients: Record<string, string>
    className?: string
}): JSX.Element {
    const [scale, setScale] = useState<1 | 2 | 3>(1)

    return (
        <section className={`prose ${className ?? ''}`}>
            <h3 className="flex justify-between">
                <div>Ingredients</div>
                <div>
                    <Join>
                        <Button size='sm' className="join-item" active={scale === 1} onClick={() => setScale(1)}>1</Button>
                        <Button size='sm' className="join-item" active={scale === 2} onClick={() => setScale(2)}>2</Button>
                        <Button size='sm' className="join-item" active={scale === 3} onClick={() => setScale(3)}>3</Button>
                    </Join>
                </div>
            </h3> 
            
            <ul className="list-none p-0">
                {Object.entries(ingredients).map(([slug, quantity]) => {
                    const ingredient = getIngredientBySlug(slug)
                    const [quantityValue, quantityUnits] = parseQuantity(quantity)

                    const formattedQuantity = stringifyQuantity(quantityValue * scale, quantityUnits)
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
