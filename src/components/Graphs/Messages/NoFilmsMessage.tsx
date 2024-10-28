import React from "react";
import { Box, Typography } from "@mui/material";

export function NoFilmsMessage() {
    console.log("No films!");

    return (
        <Box textAlign="center">
            <Typography variant="h6">No films available for this hero.</Typography>
        </Box>
    );
}
