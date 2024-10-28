import React from "react";
import { FlexBox } from "@styles/StyledComponents/FlexBoxes";
import { H3Typography } from "@components/Typography/Typography";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";

export function InvalidPageMessage({ setPage }: { setPage: (page: number) => void }) {
    const handleBackToTable = () => {
        setPage(1);
        window.history.replaceState(null, "", "?page=1");
    };

    return (
        <FlexBox textAlign="center" p={2} sx={{ flexDirection: "column", gap: 4 }}>
            <H3Typography>Unfortunately, this table page does not exist.</H3Typography>
            <FlexBox>
                <PrimaryButton onClick={handleBackToTable}>Back to the table</PrimaryButton>
            </FlexBox>
        </FlexBox>
    );
}
