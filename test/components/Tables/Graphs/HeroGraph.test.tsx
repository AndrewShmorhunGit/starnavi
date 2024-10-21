import { render } from "vitest-browser-react";
import { expect, test, vi, afterEach, describe, Mock } from "vitest";

import { useFetchFilmQuery } from "@api/api.slice";
import { AppProvider } from "@components/App/AppProvider";
import { HeroGraph } from "@components/Tables/Graphs/HeroGraph";
import { THero } from "@utils/types/types";

type FetchFilmQueryReturnType = ReturnType<typeof useFetchFilmQuery>;

const useMockFetchFilmQuery = vi.fn() as Mock<() => FetchFilmQueryReturnType>;

describe("HeroGraph Component", () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Restore mocks after each test
    });

    const heroMock = {
        id: 1,
        name: "Luke Skywalker",
        films: [1, 2], // Sample film IDs
        starships: [1, 2]
    };

    test("renders hero node correctly", () => {
        const { getByText } = render(
            <AppProvider>
                <HeroGraph hero={heroMock as THero} />
            </AppProvider>
        );

        // Check that the hero's name is displayed
        expect(getByText("Luke Skywalker")).toBeTruthy();
    });

    test("renders film nodes correctly", () => {
        const mockFilmData = {
            starships: [1, 2] // Sample starship IDs for the test
        };

        // Mock film data
        useMockFetchFilmQuery.mockReturnValue({
            data: mockFilmData,
            isLoading: false,
            error: null,
            isSuccess: true,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByText } = render(
            <AppProvider>
                <HeroGraph hero={heroMock as THero} />
            </AppProvider>
        );

        // Check that films are displayed
        expect(getByText("FilmNode")).toBeTruthy(); // Replace with actual film name if available
    });

    test("renders starship nodes correctly", () => {
        const mockFilmDataWithStarships = {
            starships: [1, 2] // Starship IDs should match those of the hero
        };

        // Mock film data with starships
        useMockFetchFilmQuery.mockReturnValue({
            data: mockFilmDataWithStarships,
            isLoading: false,
            error: null,
            isSuccess: true,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByText } = render(
            <AppProvider>
                <HeroGraph hero={heroMock as THero} />
            </AppProvider>
        );

        // Check that starships are displayed
        expect(getByText("StarshipNode")).toBeTruthy(); // Replace with actual starship name if available
    });
});
