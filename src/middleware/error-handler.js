import path from 'path';
import fs from 'fs';
 
/**
 * Ensures that an error view exists; otherwise, defaults to a generic error page.
 * 
 * @param {string} possible - The expected error view path
 * @returns {string} Verified path
 */
const getVerifiedViewPath = (possible) => {
    if (fs.existsSync(possible)) {
        return possible;
    }
    return path.join(path.dirname(possible), 'error.ejs');
};
 
/**
 * Middleware to handle 404 Not Found errors.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const notFoundHandler = (req, res, next) => {
 
    const isStaticFile = req.app.get('staticPaths').some((staticPath) => {
        return req.url.startsWith(staticPath) }
    );
 
    // If this is a static resource send back 404 now and do not attempt to load an error page
    if (isStaticFile) {
        res.status(404).end();
        return;
    }
 
    const title = 'Page Not Found';
    const error = new Error(title);
    error.title = title;
    error.status = 404;
 
    // Set error state so downstream middleware knows this is an error
    if (!res.locals.isInErrorState) {
        res.locals.isInErrorState = true;
    }
    next(error);
};
 
/**
 * Global error handling middleware.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const globalErrorHandler = (err, req, res, next) => {
    // Ensure we are in an error state
    if (!res.locals.isInErrorState) {
        res.locals.isInErrorState = true;
        res.locals.errorRenderCount = 0;
    }
 
    /**
     * If the response has already been sent, prevent double rendering. This can happen if the
     * process of rendering an error triggers an error itself.
     */
    if (res.headersSent) {
        // console.warn(`Attempted to render again for: ${req.url}`);
        return;
    }
 
    // Track the number of renders while in error state
    res.locals.errorRenderCount++;
 
    // Get the configured render limit (default to 2 if not set)
    const maxErrorRenders = req.app.get('errorRenderLimit') || 2;
 
    // If we are in an error state and tried rendering too many times, return plain text
    if (res.locals.errorRenderCount >= maxErrorRenders) {
        res.status(res.statusCode || 500)
            .type('text/plain')
            .send(`Critical error: Unable to render error page.\n\n${err.message}\n${err.stack}`);
        return;
    }
 
    // Set response status code based on the error
    const status = err.status || 500;
    res.status(status);
 
    // Prepare error context for rendering
    const context = {
        title: err.title || 'Error',
        error: err.message,
        status
    };
 
    // Determine the correct error view file
    const possibleViewPath = path.join(req.app.get('views'), `errors/${status}.ejs`);
    const verifiedViewPath = getVerifiedViewPath(possibleViewPath);
 
    // Render the error page using the standard layout system
    res.render(verifiedViewPath, context);
};