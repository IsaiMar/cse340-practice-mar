import { Router } from 'express';
 
const router = Router();
 
// The home page route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});
 
export default router;