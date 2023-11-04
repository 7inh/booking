import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";

// Custom plugin to load environment variables
const loadEnvVariables = () => ({
    name: "load-env-variables",
    configureServer: ({ middlewares }) => {
        middlewares.use(async (req, res, next) => {
            if (process.env.NODE_ENV === "production") {
                dotenv.config({ path: ".env" });
            } else {
                dotenv.config({ path: ".env.local" });
            }
            next();
        });
    },
});

export default defineConfig({
    plugins: [react(), loadEnvVariables()],
    resolve: {
        alias: {
            src: "/src",
        },
    },
    server: {
        host: true,
        port: 8089,
    },
    build: {
        outDir: path.resolve(__dirname, "dist"),
        emptyOutDir: true,
    },
});
