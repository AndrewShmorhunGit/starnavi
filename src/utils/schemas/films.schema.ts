import { z } from "zod";

export const FilmSchema = z.object({
    id: z.number(),
    title: z.string(),
    episode_id: z.number(),
    opening_crawl: z.string(),
    director: z.string(),
    producer: z.string(),
    release_date: z.string(),
    characters: z.array(z.number()),
    planets: z.array(z.number()),
    starships: z.array(z.number()),
    vehicles: z.array(z.number()),
    species: z.array(z.number()),
    created: z.string(),
    edited: z.string(),
    url: z.string().url()
});

export const ApiResponseFilmsSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(FilmSchema)
});
