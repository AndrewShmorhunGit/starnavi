import React, { useState } from "react";
import { Pagination as MuiPagination, Input, Button } from "@mui/material";
import { FlexBox } from "@styles/StyledComponents/FlexBoxes";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";

export function Pagination({
    count,
    page,
    onPageChange,
    rowsPerPage
}: {
    count: number;
    page: number;
    onPageChange: (event: unknown, newPage: number) => void;
    rowsPerPage: number;
}) {
    const [inputPage, setInputPage] = useState("");
    const totalPages = Math.ceil(count / rowsPerPage);

    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value);
    };

    const handlePageInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPage = parseInt(inputPage, 10);
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(null, newPage);
        }
        setInputPage("");
    };

    return (
        <FlexBox sx={{ flexDirection: "column", alignItems: "center", gap: 2 }}>
            {/* <TablePagination
                component="div"
                count={count}
                page={page - 1}
                onPageChange={(event, newPage) => onPageChange(event, newPage + 1)}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
            /> */}
            <MuiPagination
                count={totalPages}
                page={page}
                onChange={(event, newPage) => onPageChange(event, newPage)}
                color="primary"
                size="large"
                // showFirstButton
                // showLastButton
            />
            <FlexBox sx={{ gap: 2, alignItems: "center" }}>
                <form onSubmit={handlePageInputSubmit}>
                    <FlexBox sx={{ gap: 2 }}>
                        <Input
                            type="number"
                            value={inputPage}
                            onChange={handlePageInputChange}
                            placeholder="Go to page"
                            // min={1}
                            // max={totalPages}
                        />
                        <SecondaryButton type="submit">Go</SecondaryButton>
                    </FlexBox>
                </form>
                {/* <span>of {totalPages}</span> */}
            </FlexBox>
        </FlexBox>
    );
}
