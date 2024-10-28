import React from "react";
import { TableHead, TableRow } from "@mui/material";
import { HeaderCell } from "../StyledHeroTable";
import { TABLE_HEADERS } from "@utils/constants/hero.table.constants";

export function TableHeader({ isMobile }: { isMobile: boolean }) {
    const headers = TABLE_HEADERS(isMobile);

    return (
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
}
