import * as React from "react";
import { Box, Button, CircularProgress, Backdrop } from "@mui/material";

export default function SimpleBackdrop() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box>
            <Button onClick={handleOpen}>Show backdrop</Button>
            <Backdrop
                sx={(theme) => ({ color: theme.palette.primary.main, zIndex: 99 })}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}
