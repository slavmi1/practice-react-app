import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { pluginJsonServer as jsonServer } from "vite-plugin-json-server";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    jsonServer({
      apiPath: "/api",
      profile: "server",
      source: "db.json",
    }),
  ],
});
