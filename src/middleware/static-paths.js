import express from 'express';
import path from 'path';
 
/** @type {Array<{route: string, dir: string}|string>} Static path configurations */
const staticPaths = [
    { route: '/css', dir: 'public/css' },
    { route: '/js', dir: 'public/js' },
    { route: '/images', dir: 'public/images' }
];
 
/**
* Configures static paths for the given Express application.
*
* @param {Object} app - The Express application instance.
*/
const configureStaticPaths = (app) => {
    // Track registered paths
    const registeredPaths = new Set(app.get('staticPaths') || []);
 
    staticPaths.forEach((pathConfig) => {
        const pathKey = typeof pathConfig === 'string' ? pathConfig : pathConfig.route;
 
        if (!registeredPaths.has(pathKey)) {
            registeredPaths.add(pathKey);
 
            if (typeof pathConfig === 'string') {
                // Register the path directly
                app.use(pathConfig, express.static(pathConfig));
            } else {
                // Register the path with the specified route and directory
                app.use(pathConfig.route, express.static(path.join(process.cwd(), pathConfig.dir)));
            }
        }
    });
 
    // Update the app settings with the newly registered paths
    app.set('staticPaths', Array.from(registeredPaths));
};
 
export default configureStaticPaths;