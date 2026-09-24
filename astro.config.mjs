import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://cloviswebdesign.com",
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Page scripts up to 10 KB go inline, so none costs a request of its own (the glasses' is about 6 KB). Everything
      // else keeps the default: under 4 KB inline, bigger gets a URL.
      assetsInlineLimit: (file, content) => (file.endsWith(".js") ? content.length < 10240 : undefined),
    },
  },
});
