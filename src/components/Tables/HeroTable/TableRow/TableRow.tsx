import React from "react";
import { TableRow, ListItemButton } from "@mui/material";
import { THero } from "@utils/types/types";
import { validateField, getMappedColor } from "@utils/functions/validation/heroes.table";
import { ButtonCell, ColorMarker, HeroCell } from "../StyledHeroTable";

export function TableRowComponent({
    hero,
    handleListItemClick,
    isMobile
}: {
    hero: THero;
    handleListItemClick: (hero: THero) => void;
    isMobile: boolean;
}) {
    const renderColorMarkers = (colors: string, isEyeColor = false) => {
        return colors
            .split(",")
            .map((color, index) => (
                <ColorMarker key={index} color={getMappedColor(color, isEyeColor)} border="1px solid black" />
            ));
    };

    return (
        <TableRow>
            <ButtonCell>
                <ListItemButton onClick={() => handleListItemClick(hero)}>{validateField(hero.name)}</ListItemButton>
            </ButtonCell>
            {!isMobile && (
                <>
                    <HeroCell>{validateField(hero.height)}</HeroCell>
                    <HeroCell>{validateField(hero.mass)}</HeroCell>
                </>
            )}
            <HeroCell>
                {validateField(hero.hair_color)}
                {hero.hair_color.toLowerCase() !== "none" &&
                    hero.hair_color.toLowerCase() !== "n/a" &&
                    renderColorMarkers(hero.hair_color)}
            </HeroCell>
            <HeroCell>
                {validateField(hero.eye_color)}
                {hero.eye_color.toLowerCase() !== "unknown" && renderColorMarkers(hero.eye_color, true)}
            </HeroCell>
        </TableRow>
    );
}
