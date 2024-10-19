import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Body1Typography, Subtitle1Typography } from "@components/Typography/Typography";
import { useFetchStarshipQuery } from "@api/api.slice";

interface StarshipNodeProps {
    starshipId: number; // Starship ID
}

export function StarshipNode({ starshipId }: StarshipNodeProps) {
    // Fetch starship data based on starshipId
    const { data: starship, error, isLoading } = useFetchStarshipQuery(starshipId);

    if (isLoading) {
        return <CircularProgress size={24} />; // Show loading indicator
    }
    if (!starship) {
        return <Box style={{ color: "red" }}>No data!</Box>; // Handle no data case
    }
    if (error) {
        return <Box style={{ color: "red" }}>Error: Failed to fetch starship data</Box>; // Handle error case
    }

    return (
        <Box
            sx={(theme) => ({
                width: "340px",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                padding: 1,
                margin: 0,
                backgroundColor: theme.palette.background.paper,
                display: "flex",
                flexDirection: "column",
                gap: 0.5
            })}
        >
            <Body1Typography>{starship.name}</Body1Typography>
            <Subtitle1Typography align="left">
                <strong>Model:</strong> {starship.model}
            </Subtitle1Typography>
            <Subtitle1Typography align="left">
                <strong>Manufacturer:</strong> {starship.manufacturer}
            </Subtitle1Typography>
            <Subtitle1Typography align="left">
                <strong>Cost:</strong> {starship.cost_in_credits} credits
            </Subtitle1Typography>
        </Box>
    );
}
