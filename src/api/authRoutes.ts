import express, { Router } from 'express';
import passport from 'passport';

const router = Router();

// Route pour démarrer l'authentification avec Discord
router.get('/login', passport.authenticate('discord'));

// Route de callback
router.get(
    '/callback',
    passport.authenticate('discord', {
        failureRedirect: '/',
        successRedirect: '/',
    })
);

// Route pour déconnecter l'utilisateur
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

export default router;