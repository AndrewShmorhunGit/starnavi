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
        return <CircularProgress data-testid="loading-spinner" size={24} />; // Show loading indicator
    }
    if (!starship) {
        return (
            <Box data-testid="no-data" style={{ color: "red" }}>
                No data!
            </Box>
        ); // Handle no data case
    }
    if (error) {
        return (
            <Box data-testid="error-message" style={{ color: "red" }}>
                Error: Failed to fetch starship data
            </Box>
        ); // Handle error case
    }

    return (
        <Box
            data-testid="starship-node"
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
            <Body1Typography data-testid="starship-name">{starship.name}</Body1Typography>
            <Subtitle1Typography align="left" data-testid="starship-model">
                <strong>Model:</strong> {starship.model}
            </Subtitle1Typography>
            <Subtitle1Typography align="left" data-testid="starship-manufacturer">
                <strong>Manufacturer:</strong> {starship.manufacturer}
            </Subtitle1Typography>
            <Subtitle1Typography align="left" data-testid="starship-cost">
                <strong>Cost:</strong> {starship.cost_in_credits} credits
            </Subtitle1Typography>
        </Box>
    );
}
