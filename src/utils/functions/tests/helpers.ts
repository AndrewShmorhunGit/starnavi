import { Locator } from "@vitest/browser/context";

// Utility function to wait for an element to appear
export const waitForElement = async (getByText: (text: string | RegExp) => Locator, text: string) => {
    for (let i = 0; i < 10; i++) {
        // Try for a maximum of 10 attempts
        const element = getByText(text);
        if (element) {
            return element; // Return the element if found
        }
        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100ms before trying again
    }
    throw new Error(`Element with text "${text}" not found after waiting`);
};
