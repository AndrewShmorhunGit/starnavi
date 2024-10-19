import { ThemeOptions } from "@mui/material";
import { ThemeModeEnum } from "../../utils/enums/theme";

const DARK_PALETTE: ThemeOptions["palette"] = {
    mode: ThemeModeEnum.DARK,
    primary: { main: "#FF6F00", dark: "#E65100", contrastText: "#FFFFFF" },
    secondary: {
        main: "#0D47A1",
        dark: "#002171",
        contrastText: "#FFFFFF"
    },
    text: {
        primary: "#E0E0E0",
        secondary: "#B0BEC5",
        disabled: "#607D8B"
    },
    background: {
        paper: "#263238",
        default: "#1C313A"
    },
    success: {
        main: "#4CAF50",
        contrastText: "#FFFFFF"
    },
    error: {
        main: "#F44336",
        contrastText: "#FFFFFF"
    },
    warning: {
        main: "#FF9800",
        contrastText: "#FFFFFF"
    },
    info: {
        main: "#2196F3",
        contrastText: "#FFFFFF"
    },
    grey: {
        "50": "#37474F",
        "100": "#455A64",
        "200": "#546E7A",
        "300": "#607D8B",
        "400": "#78909C",
        "500": "#90A4AE",
        "600": "#B0BEC5",
        "700": "#CFD8DC",
        "800": "#ECEFF1",
        "900": "#FFFFFF"
    }
};

const LIGHT_PALETTE: ThemeOptions["palette"] = {
    mode: ThemeModeEnum.LIGHT,
    primary: {
        main: "#1976D2",
        dark: "#1565C0",
        contrastText: "#FFFFFF"
    },
    secondary: {
        main: "#F57C00",
        dark: "#E65100",
        contrastText: "#FFFFFF"
    },
    text: {
        primary: "#212121",
        secondary: "#757575",
        disabled: "#BDBDBD"
    },
    background: {
        paper: "#FFFFFF",
        default: "#F5F5F5"
    },
    success: {
        main: "#4CAF50",
        contrastText: "#FFFFFF"
    },
    error: {
        main: "#F44336",
        contrastText: "#FFFFFF"
    },
    warning: {
        main: "#FF9800",
        contrastText: "#FFFFFF"
    },
    info: {
        main: "#2196F3",
        contrastText: "#FFFFFF"
    },
    grey: {
        "50": "#F5F5F5",
        "100": "#E0E0E0",
        "200": "#BDBDBD",
        "300": "#9E9E9E",
        "400": "#757575",
        "500": "#616161",
        "600": "#424242",
        "700": "#212121",
        "800": "#0D47A1",
        "900": "#000000"
    }
};

type MuiPalette = { [key in ThemeModeEnum]: ThemeOptions["palette"] };
export const MUI_PALETTE: MuiPalette = {
    [ThemeModeEnum.DARK]: DARK_PALETTE,
    [ThemeModeEnum.LIGHT]: LIGHT_PALETTE
};
