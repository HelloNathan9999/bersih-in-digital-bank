import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
}));
