const express = require('express');
const { register, login, logout, googleOAuth, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/oauth/google', googleOAuth);
router.get('/me', authMiddleware, me);

module.exports = router;
