import { getIngredientBySlug } from '@/controllers/ingredients'
import { titleCase } from 'common-stuff'
import Link from 'next/link'

export function Ingredients({
    ingredients,
    className,
}: {
    ingredients: Record<string, string>
    className?: string
}): JSX.Element {
    return (
        <section className={`prose ${className ?? ''}`}>
            <h3>Ingredients</h3>
            <ul className="list-none p-0">
                {Object.entries(ingredients).map(([slug, quantity]) => {
                    const ingredient = getIngredientBySlug(slug)

                    return (
                        <li key={slug}>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="checkbox mr-2"
                                />
                                {ingredient ? (
                                    <>
                                        {quantity}
                                        <Link
                                            href={`/ingredients/${slug}`}
                                            className="ml-1"
                                        >
                                            {ingredient.data.name}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {`${quantity} ${titleCase(
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
