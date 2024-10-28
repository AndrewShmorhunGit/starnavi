import React from "react";
import { Box } from "@mui/material";
import { Body1Typography, Subtitle1Typography } from "@components/Typography/Typography";
import { TStarship } from "@utils/types/types";

interface StarshipNodeProps {
    starship: TStarship;
}

export function StarshipNode({ starship }: StarshipNodeProps) {
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
