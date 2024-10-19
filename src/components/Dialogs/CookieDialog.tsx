import React, { useEffect, useCallback } from "react";
import TrapFocus from "@mui/material/Unstable_TrapFocus";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";
import { Box, Fade, Paper, Stack, styled } from "@mui/material";
import { Body2Typography } from "@components/Typography/Typography";
import { getCookie, setCookie } from "@utils/functions/storage/cookies";

const CookieBanner = styled(Paper)(({ theme }) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    m: 0,
    p: 2,
    borderWidth: 0,
    borderRadius: "0px !important",
    borderTop: `2px solid ${theme.palette.primary.main}`,
    zIndex: 99
}));

export function CookieDialog() {
    const [bannerOpen, setBannerOpen] = React.useState(false);

    useEffect(() => {
        const allowedCookie = getCookie("allowed");

        if (allowedCookie === "true") {
            setBannerOpen(false);
        } else {
            if (allowedCookie === null) {
                setCookie("allowed", "false", 30);
            }
            setBannerOpen(true);
        }
    }, []);

    const handleAllow = useCallback(() => {
        setCookie("allowed", "true", 30);
        setBannerOpen(false);
    }, []);

    const handleReject = useCallback(() => {
        setCookie("allowed", "false", 30);
        setBannerOpen(false);
    }, []);

    return (
        <TrapFocus open disableAutoFocus disableEnforceFocus>
            <Fade appear={false} in={bannerOpen}>
                <CookieBanner
                    role="dialog"
                    aria-modal="false"
                    aria-label="Cookie banner"
                    square
                    variant="outlined"
                    tabIndex={-1}
                >
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        sx={{ justifyContent: "space-between", gap: 2, width: "100%" }}
                    >
                        <Box sx={{ flexShrink: 1, alignSelf: { xs: "flex-start", sm: "center" } }}>
                            <Body2Typography>
                                {"We are using cookies on this page to enhance your browsing experience"}
                            </Body2Typography>
                        </Box>
                        <Stack
                            direction={"row"}
                            sx={{
                                gap: 2,
                                flexShrink: 0,
                                alignSelf: { xs: "flex-end", sm: "center" }
                            }}
                        >
                            <PrimaryButton size="small" onClick={handleAllow}>
                                {"Allow"}
                            </PrimaryButton>
                            <SecondaryButton size="small" onClick={handleReject}>
                                {"Reject"}
                            </SecondaryButton>
                        </Stack>
                    </Stack>
                </CookieBanner>
            </Fade>
        </TrapFocus>
    );
}
