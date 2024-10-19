import { ThemeProvider } from "@providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@store/store";
import React from "react";

type AppProvidersProps = { children: React.ReactNode };

export const AppProvider: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
        </Provider>
    );
};
