import * as z from 'zod'

export const recipeSchema = z
    .object({
        slug: z.string(),
        image: z
            .object({
                src: z.string(),
                height: z.number(),
                width: z.number(),
                blurDataURL: z.string().optional(),
                blurWidth: z.number().optional(),
                blurHeight: z.number().optional(),
            })
            .strict(),
        data: z
            .object({
                name: z.string(),
                description: z.string().optional(),
                ingredients: z.record(z.number()),
                instructions: z.array(z.string()),
                tips: z.array(z.string()).optional(),
                labels: z.array(z.enum(['signature'])).optional(),
            })
            .strict(),
    })
    .strict()

export type Recipe = z.infer<typeof recipeSchema>
