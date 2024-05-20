import { titleCase } from 'common-stuff'
import type * as Schema from 'schema-dts'
import Image from 'next-export-optimize-images/image'
import { Comments } from '@/components/comments'
import { Ingredients } from './ingredients'

export interface RecipeProps {
    recipe: {
        data: {
            name: string
            description?: string
            ingredients?: Record<string, string>
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
                                    `${quantity} ${titleCase(
                                        ingredient.split('-').join(' '),
                                    )}`,
                            ),
                            recipeInstructions: recipe.data.instructions.map(
                                (v) => ({
                                    '@type': 'HowToStep',
                                    text: v,
                                }),
                            ),
                        } satisfies Schema.Recipe),
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
                        <Ingredients
                            ingredients={recipe.data.ingredients}
                            className="mt-5 md:hidden"
                        />
                    )}
                    {recipe.data.instructions && (
                        <Instructions
                            instructions={recipe.data.instructions}
                            className="mt-5"
                        />
                    )}
                    {recipe.data.tips && (
                        <TipsAndTricks
                            tips={recipe.data.tips}
                            className="mt-5"
                        />
                    )}
                    {recipe.data.recommended && (
                        <Recommended
                            recommended={recipe.data.recommended}
                            className="mt-5"
                        />
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

function TipsAndTricks({
    tips,
    className,
}: {
    tips: string[]
    className?: string
}): JSX.Element {
    return (
        <section className={`prose ${className ?? ''}`}>
            <h3>Tips & Tricks</h3>
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
    className,
}: {
    instructions: string[]
    className?: string
}): JSX.Element {
    return (
        <section className={`prose ${className ?? ''}`}>
            <h3>Instructions</h3>
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
    className,
}: {
    recommended: {
        name: string
        url: string
        description: string
    }[]
    className?: string
}): JSX.Element {
    return (
        <section className={`prose ${className ?? ''}`}>
            <h3>Recommended</h3>
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
