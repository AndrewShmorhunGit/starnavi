import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export const FullScreenLoader = () => {
    return (
        <Backdrop sx={(theme) => ({ color: theme.palette.primary.main, zIndex: theme.zIndex.drawer + 1 })} open>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
