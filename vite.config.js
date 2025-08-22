import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
server: {
port: 5173,
open: false,
host: true,
},
preview: {
port: 5173,
host: true,
},
test: {
environment: 'jsdom',
globals: true,
setupFiles: './src/test/setupTests.js',
css: true,
coverage: {
reporter: ['text', 'html'],
reportsDirectory: './coverage',
},
},
});