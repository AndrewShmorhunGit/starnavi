import { z } from "zod";

export const starshipSchema = z.object({
    MGLT: z.string(),
    cargo_capacity: z.string(),
    consumables: z.string(),
    cost_in_credits: z.string(),
    created: z.string(),
    crew: z.string(),
    edited: z.string(),
    hyperdrive_rating: z.string(),
    length: z.string(),
    manufacturer: z.string(),
    max_atmosphering_speed: z.string(),
    model: z.string(),
    name: z.string(),
    passengers: z.string(),
    films: z.array(z.number()),
    pilots: z.array(z.number()).default([]),
    starship_class: z.string(),
    url: z.string().url()
});
