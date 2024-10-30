import { useState, useEffect } from "react";
import { useFetchHeroesQuery } from "@store/api/api.slice";
import { THero } from "@utils/types/types";

export function useHeroTable() {
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = Math.max(1, Number(urlParams.get("page")) || 1);
    const rowsPerPage = 10;

    const [page, setPage] = useState(initialPage);
    const [selectedHero, setSelectedHero] = useState<THero | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    const { data, isLoading, isError } = useFetchHeroesQuery(page);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const maxPages = data ? Math.ceil(data.count / rowsPerPage) : 1;
        if (data && (page < 1 || page > maxPages)) {
            setPage(1);
            window.history.replaceState(null, "", "?page=1");
        }
    }, [data, page]);

    useEffect(() => {
        const handlePopState = () => {
            const newPage = Math.max(1, Number(new URLSearchParams(window.location.search).get("page")) || 1);
            setPage(newPage);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        window.history.pushState(null, "", `?page=${newPage}`);
    };

    const handleListItemClick = (hero: THero) => setSelectedHero(hero);
    const handleCloseDialog = () => setSelectedHero(null);

    return {
        rowsPerPage,
        page,
        data,
        isLoading,
        isError,
        isMobile,
        selectedHero,
        handleChangePage,
        handleListItemClick,
        handleCloseDialog,
        setPage
    };
}
