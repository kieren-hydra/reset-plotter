import express from 'express';
import {setupViteDevServer} from './server-utils.js';
import apiRoutes from './routes/api-routes.js'
import dotenv from "dotenv";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

dotenv.config({path: path.resolve(__dirname, '../.env')});

const viteDevServer = await setupViteDevServer();

const app = express();

//routes
app.use('/api', apiRoutes);

// Handle React files
if (viteDevServer) {
    app.use(viteDevServer.middlewares);
} else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(indexPath));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

