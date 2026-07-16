import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { pluginJsonServer as jsonServer } from "vite-plugin-json-server";

import { authPlugin } from "./server/authPlugin.ts";
import { bookingsPlugin } from "./server/bookingsPlugin.ts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    authPlugin(),
    bookingsPlugin(),
    jsonServer({
      apiPath: "/api",
      profile: "server",
      source: "db.json",
    }),
  ],
});
