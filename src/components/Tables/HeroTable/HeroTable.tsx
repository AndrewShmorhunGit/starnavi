import React, { useState, useEffect } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";
import { THero } from "@utils/types/types";
import { FullScreenLoader } from "@components/Loaders/FullScreenLoader";
import { TablePaper } from "./StyledHeroTable";
import { useFetchHeroesQuery } from "@api/api.slice";
import { TableHeader } from "./TableHeader/TableHeader";
import { TableRowComponent } from "./TableRow/TableRow";
import { Pagination } from "./Pagination/Pagination";
import { InvalidPageMessage } from "./InvalidPageMessage/InvalidPageMessage";
import { HeroDialog } from "./HeroDialog/HeroDialog";

export function HeroTable() {
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = Math.max(1, Number(urlParams.get("page")) || 1);

    const [page, setPage] = useState(initialPage);
    const [selectedHero, setSelectedHero] = useState<THero | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const rowsPerPage = 10;

    const { data, isLoading, isError } = useFetchHeroesQuery(page);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const maxPages = data ? Math.ceil(data.count / rowsPerPage) : 1;
        if (data && (page < 1 || page > maxPages)) {
            setPage(1);
            window.history.replaceState(null, "", "?page=1");
        }
    }, [data, page]);

    useEffect(() => {
        const handlePopState = () => {
            const newPage = Math.max(1, Number(new URLSearchParams(window.location.search).get("page")) || 1);
            setPage(newPage);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        window.history.pushState(null, "", `?page=${newPage}`);
    };

    const handleListItemClick = (hero: THero) => setSelectedHero(hero);
    const handleCloseDialog = () => setSelectedHero(null);

    if (isLoading) return <FullScreenLoader />;
    if (isError || !data) return <InvalidPageMessage setPage={setPage} />;

    return (
        <TablePaper>
            <TableContainer sx={{ minHeight: "50vh" }}>
                <Table>
                    <TableHeader isMobile={isMobile} />
                    <TableBody>
                        {data.results.map((hero: THero) => (
                            <TableRowComponent
                                key={hero.id}
                                hero={hero}
                                handleListItemClick={handleListItemClick}
                                isMobile={isMobile}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={data.count} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} />
            <HeroDialog selectedHero={selectedHero} handleCloseDialog={handleCloseDialog} />
        </TablePaper>
    );
}
