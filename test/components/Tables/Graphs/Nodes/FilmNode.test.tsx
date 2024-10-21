import { render } from "vitest-browser-react";
import { expect, test, vi, afterEach, describe, Mock } from "vitest";
import { AppProvider } from "@components/App/AppProvider";
import { FilmNode } from "@components/Tables/Graphs/Nodes/FilmNode";
import { useFetchFilmQuery } from "@api/api.slice";

type FetchFilmQueryReturnType = ReturnType<typeof useFetchFilmQuery>;

const useMockFetchFilmQuery = vi.fn() as Mock<() => FetchFilmQueryReturnType>;

describe("FilmNode Component", () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Restore mocks after each test
    });

    test("renders loading state and ensures no film data or error", () => {
        useMockFetchFilmQuery.mockReturnValue({
            isLoading: true,
            status: "loading",
            isFetching: false,
            isSuccess: false,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn() // Mock refetch function
        });

        const { getByTestId } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Check for loading spinner
        const loadingSpinner = getByTestId("loading-spinner");
        expect(loadingSpinner).toBeTruthy();

        // Ensure no error or film data is rendered
        expect(getByTestId("error-message")).not.toBe(HTMLElement);
        expect(getByTestId("film-node")).not.toBe(HTMLElement);
        expect(getByTestId("no-data")).not.toBe(HTMLElement);
    });

    test("renders error state and ensures no film data or loading spinner", () => {
        useMockFetchFilmQuery.mockReturnValue({
            error: { message: "Failed to fetch film data" },
            isLoading: false,
            status: "error",
            isFetching: false,
            isSuccess: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByTestId, getByText } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Check for error message
        expect(getByTestId("error-message")).toBeTruthy();
        expect(getByText("Error: Failed to fetch film data")).toBeTruthy();

        // Ensure no film data or loading spinner is rendered
        expect(getByTestId("film-node")).not.toBe(HTMLElement);
        expect(getByTestId("loading-spinner")).not.toBe(HTMLElement);
        expect(getByTestId("no-data")).not.toBe(HTMLElement);
    });

    test("renders no data state and ensures no error or loading spinner", () => {
        useMockFetchFilmQuery.mockReturnValue({
            data: null,
            isLoading: false,
            status: "idle",
            isFetching: false,
            isSuccess: false,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByTestId, getByText } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Check for "no data" message
        expect(getByTestId("no-data")).toBeTruthy();
        expect(getByText("No data!")).toBeTruthy();

        // Ensure no film data, error, or loading spinner is rendered
        expect(getByTestId("film-node")).not.toBe(HTMLElement);
        expect(getByTestId("error-message")).not.toBe(HTMLElement);
        expect(getByTestId("loading-spinner")).not.toBe(HTMLElement);
    });

    test("renders film data correctly and ensures no loading spinner or error", () => {
        const mockFilm = {
            title: "A New Hope",
            episode_id: 4,
            director: "George Lucas",
            release_date: "1977-05-25"
        };

        useMockFetchFilmQuery.mockReturnValue({
            data: mockFilm,
            isLoading: false,
            error: null,
            status: "success",
            isFetching: false,
            isSuccess: true,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByTestId, getByText } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Check for film data
        expect(getByTestId("film-title")).toBeTruthy();
        expect(getByText("A New Hope")).toBeTruthy();
        expect(getByTestId("film-episode")).toBeTruthy();
        expect(getByText("Episode: 4")).toBeTruthy();
        expect(getByTestId("film-director")).toBeTruthy();
        expect(getByText("Director: George Lucas")).toBeTruthy();
        expect(getByTestId("film-release-date")).toBeTruthy();
        expect(getByText("Release Date: 1977-05-25")).toBeTruthy();

        // Ensure no loading spinner, error, or "no data" message is rendered
        expect(getByTestId("loading-spinner")).not.toBe(HTMLElement);
        expect(getByTestId("error-message")).not.toBe(HTMLElement);
        expect(getByTestId("no-data")).not.toBe(HTMLElement);
    });
});
