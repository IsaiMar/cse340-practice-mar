import { Router } from 'express';
import { storeUserMessage } from '../../models/contact/index.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('contact/index', { title: 'Contact Us'});
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    if (!name || !email || !message) {
        req.flash('error', 'All fields are required.');
        res.redirect('/contact');
        return;
    }
    await storeUserMessage(name, email, message);
    req.flash('success', 'Your message has been sent.');
    res.redirect('/contact');
})

export default router;