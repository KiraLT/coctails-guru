import { Recipe } from '@/controllers/recipes'
import Image from 'next-image-export-optimizer'
import Link from 'next/link'

export function Recipes({
    recipes,
}: {
    recipes: Recipe[]
}): JSX.Element {
    return (
        <>
            {!recipes?.length && (
                <div className="alert alert-info">
                    {'No recipes were found'}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <Link
                        key={recipe.slug}
                        href={`/recipes/${recipe.slug}`}
                        className="bg-base-200 rounded-md"
                    >
                        <Image
                            src={recipe.image}
                            alt={recipe.data.name}
                            className="object-cover h-48 w-96 dark:mix-blend-screen"
                        />
                        <div className="p-2 pt-1">
                            <h3 className="text-lg">{recipe.data.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
