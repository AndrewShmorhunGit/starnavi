import React, { FC } from "react";
import { Button, ButtonProps, styled } from "@mui/material";

type CustomButtonProps = {
    href?: string;
    target?: string;
    rel?: string;
} & ButtonProps;

const StyledPrimaryButton = styled(Button)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textTransform: "none",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark
    }
}));

export const PrimaryButton: FC<CustomButtonProps> = (props) => {
    const { children, ...rest } = props;

    return (
        <StyledPrimaryButton variant="contained" {...rest}>
            {children}
        </StyledPrimaryButton>
    );
};
