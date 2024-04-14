import express, { Router, Request, Response } from "express";
import passport from 'passport';
const router: Router = express.Router();


router.get('/github', passport.authenticate('github', {scope: ['profile']}))

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/')
    }
)

export default router;