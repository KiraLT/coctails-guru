import Image from 'next/image'
import { titleCase } from 'common-stuff'
import { useMemo } from 'react'
import {
    Recipe,
    formatQuantity,
    getAllRecipes,
    getRecipeBySlug,
} from '@/controllers/recipes'
import { Metadata } from 'next/types'
import { Comments } from '@/components/comments'
import type { Recipe as RecipeLd } from 'schema-dts'

export interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams(): Promise<Props['params'][]> {
    return getAllRecipes().map((recipe) => ({ slug: recipe.slug }))
}

export async function generateMetadata({
    params: { slug },
}: Props): Promise<Metadata> {
    const recipe = getRecipeBySlug(slug)!

    return {
        title: recipe.data.name,
        description: recipe.data.description,
        openGraph: {
            images: [
                {
                    url: recipe.image.src,
                    width: recipe.image.width,
                    height: recipe.image.height,
                    alt: recipe.data.name,
                },
            ],
        },
    }
}

export default function Page({ params: { slug } }: Props): JSX.Element {
    const recipe = useMemo(() => getRecipeBySlug(slug)!, [slug])

    return (
        <article>
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
                                `${formatQuantity(ingredient, quantity)} ${titleCase(
                                    ingredient,
                                )}`,
                        ),
                        recipeInstructions: recipe.data.instructions.map(
                            (v) => ({
                                '@type': 'HowToStep',
                                text: v,
                            }),
                        ),
                    } satisfies RecipeLd),
                }}
            />
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
                    <div className="md:hidden prose">
                        <h2 className="mt-5">Ingredients</h2>
                        <Ingredients ingredients={recipe.data.ingredients} />
                    </div>
                    <Instructions instructions={recipe.data.instructions} />
                    <TipsAndTricks tips={recipe.data.tips} />
                    <Comments name={recipe.data.name} className="mt-5" />
                </div>
                <div className="md:w-1/3 hidden md:block card">
                    <figure>
                        <Image
                            src={recipe.image.src}
                            width={400}
                            height={200}
                            alt={recipe.data.name}
                            className="object-cover h-[16rem] w-[32rem] dark:opacity-60"
                            placeholder="blur"
                        />
                    </figure>
                    <div className="card-body px-2">
                        <Ingredients ingredients={recipe.data.ingredients} />
                    </div>
                </div>
            </div>
        </article>
    )
}

function Ingredients({
    ingredients,
}: {
    ingredients: Recipe['data']['ingredients']
    className?: string
}): JSX.Element {
    return (
        <section className="prose">
            <ul className="list-none p-0">
                {Object.entries(ingredients).map(([ingredient, quantity]) => (
                    <li key={ingredient}>
                        <label className="flex items-center">
                            <input type="checkbox" className="checkbox mr-2" />
                            {formatQuantity(ingredient, quantity)} {titleCase(ingredient)}
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}

function TipsAndTricks({
    tips,
}: {
    tips: Recipe['data']['tips']
}): JSX.Element {
    if (!tips) {
        return <div></div>
    }

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
    instructions: Recipe['data']['instructions']
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
