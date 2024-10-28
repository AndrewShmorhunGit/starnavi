import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Body1Typography } from "@components/Typography/Typography";

export function LoadingSpinner() {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress />
            <Body1Typography sx={{ marginLeft: 2 }}>Loading data...</Body1Typography>
        </Box>
    );
}
