import React from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ErrorBoundary } from "@components/App/ErrorBoundary";
import { waitForElement } from "@utils/functions/tests/helpers";

// Create a simple component that throws an error
const ProblematicComponent = () => {
    throw new Error("Test error");
};

test("renders fallback UI when an error occurs", async () => {
    const { getByText } = render(
        <ErrorBoundary>
            <ProblematicComponent />
        </ErrorBoundary>
    );

    // Use the waitForElement function to wait for the fallback message
    const fallbackMessageLocator = await waitForElement(getByText, "Something went wrong.");

    // To check if the element is in the document, we can use `toBeDefined` since we are working with Locator
    expect(fallbackMessageLocator).toBeDefined();
});
