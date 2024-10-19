import React from "react";
import { THero } from "@utils/types/types";
import { Box, Theme } from "@mui/material";
import { Height, FitnessCenter } from "@mui/icons-material";
import { validateField } from "@utils/functions/validation/heroes.table";
import { LoadableImage } from "@components/Images/LoadableImage";
import { Body2Typography, Subtitle1Typography } from "@components/Typography/Typography";

interface HeroNodeProps {
    hero: THero;
}

export const HeroNode: React.FC<HeroNodeProps> = ({ hero }) => {
    return (
        <Box
            sx={(theme: Theme) => ({
                width: "340px",
                height: "180px",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                padding: 1,
                margin: 0,
                backgroundColor: theme.palette.background.paper,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            })}
        >
            <Box
                sx={{
                    width: "100px",
                    height: "132px",
                    borderRadius: "5%",
                    background: "lightgray",
                    marginRight: 3,
                    overflow: "hidden"
                }}
            >
                <LoadableImage
                    src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
                    alt={hero.name}
                />
            </Box>

            {/* Column for hero's information */}
            <Box display="flex" flexDirection="column" gap={"1rem"}>
                <Body2Typography>{hero.name}</Body2Typography>
                <Box display="flex" alignItems="center">
                    <FitnessCenter sx={{ marginRight: 0.5, height: "20px", color: "primary.main" }} />
                    <Subtitle1Typography>{validateField(hero.mass)}</Subtitle1Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Height sx={{ marginRight: 0.5, color: "primary.main" }} />
                    <Subtitle1Typography>{validateField(hero.height)}</Subtitle1Typography>
                </Box>
            </Box>
        </Box>
    );
};
