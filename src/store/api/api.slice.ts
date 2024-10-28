import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseFilmsSchema } from "@utils/schemas/films.schema";
import { ApiResponseHeroesSchema } from "@utils/schemas/heros.schema";
import { ApiResponseStarshipsSchema } from "@utils/schemas/starship.schema";
import { ApiResponseFilmsType, ApiResponseStarshipsType, ApiResponseHeroesType } from "@utils/types/types";

const handleTransformFilmsResponseGET = (response: ApiResponseFilmsType): ApiResponseFilmsType => {
    return ApiResponseFilmsSchema.parse(response, { async: false });
};

const handleTransformStarshipsResponseGET = (response: ApiResponseStarshipsType): ApiResponseStarshipsType => {
    return ApiResponseStarshipsSchema.parse(response, { async: false });
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://sw-api.starnavi.io" }),
    endpoints: (builder) => ({
        fetchHeroes: builder.query<ApiResponseHeroesType, number>({
            query: (page) => `/people/?page=${page}`,
            transformResponse: (response: ApiResponseHeroesType) => {
                const parsedData = ApiResponseHeroesSchema.safeParse(response);
                if (!parsedData.success) {
                    throw new Error("Invalid response data: " + JSON.stringify(parsedData.error.errors));
                }
                return parsedData.data;
            }
        }),

        fetchFilms: builder.query<ApiResponseFilmsType, number[]>({
            query: (filmIds) => `/films/?id__in=${filmIds.join(",")}`,
            transformResponse: handleTransformFilmsResponseGET
        }),

        fetchStarships: builder.query<ApiResponseStarshipsType, number[]>({
            query: (starshipIds) => `/starships/?id__in=${starshipIds.join(",")}`,
            transformResponse: handleTransformStarshipsResponseGET
        })
    })
});

export const { useFetchHeroesQuery, useFetchFilmsQuery, useFetchStarshipsQuery } = apiSlice;
