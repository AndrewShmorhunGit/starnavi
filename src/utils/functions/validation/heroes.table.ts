import { EYE_COLOR_MAP, HAIR_COLOR_MAP } from "@utils/constants/helpers.constants";

export const getMappedColor = (color: string, isEyeColor = false): string => {
    const lowerColor = color.trim().toLowerCase();

    if (isEyeColor) {
        return EYE_COLOR_MAP[lowerColor] || "transparent"; // Default to transparent if no match
    }

    return HAIR_COLOR_MAP[lowerColor] || "transparent"; // Default to transparent if no match
};

// Function to display a "-" if the value is "unknown" or "none"
export const validateField = (field: string) =>
    field.toLowerCase() === "unknown" || field.toLowerCase() === "none" || field.toLowerCase() === "n/a" ? "-" : field;
