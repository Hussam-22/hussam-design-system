import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwind()],
  publicDir: false,
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
      cssFileName: "hds",
    },
    rollupOptions: {
      external: (id) =>
        /^(react|react-dom|three|gsap|lucide-react|radix-ui|clsx|tailwind-merge|class-variance-authority)(\/|$)/.test(
          id,
        ),
    },
  },
});
