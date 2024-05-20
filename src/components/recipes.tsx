'use client'
import { Recipe } from '@/controllers/recipes'
import Image from 'next-export-optimize-images/image'
import Link from 'next/link'
import { Alert } from 'react-daisyui'
import { FaCircleInfo } from 'react-icons/fa6'

export function Recipes({ recipes }: { recipes: Recipe[] }): JSX.Element {
    return (
        <>
            {!recipes?.length && (
                <Alert status="info" icon={<FaCircleInfo />}>
                    {'No recipes were found'}
                </Alert>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recipes.map((recipe) => {
                    return (
                        <Link
                            key={recipe.slug}
                            href={`/recipes/${recipe.slug}`}
                            className="card bg-base-100 shadow-xl"
                        >
                            <figure>
                                <Image
                                    src={recipe.image.src}
                                    width={400}
                                    height={200}
                                    alt={recipe.data.name}
                                    placeholder="blur"
                                    className="object-cover h-[16rem] w-[32rem] dark:opacity-60"
                                />
                            </figure>
                            <div className="card-body items-center text-center p-4 bg-base-200">
                                <h2 className="card-title">
                                    {recipe.data.name}
                                </h2>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
