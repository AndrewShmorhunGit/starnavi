import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { filmSchema } from "@utils/schemas/films.schema";
import { peopleResSchema } from "@utils/schemas/heros.schema";
import { starshipSchema } from "@utils/schemas/starship.schema";
import { TFilm, THeroesResType, TStarship } from "@utils/types/types";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://sw-api.starnavi.io" }),
    endpoints: (builder) => ({
        fetchHeroes: builder.query<THeroesResType, number>({
            query: (page) => `/people/?page=${page}`,
            transformResponse: (response: THeroesResType) => {
                const parsedData = peopleResSchema.safeParse(response);
                if (!parsedData.success) {
                    throw new Error("Invalid response data: " + JSON.stringify(parsedData.error.errors));
                }
                return parsedData.data;
            }
        }),

        fetchFilm: builder.query<TFilm, number>({
            query: (filmId) => `/films/${filmId}/`,
            transformResponse: (response: TFilm) => {
                const parsedData = filmSchema.safeParse(response);
                if (!parsedData.success) {
                    throw new Error("Invalid response data: " + JSON.stringify(parsedData.error.errors));
                }
                return parsedData.data;
            }
        }),

        fetchStarship: builder.query<TStarship, number>({
            query: (starshipId) => `/starships/${starshipId}/`,
            transformResponse: (response: TStarship) => {
                const parsedData = starshipSchema.safeParse(response);
                if (!parsedData.success) {
                    throw new Error("Invalid response data: " + JSON.stringify(parsedData.error.errors));
                }
                return parsedData.data;
            }
        })
    })
});

export const { useFetchHeroesQuery, useFetchFilmQuery, useFetchStarshipQuery } = apiSlice;
