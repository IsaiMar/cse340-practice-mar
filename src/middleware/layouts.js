import { renderFile } from 'ejs';
import path from 'path';
 
/**
* Middleware to automatically wrap EJS views in a layout.
* This replicates `express-ejs-layouts` behavior in pure EJS.
* 
* @param {object} options - Configuration options
* @param {string} options.layoutDir - The directory containing layout files
* @param {string} [options.defaultLayout='default'] - The default layout filename (without .ejs)
* @returns {Function} Express middleware function
*/
const layoutMiddleware = ({ layoutDir, defaultLayout = 'default' }) => {
    // Remove .ejs extension from the default layout filename if present
    defaultLayout = defaultLayout.replace(/\.ejs$/, '');
 
    return (req, res, next) => {
        // Save the original res.render method for later use
        const originalRender = res.render;
 
        /**
        * Override `res.render()` to apply layouts automatically.
        * This allows calling `res.render('home')` without specifying the layout.
        */
        res.render = function (view, options = {}, callback) {
            // If layout is explicitly set to `false`, render the view normally without a layout
            if (options.layout === false) {
                originalRender.call(res, view, options, callback);
                return;
            }
 
            // Resolve the full path of the requested view
            const viewPath = path.join(res.app.get('views'), `${view}.ejs`);
 
            // First, render the requested view to get its content
            renderFile(viewPath, options, (err, body) => {
                if (err) {
                    next(err); // Pass any rendering errors to Express error handler
                    return;
                }
 
                // Store the rendered content in `options.body`, so the layout can use it
                options.body = body || '';
 
                // Determine which layout to use (default layout or a custom one if specified)
                const layoutFile = `${options.layout || defaultLayout}.ejs`;
                const layoutPath = path.join(layoutDir, layoutFile);
 
                // Render the selected layout, passing the rendered view content
                originalRender.call(res, layoutPath, options, callback);
            });
        };
 
        // Proceed to the next middleware in the stack
        next();
    };
};
 
export default layoutMiddleware;