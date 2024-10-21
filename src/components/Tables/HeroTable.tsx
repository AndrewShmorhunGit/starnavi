import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    ListItemButton,
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { THero } from "@utils/types/types";
import { FullScreenLoader } from "@components/Loaders/FullScreenLoader";
import { getMappedColor, validateField } from "@utils/functions/validation/heroes.table";
import { HeroGraph } from "@components/Tables/Graphs/HeroGraph";
import { ButtonCell, ColorMarker, HeaderCell, HeroCell, TablePaper } from "./StyledHeroTable";
import { TABLE_HEADERS } from "@utils/constants/hero.table.constants";
import { useFetchHeroesQuery } from "@api/api.slice";

// Responsive table component for displaying heroes
export const HeroTable: React.FC = () => {
    const [page, setPage] = useState(0); // State for pagination
    const [selectedHero, setSelectedHero] = useState<THero | null>(null); // State for selected hero details
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768); // State to track mobile view
    const rowsPerPage = 10; // Number of rows per page
    const { data, isLoading, isError } = useFetchHeroesQuery(page + 1); // Fetch heroes data from API

    // Effect to handle window resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Update mobile state based on window width
        };

        window.addEventListener("resize", handleResize); // Add resize event listener
        return () => window.removeEventListener("resize", handleResize); // Clean up on unmount
    }, []);

    // Function to handle page change
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Function to handle hero selection
    const handleListItemClick = (hero: THero) => {
        setSelectedHero(hero); // Set the selected hero to open the dialog
    };

    // Function to close the dialog
    const handleCloseDialog = () => {
        setSelectedHero(null); // Close the dialog
    };

    // Loading and error handling
    if (isLoading) return <FullScreenLoader />;
    if (isError) return <div>Error loading heroes!</div>;
    if (!data) return <div>No data!</div>;

    return (
        <TablePaper>
            <TableContainer>
                <Table>
                    {renderTableHeader(TABLE_HEADERS(isMobile))} {/* Render table header */}
                    <TableBody>
                        {data.results.map((hero: THero) => renderTableRow(hero, handleListItemClick, isMobile))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.count} // Total number of heroes
                page={page} // Current page number
                onPageChange={handleChangePage} // Function to handle page change
                rowsPerPage={rowsPerPage} // Rows per page
                rowsPerPageOptions={[]} // No options for rows per page
            />

            {/* Dialog to show hero details */}
            {selectedHero && (
                <Dialog open={Boolean(selectedHero)} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
                    <DialogTitle>{selectedHero.name}</DialogTitle>
                    <DialogContent>
                        <HeroGraph hero={selectedHero} /> {/* Render hero graph */}
                    </DialogContent>
                </Dialog>
            )}
        </TablePaper>
    );
};

// Function to render a single table row
const renderTableRow = (hero: THero, handleListItemClick: (hero: THero) => void, isMobile: boolean) => (
    <TableRow key={hero.id}>
        <ButtonCell>
            <ListItemButton onClick={() => handleListItemClick(hero)}>
                {validateField(hero.name)} {/* Display hero's name */}
            </ListItemButton>
        </ButtonCell>
        {/* Render height and mass cells only if not in mobile view */}
        {!isMobile && (
            <>
                <HeroCell>{validateField(hero.height)}</HeroCell> {/* Display hero's height */}
                <HeroCell>{validateField(hero.mass)}</HeroCell> {/* Display hero's mass */}
            </>
        )}
        <HeroCell>
            {validateField(hero.hair_color)} {/* Display hero's hair color */}
            {hero.hair_color.toLowerCase() !== "none" &&
                hero.hair_color.toLowerCase() !== "n/a" &&
                renderColorMarkers(hero.hair_color)}{" "}
            {/* Render color markers for hair color */}
        </HeroCell>
        <HeroCell>
            {validateField(hero.eye_color)} {/* Display hero's eye color */}
            {hero.eye_color.toLowerCase() !== "unknown" && renderColorMarkers(hero.eye_color, true)}{" "}
            {/* Render color markers for eye color */}
        </HeroCell>
    </TableRow>
);

// Function to render color markers for hair or eye color
const renderColorMarkers = (colors: string, isEyeColor = false) => {
    return colors
        .split(",")
        .map((color, index) => (
            <ColorMarker key={index} color={getMappedColor(color, isEyeColor)} border={`1px solid black`} />
        ));
};

// Function to render the table header
const renderTableHeader = (headers: string[]) => (
    <TableHead>
        <TableRow>
            {headers.map((header, index) => (
                <HeaderCell key={index}>{header}</HeaderCell> // Render each header cell
            ))}
        </TableRow>
    </TableHead>
);
