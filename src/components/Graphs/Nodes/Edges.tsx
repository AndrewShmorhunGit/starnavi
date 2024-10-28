import { Edge } from "reactflow";
import { THero, TFilm } from "@utils/types/types";

export function createEdges(hero: THero, films: TFilm[]): Edge[] {
    return [
        ...hero.films.map((filmId) => ({
            id: `edge-hero-film-${filmId}`,
            source: `hero-${hero.id}`,
            target: `film-${filmId}`
        })),
        ...films.flatMap((film) =>
            film.starships.map((starshipId) => ({
                id: `edge-film-${film.id}-starship-${starshipId}`,
                source: `film-${film.id}`,
                target: `starship-${starshipId}`
            }))
        )
    ];
}
