import { z } from "zod";

export const filmSchema = z.object({
    characters: z.array(z.number()),
    created: z.string(),
    director: z.string(),
    edited: z.string(),
    episode_id: z.number(),
    opening_crawl: z.string(),
    planets: z.array(z.number()),
    producer: z.string(),
    release_date: z.string(),
    species: z.array(z.number()),
    starships: z.array(z.number()),
    title: z.string(),
    url: z.string(),
    vehicles: z.array(z.number())
});
