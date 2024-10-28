import { Node } from "reactflow";
import { THero, TFilm, TStarship } from "@utils/types/types";
import { Theme } from "@mui/material";
import { FilmNode } from "./FilmNode";
import { HeroNode } from "./HeroNode";
import { StarshipNode } from "./StarshipNode";

export function createNodes(hero: THero, films: TFilm[], starships: TStarship[], theme: Theme): Node[] {
    return [
        {
            id: `hero-${hero.id}`,
            data: { label: <HeroNode hero={hero} /> },
            position: { x: 20, y: 50 },
            style: { width: "auto", background: "none" }
        },
        ...films.map((film, index) => ({
            id: `film-${film.id}`,
            data: { label: <FilmNode film={film} /> },
            position: { x: 70 + index * 270, y: 300 },
            style: { width: "auto", background: theme.palette.background.paper }
        })),
        ...starships.map((starship, index) => ({
            id: `starship-${starship.id}`,
            data: { label: <StarshipNode starship={starship} /> },
            position: { x: 120 + index * 370, y: 500 },
            style: { width: "auto", background: theme.palette.background.default }
        }))
    ];
}
