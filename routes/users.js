const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Users
router.get('/', (req, res, next) => {
    res.send('USERS');
});

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, function(err, user) {
        if(err) {
            res.json(
                {
                    success: false,
                    msg: "Failed to register user!"
                }
            );
        } else {
            res.json(
                {
                    success: true,
                    msg: "User registered!"
                }
            );
        }
    });

});

// Authenticate by checking if the user exists. If true, then compare passwords.
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if user exists
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        // We compare the passwords. If we get a match, a token will be assigned
        User.comparePasswords(password, user.password, function(err, isMatch) {
            if(err) throw err;
            if(isMatch){

                console.log("user: ", user);

                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week (in seconds) before the token expires. Can be anything.
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });

    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

module.exports = router;