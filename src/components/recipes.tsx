import { Recipe } from '@/controllers/recipes'
import Image from 'next/image'
import Link from 'next/link'

export function Recipes({ recipes }: { recipes: Recipe[] }): JSX.Element {
    return (
        <>
            {!recipes?.length && (
                <div className="alert alert-info">
                    {'No recipes were found'}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recipes.map((recipe) => {
                    const ratio = recipe.image.height / recipe.image.width

                    return (
                        <Link
                            key={recipe.slug}
                            href={`/recipes/${recipe.slug}`}
                            className="bg-base-200 rounded-md"
                        >
                            <Image
                                src={recipe.image.src}
                                width={400}
                                height={200}
                                alt={recipe.data.name}
                                placeholder="blur"
                                className="object-cover h-48 w-96 dark:opacity-50"
                            />
                            <div className="p-2 pt-1">
                                <h3 className="text-lg">{recipe.data.name}</h3>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
