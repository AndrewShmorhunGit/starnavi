import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import { App } from "@components/App/App";
import { AppProvider } from "@components/App/AppProvider";
import { Theme, ThemeProvider, createTheme } from "@mui/material";

const renderWithProviders = (theme: Theme) => {
    return render(
        <AppProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </AppProvider>
    );
};

// Test for rendering the App component with light theme
test("renders App component with light theme", async () => {
    const lightTheme = createTheme({
        palette: {
            mode: "light"
        }
    });

    const { getByTestId } = renderWithProviders(lightTheme);

    // Check if the StarrySky component is rendered
    const starrySky = getByTestId("starry-sky");
    const backgroundStars = getByTestId("background-stars");
    const twinklingOverlay = getByTestId("twinkling-overlay");

    expect(starrySky).toBeTruthy();
    expect(backgroundStars).toBeTruthy();
    expect(twinklingOverlay).toBeTruthy();
});

// Test for rendering the App component with dark theme
test("renders App component with dark theme", async () => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    const { getByTestId } = renderWithProviders(darkTheme);

    // Check if the StarrySky component is rendered
    const starrySky = getByTestId("starry-sky");
    const backgroundStars = getByTestId("background-stars");
    const twinklingOverlay = getByTestId("twinkling-overlay");

    expect(starrySky).toBeTruthy();
    expect(backgroundStars).toBeTruthy();
    expect(twinklingOverlay).toBeTruthy();
});
