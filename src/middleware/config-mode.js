// src/middleware/config-mode.js

const isDevMode = process.env.NODE_ENV !== "production";
const configMode = (req, res, next) => {
    res.locals.scripts = []; // Initialize an empty array for scripts
    res.locals.styles = [];  // Initialize an empty array for styles
    res.locals.isDevMode = isDevMode; // Expose development mode flag
    res.locals.devModeMsg = isDevMode ? "🚧 Development Mode: This site is still under development. 🚀" : "";

    // Function to add scripts dynamically
    res.addScript = (src) => {
        if (!res.locals.scripts.includes(src)) {
            res.locals.scripts.push(src);
        }
    };

    // Function to add styles dynamically
    res.addStyle = (href) => {
        if (!res.locals.styles.includes(href)) {
            res.locals.styles.push(href);
        }
    };

    // If in development mode, add live reload script
    if (isDevMode) {
        const port = process.env.PORT || 3000; // Ensure the port is correctly set
        res.locals.scripts.push(`
            <script>
                const ws = new WebSocket('ws://127.0.0.1:${parseInt(port) + 1}');
                ws.onclose = () => {
                    setTimeout(() => location.reload(), 2000);
                };
            </script>   
        `);
    }

    next();
};

export default configMode;