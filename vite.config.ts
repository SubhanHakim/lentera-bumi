import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/preview/",
  server: {
    proxy: {
      '/api/lbn': {
        target: 'https://lenterabumi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/lbn/, '/data'),
        secure: true,
      },
      '/api/wp': {
        target: 'https://lenterabumi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wp/, '/wp-json'),
        secure: true,
      },
    },
  },
})


