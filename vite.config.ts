import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [react(), VitePWA()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@svgs": path.resolve(__dirname, "./src/assets/svgs"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@providers": path.resolve(__dirname, "./src/providers"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@api": path.resolve(__dirname, "./src/api")
        }
    },
    build: {
        outDir: path.resolve(__dirname, "./dist")
    },
    preview: {
        port: 3000,
        open: true
    },
    server: {
        host: true,
        port: 3000,
        open: true
    }
});
