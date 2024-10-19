import { z } from "zod";

export const heroSchema = z.object({
    id: z.number(),
    name: z.string(),
    height: z.string(),
    mass: z.string(),
    hair_color: z.string(),
    eye_color: z.string(),
    films: z.array(z.number()),
    starships: z.array(z.number())
});

export const peopleResSchema = z.object({
    count: z.number(),
    next: z.union([z.string(), z.null()]),
    previous: z.union([z.string(), z.null()]).optional(),
    results: z.array(heroSchema)
});
