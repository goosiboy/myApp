const express = require('express');
const router = express.Router();

// Users
router.get('/', (req, res, next) => {
    res.send('USERS');
});

// Register
router.post('/register', (req, res, next) => {
    res.send('REGISTER');
});

// Authenticate
router.post('/auth', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;