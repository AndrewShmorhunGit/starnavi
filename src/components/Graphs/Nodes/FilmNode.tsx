import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Body1Typography, Subtitle1Typography } from "@components/Typography/Typography";
import { TFilm } from "@utils/types/types";

interface FilmNodeProps {
    film: TFilm;
}

export function FilmNode({ film }: FilmNodeProps) {
    return (
        <Box
            sx={(theme) => ({
                width: "240px",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                padding: 1,
                margin: 0,
                backgroundColor: theme.palette.background.paper,
                display: "flex",
                flexDirection: "column",
                gap: 0.5
            })}
            data-testid="film-node"
        >
            <Body1Typography data-testid="film-title">{film.title}</Body1Typography>
            <Subtitle1Typography align="left" data-testid="film-episode">
                <strong>Episode:</strong> {film.episode_id}
            </Subtitle1Typography>
            <Subtitle1Typography align="left" data-testid="film-director">
                <strong>Director:</strong> {film.director}
            </Subtitle1Typography>
            <Subtitle1Typography align="left" data-testid="film-release-date">
                <strong>Release Date:</strong> {film.release_date}
            </Subtitle1Typography>
        </Box>
    );
}
