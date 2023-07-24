import type { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import Image from 'next-image-export-optimizer'
import { DiscussionEmbed } from 'disqus-react'
import type { Recipe as RecipeSchema } from 'schema-dts'
import { titleCase } from 'common-stuff'

import { Layout } from '../../components/layout'
import {
    formatQuantity,
    getAllRecipeSlugs,
    getRecipeBySlug,
    Recipe,
} from '../../controllers/recipes'
import { useEffect, useState } from 'react'

export interface Props {
    recipe: Recipe
}

export interface Params extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
    return {
        props: {
            recipe: getRecipeBySlug(context.params?.slug!)!,
        },
    }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
    return {
        paths: getAllRecipeSlugs().map((v) => ({
            params: {
                slug: v,
            },
        })),
        fallback: false,
    }
}

const Page: NextPage<Props> = ({ recipe }) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(typeof window !== 'undefined')
    }, [])

    const Ingredients = ({ name }: { name: string }) => (
        <div className="ingredients mt-4">
            <h4>Ingredients</h4>
            {Object.entries(recipe.data.ingredients).map(
                ([ingredient, quantity]) => (
                    <div
                        className="custom-control custom-checkbox"
                        key={ingredient}
                    >
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`ingredient-${name}-${ingredient}`}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor={`ingredient-${name}-${ingredient}`}
                        >
                            {formatQuantity(quantity)} {titleCase(ingredient)}
                        </label>
                    </div>
                ),
            )}
        </div>
    )

    return (
        <Layout<RecipeSchema>
            title={recipe.data.name}
            description={recipe.data.description}
            image={recipe.image.src}
            schema={{
                '@context': 'https://schema.org',
                '@type': 'Recipe',
                headline: '',
                name: recipe.data.name,
                image: [recipe.image.src],
                description: recipe.data.description,
                recipeCategory: ['Drink', 'Cocktail'],
                recipeIngredient: Object.entries(recipe.data.ingredients).map(
                    ([ingredient, quantity]) =>
                        `${formatQuantity(quantity)} ${titleCase(ingredient)}`,
                ),
                recipeInstructions: recipe.data.instructions.map((v) => ({
                    '@type': 'HowToStep',
                    text: v,
                })),
            }}
        >
            <>
                <div className="receipe-content-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="receipe-headline my-4">
                                    <h2>{recipe.data.name}</h2>

                                    <div
                                        className="d-lg-none mb-3"
                                        style={{
                                            position: 'relative',
                                            height: '200px',
                                        }}
                                    >
                                        <Image
                                            src={recipe.image}
                                            alt=""
                                            fill={true}
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>

                                    {recipe.data.description && (
                                        <p>{recipe.data.description}</p>
                                    )}
                                </div>

                                {recipe.data.instructions.map((v, i) => (
                                    <div
                                        className="single-preparation-step d-flex mb-1"
                                        key={i}
                                    >
                                        <h4>{i + 1}.</h4>
                                        <p>{v}</p>
                                    </div>
                                ))}

                                {!!recipe.data.tips?.length && (
                                    <div className="mt-4">
                                        <h4>Tips & Tricks</h4>
                                        {recipe.data.tips.map((v, i) => (
                                            <p key={i}>{v}</p>
                                        ))}
                                    </div>
                                )}

                                <div className="d-lg-none">
                                    {<Ingredients name="mobile" />}
                                </div>

                                <div className="mt-4">
                                    {process.env.DISQUS_NAME && isClient && (
                                        <DiscussionEmbed
                                            shortname={process.env.DISQUS_NAME}
                                            config={{
                                                url: location.href,
                                                identifier: recipe.data.name,
                                                title: recipe.data.name,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div
                                    style={{
                                        position: 'relative',
                                        height: '250px',
                                    }}
                                    className="mb-3 mt-3 d-none d-lg-block"
                                >
                                    <Image
                                        src={recipe.image}
                                        alt=""
                                        fill={true}
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="d-none d-lg-block">
                                    {<Ingredients name="desktop" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default Page
