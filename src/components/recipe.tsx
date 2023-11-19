import { titleCase } from 'common-stuff'
import { Recipe } from 'schema-dts'
import Image from 'next/image'
import Link from 'next/link'
import { Comments } from './comments'
import { getIngredientBySlug } from '@/controllers/ingredients'

export interface RecipeProps {
    recipe: {
        data: {
            name: string
            description?: string
            ingredients?: Record<string, number>
            instructions?: string[]
            tips?: string[]
            recommended?: {
                name: string
                url: string
                description: string
            }[]
        }
        image: {
            src: string
            width: number
            height: number
        }
    }
}

export function Recipe({ recipe }: RecipeProps): JSX.Element {
    return (
        <article>
            {recipe.data.ingredients && recipe.data.instructions && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@type': 'Recipe',
                            name: recipe.data.name,
                            description: recipe.data.description || '',
                            recipeIngredient: Object.entries(
                                recipe.data.ingredients,
                            ).map(
                                ([ingredient, quantity]) =>
                                    `${formatQuantity(quantity)} ${titleCase(
                                        ingredient,
                                    )}`,
                            ),
                            recipeInstructions: recipe.data.instructions.map(
                                (v) => ({
                                    '@type': 'HowToStep',
                                    text: v,
                                }),
                            ),
                        } satisfies Recipe),
                    }}
                />
            )}
            <div className="prose">
                <h1 className="text-3xl mb-4 font-medium">
                    {recipe.data.name}
                </h1>
            </div>
            <div className="md:hidden mb-4 card">
                <figure>
                    <Image
                        src={recipe.image}
                        alt={recipe.data.name}
                        className="object-cover h-48 w-full dark:mix-blend-screen"
                    />
                </figure>
                <div className="card-body p-0 m-0"></div>
            </div>
            <div className="md:flex">
                <div className="md:w-2/3 md:mr-5">
                    <section className="prose">
                        {recipe.data.description && (
                            <p>{recipe.data.description}</p>
                        )}
                    </section>
                    {recipe.data.ingredients && (
                        <div className="md:hidden prose">
                            <h2 className="mt-5">Ingredients</h2>
                            <Ingredients
                                ingredients={recipe.data.ingredients}
                            />
                        </div>
                    )}
                    {recipe.data.instructions && (
                        <Instructions instructions={recipe.data.instructions} />
                    )}
                    {recipe.data.tips && (
                        <TipsAndTricks tips={recipe.data.tips} />
                    )}
                    {recipe.data.recommended && (
                        <Recommended recommended={recipe.data.recommended} />
                    )}
                    <Comments name={recipe.data.name} className="mt-5" />
                </div>
                <div className="md:w-1/3 hidden md:block card">
                    <figure>
                        <Image
                            src={recipe.image}
                            alt={recipe.data.name}
                            className="object-cover h-[16rem] w-[32rem] dark:opacity-60"
                            placeholder="blur"
                        />
                    </figure>
                    <div className="card-body px-2">
                        {recipe.data.ingredients && (
                            <Ingredients
                                ingredients={recipe.data.ingredients}
                            />
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}

function Ingredients({
    ingredients,
}: {
    ingredients: Record<string, number>
    className?: string
}): JSX.Element {
    return (
        <section className="prose">
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
                                        {`${formatQuantity(quantity)} ${
                                            ingredient?.data.unit ?? 'oz'
                                        } `}
                                        <Link
                                            href={`/ingredients/${slug}`}
                                            className="ml-1"
                                        >
                                            {ingredient.data.name}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {`${formatQuantity(
                                            quantity,
                                        )} oz ${titleCase(slug)}`}
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

function TipsAndTricks({ tips }: { tips: string[] }): JSX.Element {
    return (
        <section className="prose">
            <h2 className="mt-5">Tips & Tricks</h2>
            <ul>
                {tips.map((v, i) => (
                    <li key={i}>{v}</li>
                ))}
            </ul>
        </section>
    )
}

function Instructions({
    instructions,
}: {
    instructions: string[]
}): JSX.Element {
    return (
        <section className="prose">
            <h2 className="mt-5 md:hidden">Instructions</h2>
            <ol>
                {instructions.map((v, i) => (
                    <li key={i}>{v}</li>
                ))}
            </ol>
        </section>
    )
}

function Recommended({
    recommended,
}: {
    recommended: {
        name: string
        url: string
        description: string
    }[]
}): JSX.Element {
    return (
        <section className="prose">
            <h2 className="mt-5">Recommended</h2>
            <ul>
                {recommended.map((v) => (
                    <li key={v.name}>
                        <a href={v.url} rel="nofollow noopener" target="_blank">
                            {v.name}
                        </a>
                        {' - '}
                        {v.description}
                    </li>
                ))}
            </ul>
        </section>
    )
}

function formatQuantity(quantity: number): string {
    const q1 = Math.floor(quantity)
    const q2 = quantity - q1

    const mappings: Record<number, string> = {
        0.5: '½',
        0.3: '⅓',
        0.25: '¼',
        0.75: '¾',
        0.6: '⅔',
    }

    return `${q1 || ''} ${mappings[q2] || q2 || ''}`
}
