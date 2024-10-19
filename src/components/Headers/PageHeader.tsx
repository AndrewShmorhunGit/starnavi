import React from "react";
import { ThemeToggleButton } from "@components/Theme/ThemeToggleButton";
import { Box, styled } from "@mui/material";
import { PaperHeaderContainer } from "@styles/StyledComponents/Containers";
import { FlexBox } from "@styles/StyledComponents/FlexBoxes";
import { MEDIA_BREAKPOINT } from "@utils/constants/media.constants";

const StyledOptionsBox = styled(Box)`
    display: flex;
    gap: 2rem;

    @media ${MEDIA_BREAKPOINT["768"]} {
        gap: 1rem;
    }
    @media ${MEDIA_BREAKPOINT["480"]} {
        gap: 8px;
    }
`;

export function PageHeader(): React.ReactNode {
    return (
        <PaperHeaderContainer>
            <FlexBox>
                <img
                    src="https://p.djinni.co/be/ae0e184f1cbcc14307ce5883f37238/1580845611882_400.jpeg"
                    alt="main logo"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
            </FlexBox>
            <StyledOptionsBox>
                <ThemeToggleButton />
            </StyledOptionsBox>
        </PaperHeaderContainer>
    );
}
