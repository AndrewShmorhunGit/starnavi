import React, { FC } from "react";
import { Button, ButtonProps, styled } from "@mui/material";

type CustomButtonProps = {
    href?: string;
    target?: string;
    rel?: string;
} & ButtonProps;

const StyledSecondaryButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    textTransform: "none"
}));

export const SecondaryButton: FC<CustomButtonProps> = (props) => {
    const { children, ...rest } = props;

    return (
        <StyledSecondaryButton variant="text" {...rest}>
            {children}
        </StyledSecondaryButton>
    );
};
