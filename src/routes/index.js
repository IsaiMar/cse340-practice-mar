import { Router } from 'express';
 
const router = Router();
 
// The home page route
router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});
 
export default router;