// src/utils/utils.test.ts
import { expect, test } from "vitest";
import { getMappedColor, validateField } from "@utils/functions/validation/heroes.table"; // Adjust the path as needed
import { EYE_COLOR_MAP, HAIR_COLOR_MAP } from "@utils/constants/helpers.constants";

// Tests for getMappedColor function
test("getMappedColor returns mapped hair color", () => {
    expect(getMappedColor("blond")).toBe(HAIR_COLOR_MAP.blond);
    expect(getMappedColor("auburn")).toBe(HAIR_COLOR_MAP.auburn);
    expect(getMappedColor("unknown")).toBe("transparent"); // Default case
});

test("getMappedColor returns mapped eye color", () => {
    expect(getMappedColor("green", true)).toBe(EYE_COLOR_MAP.green);
    expect(getMappedColor("blue-gray", true)).toBe(EYE_COLOR_MAP["blue-gray"]);
    expect(getMappedColor("none", true)).toBe("transparent"); // Default case
});

test("getMappedColor handles case insensitivity", () => {
    expect(getMappedColor("BROWN")).toBe(HAIR_COLOR_MAP.brown);
    expect(getMappedColor("HAZEL", true)).toBe(EYE_COLOR_MAP.hazel);
});

// Tests for validateField function
test("validateField returns '-' for unknown values", () => {
    expect(validateField("unknown")).toBe("-");
    expect(validateField("none")).toBe("-");
    expect(validateField("n/a")).toBe("-");
});

test("validateField returns original value for known values", () => {
    expect(validateField("blue")).toBe("blue");
    expect(validateField("green")).toBe("green");
    expect(validateField("Red")).toBe("Red"); // Case insensitivity
});
