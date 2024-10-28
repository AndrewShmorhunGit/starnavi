import { useState, useEffect, useMemo, useCallback } from "react";
import { THero, TFilm, TStarship } from "@utils/types/types";
import { useFetchFilmsQuery, useFetchStarshipsQuery } from "@store/api/api.slice";

export function useHeroGraphData(hero: THero) {
    const [films, setFilms] = useState<TFilm[]>([]);
    const [starships, setStarships] = useState<TStarship[]>([]);

    const memoizedHeroFilms = useMemo(() => hero.films, [hero.films]);
    const memoizedHeroStarships = useMemo(() => hero.starships, [hero.starships]);

    const { data: filmsResponse, isLoading: filmsLoading, error: filmsError } = useFetchFilmsQuery(memoizedHeroFilms);
    const {
        data: starshipsResponse,
        isLoading: starshipsLoading,
        error: starshipsError
    } = useFetchStarshipsQuery(memoizedHeroStarships, {
        skip: memoizedHeroStarships.length === 0
    });

    useEffect(() => {
        if (filmsResponse) setFilms(filmsResponse.results);
    }, [filmsResponse]);

    useEffect(() => {
        if (starshipsResponse) setStarships(starshipsResponse.results);
    }, [starshipsResponse]);

    const isLoading = useMemo(() => filmsLoading || starshipsLoading, [filmsLoading, starshipsLoading]);
    const error = useMemo(() => filmsError || starshipsError, [filmsError, starshipsError]);

    const memoizedFilms = useMemo(() => films, [films]);
    const memoizedStarships = useMemo(() => starships, [starships]);

    return {
        films: memoizedFilms,
        starships: memoizedStarships,
        isLoading,
        error
    };
}
