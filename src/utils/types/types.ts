import { filmSchema } from "@utils/schemas/films.schema";
import { heroSchema, peopleResSchema as heroesResSchema } from "@utils/schemas/heros.schema";
import { starshipSchema } from "@utils/schemas/starship.schema";
import { z } from "zod";

// Heroes
export type THero = z.infer<typeof heroSchema>;
export type THeroesResType = z.infer<typeof heroesResSchema>;

// Films
export type TFilm = z.infer<typeof filmSchema>;

// Starship
export type TStarship = z.infer<typeof starshipSchema>;
