import { render } from "vitest-browser-react";
import { expect, test, vi, afterEach, describe, Mock } from "vitest";
import { AppProvider } from "@components/App/AppProvider";
import { StarshipNode } from "@components/Graphs/Nodes/StarshipNode";
import { useFetchStarshipsQuery } from "@store/api/api.slice";

type FetchStarshipQueryReturnType = ReturnType<typeof useFetchStarshipsQuery>;

const useMockFetchStarshipQuery = vi.fn() as Mock<() => FetchStarshipQueryReturnType>;
const mockStarship = {
    id: 2,
    name: "CR90 corvette",
    model: "CR90 corvette",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "3500000",
    length: "150",
    max_atmosphering_speed: "950",
    crew: "30-165",
    passengers: "600",
    cargo_capacity: "3000000",
    consumables: "1 year",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "corvette",
    pilots: [],
    films: [1, 3, 6],
    created: "2014-12-10T14:20:33.369000Z",
    edited: "2014-12-20T21:23:49.867000Z",
    url: "https://sw-api.starnavi.io/starships/2/"
};

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
                <StarshipNode starship={mockStarship} />
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
                <StarshipNode starship={mockStarship} />
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
                <StarshipNode starship={mockStarship} />
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
                <StarshipNode starship={mockStarship} />
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
