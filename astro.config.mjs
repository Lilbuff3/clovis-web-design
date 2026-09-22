import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://cloviswebdesign.com",
  integrations: [preact()],
  vite: { plugins: [tailwindcss()] },
});
