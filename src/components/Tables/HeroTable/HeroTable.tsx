import React, { useState, useEffect } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";
import { THero } from "@utils/types/types";
import { FullScreenLoader } from "@components/Loaders/FullScreenLoader";
import { TablePaper } from "./StyledHeroTable";
import { TableHeader } from "./TableHeader/TableHeader";
import { TableRowComponent } from "./TableRow/TableRow";
import { Pagination } from "./Pagination/Pagination";
import { InvalidPageMessage } from "./InvalidPageMessage/InvalidPageMessage";
import { HeroDialog } from "./HeroDialog/HeroDialog";
import { useHeroTable } from "./hooks/useHeroTable";

export function HeroTable() {
    const {
        rowsPerPage,
        page,
        data,
        isLoading,
        isError,
        isMobile,
        selectedHero,
        handleChangePage,
        handleListItemClick,
        handleCloseDialog,
        setPage
    } = useHeroTable();

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
