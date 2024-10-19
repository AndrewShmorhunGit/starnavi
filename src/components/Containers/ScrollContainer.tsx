import React, { FC, ReactNode, CSSProperties } from "react";
import { Box, styled } from "@mui/material";

const StyledScrollContainer = styled(Box)`
    overflow: auto;
    position: relative;

    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.palette.primary.main};
        border-radius: 3px;
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.palette.primary.dark};
    }
`;

type ScrollContainerProps = {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
};

export const ScrollContainer: FC<ScrollContainerProps> = ({ children, ...rest }) => {
    return <StyledScrollContainer {...rest}>{children}</StyledScrollContainer>;
};
