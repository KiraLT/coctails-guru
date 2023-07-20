import type { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import Image from 'next-image-export-optimizer'
import { DiscussionEmbed } from 'disqus-react'

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

    return (
        <Layout
            title={recipe.data.name}
            description={recipe.data.description}
            image={recipe.image.src}
        >
            <>
                <div className="receipe-content-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="receipe-headline my-5">
                                    <h2>{recipe.data.name}</h2>
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

                                <div className="mt-5">
                                    {isClient && (
                                        <DiscussionEmbed
                                            shortname="cocktailsguru"
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
                                    className="mb-3 mt-3"
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
                                <div className="ingredients">
                                    <h4>Ingredients</h4>
                                    {Object.entries(
                                        recipe.data.ingredients,
                                    ).map(([ingredient, quantity]) => (
                                        <div
                                            className="custom-control custom-checkbox"
                                            key={ingredient}
                                        >
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={`ingredient-${ingredient}`}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={`ingredient-${ingredient}`}
                                            >
                                                {ingredient}{' '}
                                                {formatQuantity(quantity)}
                                            </label>
                                        </div>
                                    ))}
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
