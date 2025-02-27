import dbPromise from '../database/index.js';
 
const getNavigationLinks = async () => {
    const db = await dbPromise;
    const links = await db.all('SELECT * FROM navigation');
    return links;
};
 
export { getNavigationLinks };