import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    root: './src',
    plugins: [react(), svgr(), tailwindcss()],
    resolve: {
        alias: {
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@customTypes': path.resolve(__dirname, './src/types'),
            '@icons': path.resolve(__dirname, './src/assets/images'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@ui': path.resolve(__dirname, './src/ui'),
            '@widgets': path.resolve(__dirname, './src/widgets')
        }
    }
})
