// Import required modules using ESM import syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
 
// Import all other required modules: Route handlers, Middleware, etc.
import autoApplyLayout from './src/middleware/layouts.js';
import homeRoute from './src/routes/index.js';
 
// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
// Create an instance of an Express application
const app = express();
 
// Set EJS as the view engine and the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
 
// Serve static files from the public directory
app.use(express.static('public'));
 
// Apply the layout middleware to automatically wrap views in a layout
app.use(autoApplyLayout({
    layoutDir: path.join(__dirname, './src/views/layouts'),
    defaultLayout: 'default'
}));
 
// Use the home route for the root URL
app.use('/', homeRoute);
 
// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});