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
    DialogTitle,
    IconButton
} from "@mui/material";
import { THero } from "@utils/types/types";
import { FullScreenLoader } from "@components/Loaders/FullScreenLoader";
import { getMappedColor, validateField } from "@utils/functions/validation/heroes.table";
import { HeroGraph } from "@components/Tables/Graphs/HeroGraph";
import { ButtonCell, ColorMarker, HeaderCell, HeroCell, TablePaper } from "./StyledHeroTable";
import { TABLE_HEADERS } from "@utils/constants/hero.table.constants";
import { useFetchHeroesQuery } from "@api/api.slice";
import CloseIcon from "@mui/icons-material/Close";
import { H3Typography } from "@components/Typography/Typography";
import { FlexBox } from "@styles/StyledComponents/FlexBoxes";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";

// Responsive table component for displaying heroes
export const HeroTable: React.FC = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = Math.max(1, Number(urlParams.get("page")) || 1);

    const [page, setPage] = useState(initialPage);
    const [selectedHero, setSelectedHero] = useState<THero | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const rowsPerPage = 10;

    const { data, isLoading, isError } = useFetchHeroesQuery(page); // Page starts at 1

    // Handle window resize for mobile view detection
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Sync page number with URL and check validity
    useEffect(() => {
        const maxPages = data ? Math.ceil(data.count / rowsPerPage) : 1;
        if (data && (page < 1 || page > maxPages)) {
            setPage(1); // Reset page to 1 if it's invalid
            window.history.replaceState(null, "", "?page=1");
        }
    }, [data, page]);

    // Handle URL navigation with history updates
    useEffect(() => {
        const handlePopState = () => {
            const newPage = Math.max(1, Number(new URLSearchParams(window.location.search).get("page")) || 1);
            setPage(newPage);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    // Function to handle page change
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        window.history.pushState(null, "", `?page=${newPage}`);
    };

    // Function to handle hero selection
    const handleListItemClick = (hero: THero) => setSelectedHero(hero);

    // Function to close the dialog
    const handleCloseDialog = () => setSelectedHero(null);

    // Render pagination if data is invalid or missing
    const renderInvalidPageMessage = () => (
        <FlexBox textAlign="center" p={2} sx={{ flexDirection: "column", gap: 4 }}>
            <H3Typography>Unfortunately, this table page does not exist.</H3Typography>
            <FlexBox>
                <PrimaryButton
                    onClick={() => {
                        setPage(1), window.history.replaceState(null, "", "?page=1");
                    }}
                >
                    Back to the table
                </PrimaryButton>
            </FlexBox>
        </FlexBox>
    );

    // Loading, error, and no data handling
    if (isLoading) return <FullScreenLoader />;
    if (isError || !data) return renderInvalidPageMessage();

    return (
        <TablePaper>
            <TableContainer sx={{ minHeight: "50vh" }}>
                <Table>
                    {renderTableHeader(TABLE_HEADERS(isMobile))}
                    <TableBody>
                        {data.results.map((hero: THero) => renderTableRow(hero, handleListItemClick, isMobile))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.count}
                page={page - 1} // Adjusting for zero-based index in TablePagination
                onPageChange={(event, newPage) => handleChangePage(event, newPage + 1)}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]} // No rows-per-page options
            />

            {/* Dialog for hero details */}
            {selectedHero && (
                <Dialog open={Boolean(selectedHero)} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
                    <DialogTitle>Hero Details</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: "absolute",
                            right: 2,
                            top: 2,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <HeroGraph hero={selectedHero} />
                    </DialogContent>
                </Dialog>
            )}
        </TablePaper>
    );
};

// Render a single table row
const renderTableRow = (hero: THero, handleListItemClick: (hero: THero) => void, isMobile: boolean) => (
    <TableRow key={hero.id}>
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

// Render color markers for hair or eye color
const renderColorMarkers = (colors: string, isEyeColor = false) => {
    return colors
        .split(",")
        .map((color, index) => (
            <ColorMarker key={index} color={getMappedColor(color, isEyeColor)} border="1px solid black" />
        ));
};

// Render the table header
const renderTableHeader = (headers: string[]) => (
    <TableHead>
        <TableRow>
            {headers.map((header, index) => (
                <HeaderCell key={index} sx={index === 0 ? { borderLeft: "none" } : {}}>
                    {header}
                </HeaderCell>
            ))}
        </TableRow>
    </TableHead>
);
