import React from "react";
import { Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const links = [
    {
        href: "https://github.com/AndrewShmorhunGit/starnavi/actions",
        Icon: GitHubIcon
    },
    {
        href: "https://www.shmorhun.com",
        Icon: LanguageIcon
    },
    {
        href: "https://www.linkedin.com/in/andrew-shmorhun-850a76209/",
        Icon: LinkedInIcon
    }
];

export const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                marginTop: 2
            }}
        >
            {links.map((link, index) => (
                <IconButton key={index} component="a" href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.Icon />
                </IconButton>
            ))}
        </Box>
    );
};
