import { render } from "vitest-browser-react";
import { expect, test, vi, afterEach, describe, Mock } from "vitest";
import { AppProvider } from "@components/App/AppProvider";
import { FilmNode } from "@components/Graphs/Nodes/FilmNode";
import { useFetchFilmsQuery } from "@store/api/api.slice";

type FetchFilmQueryReturnType = ReturnType<typeof useFetchFilmsQuery>;

const useMockFetchFilmQuery = vi.fn() as Mock<() => FetchFilmQueryReturnType>;

const mockFilm = {
    id: 2,
    title: "The Empire Strikes Back",
    episode_id: 5,
    opening_crawl:
        "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
    director: "Irvin Kershner",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1980-05-17",
    characters: [10, 13, 14, 18, 20, 21, 22, 23, 24, 25, 26, 1, 2, 3, 4, 5],
    planets: [4, 5, 6, 27],
    starships: [3, 10, 11, 12, 15, 17, 21, 22, 23],
    vehicles: [8, 14, 16, 18, 19, 20],
    species: [1, 2, 3, 6, 7],
    created: "2014-12-12T11:26:24.656000Z",
    edited: "2014-12-15T13:07:53.386000Z",
    url: "https://sw-api.starnavi.io/films/2/"
};

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
                <FilmNode film={mockFilm} />
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
                <FilmNode film={mockFilm} />
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
                <FilmNode film={mockFilm} />
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
                <FilmNode film={mockFilm} />
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
