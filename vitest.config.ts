/// <reference types="vitest" />
import { defineConfig } from "vite";
import baseConfig from "./vite.config";

export default defineConfig({
    ...baseConfig,
    test: {
        browser: {
            enabled: true,
            name: "chromium",
            provider: "playwright"
        }
    },
    server: {
        port: 3030,
        fs: {
            strict: false
        }
    }
});
