import { FilmSchema, ApiResponseFilmsSchema } from "@utils/schemas/films.schema";
import { HeroSchema, ApiResponseHeroesSchema as heroesResSchema } from "@utils/schemas/heros.schema";
import { ApiResponseStarshipsSchema, StarshipSchema } from "@utils/schemas/starship.schema";
import { z } from "zod";

// Heroes
export type THero = z.infer<typeof HeroSchema>;
export type ApiResponseHeroesType = z.infer<typeof heroesResSchema>;

// Films
export type TFilm = z.infer<typeof FilmSchema>;
export type ApiResponseFilmsType = z.infer<typeof ApiResponseFilmsSchema>;

// Starship
export type TStarship = z.infer<typeof StarshipSchema>;
export type ApiResponseStarshipsType = z.infer<typeof ApiResponseStarshipsSchema>;
