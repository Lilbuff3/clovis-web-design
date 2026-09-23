import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://cloviswebdesign.com",
  // Inline the CSS: removes two render-blocking requests before first paint.
  build: { inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
