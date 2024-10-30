function getEnvVar(key: string): string {
    const value = import.meta.env[key];
    if (typeof value === "undefined") {
        throw new Error(`Environment variable ${key} is not defined!`);
    }
    return value;
}

enum VITE {
    API_URL = "VITE_API_URL"
}

export const API_URL = getEnvVar(VITE.API_URL);
