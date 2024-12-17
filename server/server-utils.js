import {createServer as createViteServer} from 'vite';

// Create Vite server for development
export async function setupViteDevServer() {
    if (process.env.NODE_ENV === "development") {
        console.log("dev mode...")
        return createViteServer({
            server: {middlewareMode: true},
        });
    } else {
        return null;
    }
}