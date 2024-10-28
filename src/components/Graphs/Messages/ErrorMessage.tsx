import React from "react";
import { Box } from "@mui/material";
import { Body1Typography } from "@components/Typography/Typography";

export function ErrorMessage() {
    return (
        <Box textAlign="center" marginTop={2}>
            <Body1Typography color="error">Error loading data</Body1Typography>
        </Box>
    );
}
