import React from "react";
import { Box, styled, keyframes } from "@mui/material";

const moveDiagonal = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 100% 100%;
    }
`;

const StarrySkyContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: -1,
    backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#FFFFFF"
}));

const BackgroundStars = styled("div")(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("https://script-tutorials.com/demos/360/images/stars.png")`,
    backgroundSize: "cover",
    "data-testid": "background-stars"
}));

const TwinklingOverlay = styled("div")(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "300%",
    height: "300%",
    backgroundImage: `url("https://script-tutorials.com/demos/360/images/twinkling.png")`,
    backgroundRepeat: "repeat",
    animation: `${moveDiagonal} 300s linear infinite`,
    "data-testid": "twinkling-overlay"
}));

export const StarrySky: React.FC = () => {
    return (
        <StarrySkyContainer>
            <BackgroundStars />
            <TwinklingOverlay />
        </StarrySkyContainer>
    );
};
