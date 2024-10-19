import React from "react";
import { Typography, TypographyProps } from "@mui/material";

export type MuiTypographyProps = TypographyProps & { component?: string };

export const Body1Typography = (props: MuiTypographyProps) => (
    <Typography variant="body1" color="text.primary" {...props} />
);

export const Body2Typography = (props: MuiTypographyProps) => (
    <Typography variant="body2" color="text.primary" {...props} />
);

export const Subtitle1Typography = (props: MuiTypographyProps) => (
    <Typography variant="subtitle1" color="text.secondary" {...props} />
);

export const Subtitle2Typography = (props: MuiTypographyProps) => (
    <Typography variant="subtitle2" color="text.primary" {...props} />
);

export const H1Typography = (props: MuiTypographyProps) => <Typography variant="h1" color="text.primary" {...props} />;

export const H2Typography = (props: MuiTypographyProps) => <Typography variant="h2" color="text.primary" {...props} />;

export const H3Typography = (props: MuiTypographyProps) => <Typography variant="h3" color="text.primary" {...props} />;
