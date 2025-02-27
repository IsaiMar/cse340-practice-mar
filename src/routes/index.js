import { Router } from 'express';
import { getNav } from '../utils/index.js';
 
const router = Router();
 
// The home page route
router.get('/', async (req, res) => {
    const nav = await getNav();
    res.render('index', { title: 'Home Page', nav });
});
 
// About page route
router.get('/about', async (req, res) => {
    const nav = await getNav();
    res.render('about', { title: 'About Page', nav });
});
 
export default router;