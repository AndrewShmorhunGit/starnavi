import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { THero } from "@utils/types/types";
import { HeroGraph } from "@components/Graphs/HeroGraph";

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
            {/* <DialogTitle>Hero Details</DialogTitle> */}
            <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                    position: "absolute",
                    right: 4,
                    top: 4,
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
