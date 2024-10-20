import { render } from "vitest-browser-react";
import { expect, test, vi, afterEach, describe, Mock } from "vitest";
import { AppProvider } from "@components/App/AppProvider";
import { FilmNode } from "@components/Tables/Graphs/Nodes/FilmNode";
import { useFetchFilmQuery } from "@api/api.slice";

// Определяем тип возвращаемого значения хука
type FilmData = {
    title: string;
    episode_id: number;
    director: string;
    release_date: string;
};

type UseFetchFilmQueryReturnType = {
    data?: FilmData | null;
    isLoading: boolean;
    error?: { message: string }; // Уточняем тип ошибки
    status: string;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    isUninitialized: boolean;
    refetch: () => void;
};

// Создание мока для useFetchFilmQuery
const useMockFetchFilmQuery = vi.fn() as Mock<() => UseFetchFilmQueryReturnType>;

vi.mock("../../../../../src/api/api.slice", () => ({
    useFetchFilmQuery: useMockFetchFilmQuery // Используем наш мок
}));

describe("FilmNode Component", () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Восстанавливаем моки после каждого теста
    });

    test("renders loading state", () => {
        // Мок реализации для состояния загрузки
        useMockFetchFilmQuery.mockReturnValue({
            isLoading: true,
            status: "loading",
            isFetching: false,
            isSuccess: false,
            isError: false,
            isUninitialized: false,
            refetch: vi.fn() // Добавляем метод refetch
        });

        const { getByTestId } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Проверка на наличие спиннера загрузки
        const loadingSpinner = getByTestId("loading-spinner");
        expect(loadingSpinner).toBeTruthy();
    });

    test("renders error state", () => {
        // Мок реализации для состояния ошибки
        useMockFetchFilmQuery.mockReturnValue({
            error: { message: "Failed to fetch film data" },
            isLoading: false,
            status: "error",
            isFetching: false,
            isSuccess: false,
            isUninitialized: false,
            refetch: vi.fn()
        });

        const { getByTestId } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Проверка на наличие сообщения об ошибке
        expect(getByTestId("error-message")).toHaveTextContent("Error: Failed to fetch film data");
    });

    test("renders no data state", () => {
        // Мок реализации для состояния без данных
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

        const { getByTestId } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Проверка на наличие сообщения о том, что данных нет
        expect(getByTestId("no-data")).toHaveTextContent("No data!");
    });

    test("renders film data correctly", () => {
        // Мок реализации, возвращающей данные о фильме
        const mockFilm: FilmData = {
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

        const { getByTestId } = render(
            <AppProvider>
                <FilmNode filmId={1} />
            </AppProvider>
        );

        // Проверка, что детали фильма отрендерены
        expect(getByTestId("film-title")).toHaveTextContent("A New Hope");
        expect(getByTestId("film-episode")).toHaveTextContent("Episode: 4");
        expect(getByTestId("film-director")).toHaveTextContent("Director: George Lucas");
        expect(getByTestId("film-release-date")).toHaveTextContent("Release Date: 1977-05-25");
    });
});
