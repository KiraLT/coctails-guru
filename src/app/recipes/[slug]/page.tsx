import Image from 'next-image-export-optimizer'
import { titleCase } from 'common-stuff'
import { useMemo } from 'react'
import {
    Recipe,
    formatQuantity,
    getAllRecipeSlugs,
    getRecipeBySlug,
} from '@/controllers/recipes'
import { Metadata } from 'next/types'
import { RecipeJsonLd } from 'next-seo'
import { Comments } from '@/components/comments'

export interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams(): Promise<Props['params'][]> {
    return getAllRecipeSlugs().map((slug) => ({ slug }))
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
            <RecipeJsonLd
                useAppDir={true}
                name={recipe.data.name}
                description={recipe.data.description || ''}
                authorName="Cocktails Guru"
                ingredients={Object.entries(recipe.data.ingredients).map(
                    ([ingredient, quantity]) =>
                        `${formatQuantity(quantity)} ${titleCase(ingredient)}`,
                )}
                instructions={recipe.data.instructions.map((v) => ({
                    text: v,
                }))}
            />
            <h1 className="text-4xl mb-4">{recipe.data.name}</h1>
            <div className="md:hidden mb-4">
                <Image
                    src={recipe.image}
                    alt={recipe.data.name}
                    className="object-cover h-48 w-full dark:mix-blend-screen"
                />
            </div>
            <div className="md:flex">
                <div className="md:w-2/3 md:mr-5">
                    <section className="prose">
                        {recipe.data.description && (
                            <p>{recipe.data.description}</p>
                        )}
                    </section>
                    <Ingredients
                        ingredients={recipe.data.ingredients}
                        className="md:hidden"
                    />
                    <Instructions instructions={recipe.data.instructions} />
                    <TipsAndTricks tips={recipe.data.tips} />
                    <Comments name={recipe.data.name} />
                </div>
                <div className="md:w-1/3 hidden md:block">
                    <Image
                        src={recipe.image}
                        alt={recipe.data.name}
                        className="object-cover h-48 w-96 dark:mix-blend-screen"
                    />
                    <Ingredients ingredients={recipe.data.ingredients} />
                </div>
            </div>
        </article>
    )
}

function Ingredients({
    ingredients,
    className,
}: {
    ingredients: Recipe['data']['ingredients']
    className?: string
}): JSX.Element {
    return (
        <section className={className}>
            <h2 className="mt-5 mb-3 text-xl">Ingredients</h2>
            <ul className="list-none prose">
                {Object.entries(ingredients).map(([ingredient, quantity]) => (
                    <li key={ingredient}>
                        <label className="flex items-center">
                            <input type="checkbox" className="checkbox mr-2" />
                            {formatQuantity(quantity)} {titleCase(ingredient)}
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
        <section>
            <h2 className="mt-5 mb-3 text-xl">Tips & Tricks</h2>
            <div className="prose">
                <ul>
                    {tips.map((v, i) => (
                        <li key={i}>{v}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

function Instructions({
    instructions,
}: {
    instructions: Recipe['data']['instructions']
}): JSX.Element {
    return (
        <section>
            <h2 className="mt-5 mb-3 text-xl md:hidden">Instructions</h2>
            <div className="prose">
                <ol>
                    {instructions.map((v, i) => (
                        <li key={i}>{v}</li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
