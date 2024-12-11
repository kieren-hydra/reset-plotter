import express from 'express';
import { loadEnvironmentVariables, setupViteDevServer, __dirname, path } from './server-utils.js';
import apiRoutes from './routes/api-routes.js'

loadEnvironmentVariables();

const viteDevServer = await setupViteDevServer();

const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

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

