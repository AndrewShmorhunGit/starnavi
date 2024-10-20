import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import { HeroTable } from "@components/Tables/HeroTable";
import { AppProvider } from "@components/App/AppProvider";

test("renders HeroTable component", () => {
    const { getByTestId } = render(
        <AppProvider>
            <HeroTable />
        </AppProvider>
    );
    const tableLocator = getByTestId("hero-table");
    expect(tableLocator).toBeTruthy();
});
