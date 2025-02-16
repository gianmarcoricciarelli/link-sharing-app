import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    root: './src',
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@icons': path.resolve(__dirname, './src/assets/images'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@types': path.resolve(__dirname, './src/types'),
        },
    },
})
