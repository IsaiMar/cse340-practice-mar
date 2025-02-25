// Import required modules using ESM import syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all other required modules: Route handlers, Middleware, etc.
import baseRoute from './src/routes/index.js';
import layouts from './src/middleware/layouts.js';
import configureStaticPaths from './src/middleware/static-paths.js';
import { notFoundHandler, globalErrorHandler } from './src/middleware/error-handler.js';
import configMode from "./src/middleware/config-mode.js";
 
// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
// Create an instance of an Express application
const app = express();
// const configMode = require("./src/middleware/config-mode");

// Configure static paths for the Express application
configureStaticPaths(app);
 
// Set EJS as the view engine and record the location of the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
 
// Set Layouts middleware to automatically wrap views in a layout and configure default layout
app.set('layout default', 'default');
app.set('layouts', path.join(__dirname, 'src/views/layouts'));
app.use(layouts);
app.use(configMode);

 
// Use the home route for the root URL
app.use('/', baseRoute);
 
// Apply error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);
 
// Start the server on the specified port
const PORT = process.env.PORT || 3000;
const mode = process.env.MODE || 'production';

// When in development mode, start a WebSocket server for live reloading
if (mode.includes('dev')) {
    const ws = await import('ws');
 
    try {
        const wsPort = parseInt(PORT) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });
 
        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });
 
        wsServer.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
    } catch (error) {
        console.error('Failed to start WebSocket server:', error);
    }
}
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});