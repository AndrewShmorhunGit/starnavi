import { Box, Paper, styled, TableCell } from "@mui/material";

export const ColorMarker = styled(Box)<{ color: string }>`
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 8px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
`;

export const TablePaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "transparent" : undefined,
    marginBottom: 2,
    display: "flex",
    flexDirection: "column"
}));

export const HeaderCell = styled(TableCell)`
    font-weight: 700;
    text-align: center;
`;

export const HeroCell = styled(TableCell)`
    padding: 0;
    text-align: center;
`;

export const ButtonCell = styled(TableCell)`
    padding: 0;
    border-right: 1px solid ${({ theme }) => theme.palette.divider};
    text-align: center;
`;
