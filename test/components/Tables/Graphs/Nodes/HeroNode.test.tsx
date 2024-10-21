import { render } from "vitest-browser-react";
import { expect, test, vi, afterEach, describe } from "vitest";
import { AppProvider } from "@components/App/AppProvider";
import { HeroNode } from "@components/Tables/Graphs/Nodes/HeroNode";
import { THero } from "@utils/types/types";

describe("HeroNode Component", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders hero data correctly", () => {
        const mockHero = {
            id: 1,
            name: "Luke Skywalker",
            mass: "77",
            height: "172"
        };

        const { getByTestId, getByText } = render(
            <AppProvider>
                <HeroNode hero={mockHero as THero} />
            </AppProvider>
        );

        expect(getByTestId("hero-node")).toBeTruthy();
        expect(getByTestId("hero-image")).toBeTruthy();
        expect(getByTestId("hero-name")).toBeTruthy();
        expect(getByText("Luke Skywalker")).toBeTruthy();
        expect(getByTestId("hero-mass")).toBeTruthy();
        expect(getByText("77")).toBeTruthy();
        expect(getByTestId("hero-height")).toBeTruthy();
        expect(getByText("172")).toBeTruthy();
    });
});
