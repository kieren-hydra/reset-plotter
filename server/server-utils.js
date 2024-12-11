import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
export function loadEnvironmentVariables() {
    if (!process.env.NODE_ENV) {
        console.log('Falling back to production environment variables');
        dotenv.config({ path: path.resolve(__dirname, '../.env.production') });
    }
}

// Create Vite server for development
export async function setupViteDevServer() {
    if (process.env.NODE_ENV === "production") return null;
    return createViteServer({
        server: { middlewareMode: true },
    });
}

// Export __dirname and other utilities
export { __dirname, path };
