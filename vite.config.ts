import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
<<<<<<< HEAD
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000, // 🔁 GANTI PORT DARI 8082 KE 3000
    strictPort: false, // 🔁 Ubah jadi false biar kalau 3000 dipakai, otomatis pindah ke port lain
    watch: {
      usePolling: false,
      interval: 1000,
      ignored: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/.git/**",
        "**/coverage/**",
        "**/tmp/**",
        "**/temp/**",
      ],
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
=======
import { componentTagger } from "./rubixstudio-tagger/index";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
=======
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
}));
