import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/recipez/",
  build: {
    outDir: "build",
  },
  server: {
    host: true,
    open: true,
  },
  plugins: [react()],
});
