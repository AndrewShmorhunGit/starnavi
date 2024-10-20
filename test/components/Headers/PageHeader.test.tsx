import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import { PageHeader } from "@components/Headers/PageHeader";
import { AppProvider } from "@components/App/AppProvider";

test("renders PageHeader component", () => {
    // Render the PageHeader component within the AppProvider to provide necessary context
    const { getByTestId } = render(
        <AppProvider>
            <PageHeader />
        </AppProvider>
    );

    // Retrieve the header element by its test ID
    const headerLocator = getByTestId("page-header"); // Make sure you added testId to the component
    expect(headerLocator).toBeTruthy(); // Check that the header element is truthy (exists)
});
