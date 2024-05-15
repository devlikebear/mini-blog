import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

dotenv.config();

export default {
    plugins: [sveltekit()],
    server: {
		port: 3000,
        proxy: {
            '/api': {
                target: process.env.VITE_BACKEND_URL,
                changeOrigin: true,
                secure: false
            }
        }
    }
};
