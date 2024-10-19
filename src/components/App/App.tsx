import React from "react";

import { useTheme } from "@mui/material";
import { PageContainer, PageWrapper } from "@styles/StyledComponents/Containers";
import { CookieDialog } from "@components/Dialogs/CookieDialog";
import { PageHeader } from "@components/Headers/PageHeader";
import { StarrySky } from "@components/Theme/StarrySky";
import { HeroTable } from "@components/Tables/HeroTable";

export function App(): React.ReactNode {
    const theme = useTheme();
    return (
        <PageContainer>
            {theme.palette.mode === "dark" && <StarrySky />}
            <PageWrapper>
                <PageHeader />
                <HeroTable />
            </PageWrapper>
            <CookieDialog />
        </PageContainer>
    );
}
