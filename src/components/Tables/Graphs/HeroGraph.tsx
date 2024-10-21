import { THero } from "@utils/types/types";
import React, { useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background, Edge, Node } from "reactflow";
import { HeroNode } from "./Nodes/HeroNode";
import { FilmNode } from "./Nodes/FilmNode";
import { StarshipNode } from "./Nodes/StarshipNode";
import { useFetchFilmQuery } from "@api/api.slice";

import "reactflow/dist/style.css";
import { Box, useTheme } from "@mui/material";

interface HeroGraphProps {
    hero: THero; // Hero type containing the hero's data
}

export const HeroGraph: React.FC<HeroGraphProps> = ({ hero }) => {
    const theme = useTheme();

    useEffect(() => {
        const attributionElement = document.querySelector(".react-flow__attribution");
        if (attributionElement) {
            attributionElement.setAttribute("style", "display: none");
        }
    }, []);

    const nodes: Node[] = [
        // Main node for the hero
        {
            id: hero.id.toString(),
            data: { label: <HeroNode hero={hero} /> }, // Label using HeroNode component
            position: { x: 150, y: 5 },
            style: { width: "auto", background: "none" }
        },
        // Create film nodes for each film the hero participated in
        ...hero.films.map((film, index) => ({
            id: `film-${film}`,
            data: { label: <FilmNode filmId={film} /> }, // Label using FilmNode component
            position: { x: 150 + index * 300, y: 300 },
            style: { width: "auto", background: "none" }
        }))
    ];

    const edges: Edge[] = [
        // Create edges from the hero to each film node
        ...hero.films.map((film) => ({
            id: `e-${hero.id}-${film}`,
            source: hero.id.toString(),
            target: `film-${film}`
        }))
    ];

    // Iterate over films to add starship nodes
    hero.films.forEach((film) => {
        const filmId = film;
        const filmNodeId = `film-${film}`;

        // Fetch film data to access its starships
        const { data: filmData } = useFetchFilmQuery(filmId);
        if (filmData) {
            // Find starships that belong to both the hero and the film
            const commonStarships = filmData.starships.filter((starshipId) => hero.starships.includes(starshipId));

            // Create a starship node for each common starship
            commonStarships.forEach((starshipId, index) => {
                const starshipNodeId = `starship-${starshipId}`;
                nodes.push({
                    id: starshipNodeId,
                    data: { label: <StarshipNode starshipId={starshipId} /> }, // Label using StarshipNode component
                    position: { x: 250 + index * 400, y: 600 },
                    style: { width: "auto", background: "none" }
                });

                // Create edges from the film to the starship nodes
                edges.push({
                    id: `e-${filmNodeId}-${starshipNodeId}`,
                    source: filmNodeId,
                    target: starshipNodeId
                });
            });
        }
    });

    return (
        <Box style={{ height: "80vh" }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <MiniMap style={{ background: theme.palette.background.paper }} />
                <Controls style={{ fill: theme.palette.primary.main, left: "0", bottom: 5 }} />
                <Background
                    gap={32}
                    size={3}
                    // color={theme.palette.divider}
                />
            </ReactFlow>
        </Box>
    );
};
