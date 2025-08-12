const express = require('express');
const { register, login, logout, googleOAuth, googleOAuthCallback, me, requestResetPassword, resetPasswordByEmail } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/oauth/google', googleOAuth);
router.get('/oauth/google/callback', googleOAuthCallback); // This should handle the callback from Google
router.get('/me', authMiddleware, me);
router.post('/request/reset-password', requestResetPassword); // Endpoint to request a password reset
router.post('/reset-password', resetPasswordByEmail); // Endpoint to reset the password using the token

module.exports = router;
