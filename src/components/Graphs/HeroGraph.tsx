import { THero, TFilm, TStarship } from "@utils/types/types";
import React, { useEffect, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, Edge, Node } from "reactflow";
import { HeroNode } from "./Nodes/HeroNode";
import { FilmNode } from "./Nodes/FilmNode";
import { StarshipNode } from "./Nodes/StarshipNode";
import { Box, useTheme, CircularProgress, Button, Typography, Container } from "@mui/material";
import { useFetchFilmsQuery, useFetchStarshipsQuery } from "@store/api/api.slice";

import "reactflow/dist/style.css";

interface HeroGraphProps {
    hero: THero;
}

export const HeroGraph: React.FC<HeroGraphProps> = ({ hero }) => {
    const theme = useTheme();

    // State for films and starships data
    const [films, setFilms] = useState<TFilm[]>([]);
    const [starships, setStarships] = useState<TStarship[]>([]);

    // Fetch films using `useFetchFilmsQuery`
    const { data: filmsResponse, isLoading: filmsLoading, error: filmsError } = useFetchFilmsQuery(hero.films);

    // Fetch starships using `useFetchStarshipsQuery` with skip option
    const {
        data: starshipsResponse,
        isLoading: starshipsLoading,
        error: starshipsError
    } = useFetchStarshipsQuery(hero.starships, {
        skip: hero.starships.length === 0
    });

    // Set films and starships data once it's loaded
    useEffect(() => {
        if (filmsResponse) setFilms(filmsResponse.results);
        if (starshipsResponse) setStarships(starshipsResponse.results);
    }, [filmsResponse, starshipsResponse]);

    // Handle loading and error states
    if (filmsLoading || starshipsLoading)
        return (
            <Container>
                <CircularProgress />
            </Container>
        );

    if (filmsError || starshipsError) {
        return (
            <Box textAlign="center">
                <Typography variant="h6" color="error">
                    Error loading data
                </Typography>
                <Button variant="contained" color="primary" href="/">
                    Return Home
                </Button>
            </Box>
        );
    }

    if (films.length === 0) {
        return (
            <Box textAlign="center">
                <Typography variant="h6">No films available for this hero.</Typography>
            </Box>
        );
    }

    // Graph nodes
    const nodes: Node[] = [
        {
            id: `hero-${hero.id}`,
            data: { label: <HeroNode hero={hero} /> },
            position: { x: 20, y: 50 },
            style: { width: "auto", background: "none" }
        },
        // Film nodes
        ...films.map((film, index) => ({
            id: `film-${film.id}`,
            data: { label: <FilmNode film={film} /> },
            position: { x: 70 + index * 270, y: 300 },
            style: { width: "auto", background: theme.palette.background.paper }
        })),
        // Starship nodes
        ...starships.map((starship, index) => ({
            id: `starship-${starship.id}`,
            data: { label: <StarshipNode starship={starship} /> },
            position: { x: 120 + index * 370, y: 500 },
            style: { width: "auto", background: theme.palette.background.default }
        }))
    ];

    // Graph edges
    const edges: Edge[] = [
        // Connections between hero and films
        ...hero.films.map((filmId) => ({
            id: `edge-hero-film-${filmId}`,
            source: `hero-${hero.id}`,
            target: `film-${filmId}`
        })),
        // Connections between films and starships
        ...films.flatMap((film) =>
            film.starships.map((starshipId) => ({
                id: `edge-film-${film.id}-starship-${starshipId}`,
                source: `film-${film.id}`,
                target: `starship-${starshipId}`
            }))
        )
    ];

    return (
        <Box style={{ height: "80vh" }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <MiniMap style={{ background: theme.palette.background.paper }} />
                <Controls style={{ fill: theme.palette.primary.main, left: "0", bottom: 5 }} />
                <Background gap={32} size={3} />
            </ReactFlow>
        </Box>
    );
};
