// export const TABLE_HEADERS = ["Name", "Height, cm", "Mass, kg", "Hair Color", "Eye Color"];

export const TABLE_HEADERS = (isMobile: boolean) =>
    isMobile ? ["Name", "Hair Color", "Eye Color"] : ["Name", "Height, cm", "Mass, kg", "Hair Color", "Eye Color"];
