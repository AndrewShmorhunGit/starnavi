import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HeroGraph } from "@components/Tables/Graphs/HeroGraph";
import { THero } from "@utils/types/types";

export function HeroDialog({
    selectedHero,
    handleCloseDialog
}: {
    selectedHero: THero | null;
    handleCloseDialog: () => void;
}) {
    if (!selectedHero) return null;

    return (
        <Dialog open={Boolean(selectedHero)} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
            <DialogTitle>Hero Details</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                    position: "absolute",
                    right: 2,
                    top: 2,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <HeroGraph hero={selectedHero} />
            </DialogContent>
        </Dialog>
    );
}
