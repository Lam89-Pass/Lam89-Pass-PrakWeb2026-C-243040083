import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import HelloWorld from './src/hello world/HelloWorld'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        helloWorld: "hello-world.html",
      },
    },
  },
});