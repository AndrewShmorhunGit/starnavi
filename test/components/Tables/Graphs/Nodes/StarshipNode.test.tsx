import { render } from "vitest-browser-react";
import { expect, test, vi, afterEach, describe, Mock } from "vitest";
import { AppProvider } from "@components/App/AppProvider";
import { StarshipNode } from "@components/Tables/Graphs/Nodes/StarshipNode";
import { useFetchStarshipQuery } from "@api/api.slice";

type FetchStarshipQueryReturnType = ReturnType<typeof useFetchStarshipQuery>;

const useMockFetchStarshipQuery = vi.fn() as Mock<() => FetchStarshipQueryReturnType>;

describe("StarshipNode Component", () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Restore mocks after each test
    });

    test("renders loading state and ensures no starship data or error", () => {
        useMockFetchStarshipQuery.mockReturnValue({
            isLoading: true,
            error: null,
            data: null,
            isSuccess: false,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn() // Mock refetch function
        });

        const { getByTestId } = render(
            <AppProvider>
                <StarshipNode starshipId={1} />
            </AppProvider>
        );

        // Check for loading spinner
        expect(getByTestId("loading-spinner")).toBeTruthy();

        // Ensure no error or starship data is rendered

        expect(getByTestId("error-message")).not.toBe(HTMLElement);
        expect(getByTestId("starship-node")).not.toBe(HTMLElement);
        expect(getByTestId("no-data")).not.toBe(HTMLElement);
    });

    test("renders error state and ensures no starship data or loading spinner", () => {
        useMockFetchStarshipQuery.mockReturnValue({
            isLoading: false,
            error: { message: "Failed to fetch starship data" },
            data: null,
            isSuccess: false,
            isError: true,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByTestId, getByText } = render(
            <AppProvider>
                <StarshipNode starshipId={1} />
            </AppProvider>
        );

        // Check for error message
        expect(getByTestId("error-message")).toBeTruthy();
        expect(getByText("Error: Failed to fetch starship data")).toBeTruthy();

        // Ensure no starship data or loading spinner is rendered
        expect(getByTestId("starship-node")).not.toBe(HTMLElement);
        expect(getByTestId("loading-spinner")).not.toBe(HTMLElement);
        expect(getByTestId("no-data")).not.toBe(HTMLElement);
    });

    test("renders no data state and ensures no error or loading spinner", () => {
        useMockFetchStarshipQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
            isSuccess: false,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByTestId, getByText } = render(
            <AppProvider>
                <StarshipNode starshipId={1} />
            </AppProvider>
        );

        // Check for "no data" message
        expect(getByTestId("no-data")).toBeTruthy();
        expect(getByText("No data!")).toBeTruthy();

        // Ensure no starship data, error, or loading spinner is rendered
        expect(getByTestId("starship-node")).not.toBe(HTMLElement);
        expect(getByTestId("error-message")).not.toBe(HTMLElement);
        expect(getByTestId("loading-spinner")).not.toBe(HTMLElement);
    });

    test("renders starship data correctly and ensures no loading spinner or error", () => {
        const mockStarship = {
            name: "Millennium Falcon",
            model: "YT-1300 light freighter",
            manufacturer: "Corellian Engineering Corporation",
            cost_in_credits: "100000"
        };

        useMockFetchStarshipQuery.mockReturnValue({
            data: mockStarship,
            isLoading: false,
            error: null,
            isSuccess: true,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByTestId, getByText } = render(
            <AppProvider>
                <StarshipNode starshipId={1} />
            </AppProvider>
        );

        // Check for starship data
        expect(getByTestId("starship-name")).toBeTruthy();
        expect(getByText("Millennium Falcon")).toBeTruthy();
        expect(getByTestId("starship-model")).toBeTruthy();
        expect(getByText("Model: YT-1300 light freighter")).toBeTruthy();
        expect(getByTestId("starship-manufacturer")).toBeTruthy();
        expect(getByText("Manufacturer: Corellian Engineering Corporation")).toBeTruthy();
        expect(getByTestId("starship-cost")).toBeTruthy();
        expect(getByText("Cost: 100000 credits")).toBeTruthy();

        // Ensure no loading spinner, error, or "no data" message is rendered
        expect(getByTestId("loading-spinner")).not.toBe(HTMLElement);
        expect(getByTestId("error-message")).not.toBe(HTMLElement);
        expect(getByTestId("no-data")).not.toBe(HTMLElement);
    });
});
