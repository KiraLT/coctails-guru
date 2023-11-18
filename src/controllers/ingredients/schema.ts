import * as z from 'zod'

export const ingredientSchema = z.object({
    slug: z.string(),
    image: z.object({
        src: z.string(),
        height: z.number(),
        width: z.number(),
        blurDataURL: z.string().optional(),
        blurWidth: z.number().optional(),
        blurHeight: z.number().optional(),
    }).strict(),
    data: z.object({
        name: z.string(),
        unit: z.string().optional(),
        description: z.string().optional(),
        ingredients: z.record(z.number()).optional(),
        instructions: z.array(z.string()).optional(),
        tips: z.array(z.string()).optional(),
    }).strict()
}).strict()

export type Ingredient = z.infer<typeof ingredientSchema>