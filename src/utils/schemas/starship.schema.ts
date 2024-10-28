import { z } from "zod";

export const StarshipSchema = z.object({
    id: z.number(),
    name: z.string(),
    model: z.string(),
    manufacturer: z.string(),
    cost_in_credits: z.string(),
    length: z.string(),
    max_atmosphering_speed: z.string(),
    crew: z.string(),
    passengers: z.string(),
    cargo_capacity: z.string(),
    consumables: z.string(),
    hyperdrive_rating: z.string(),
    MGLT: z.string(),
    starship_class: z.string(),
    pilots: z.array(z.number()).default([]),
    films: z.array(z.number()),
    created: z.string().datetime(),
    edited: z.string().datetime(),
    url: z.string().url()
});

export const ApiResponseStarshipsSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(StarshipSchema)
});
