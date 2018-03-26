// Imports
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const tmdb = require('./../models/tmdb.js');

// Invalid endpoint
router.get('/', function(req, res, next) {
    res.send("Invalid endpoint");
});

// Config - route
router.get('/config', function(req, res, next) {
    tmdb.getConfig(function(result) {
        res.json(result);
    });
});

// Popular - route
router.get('/popular', function(req, res, next) {
    tmdb.getPopular(function(result) {
        res.json(result);
    });
});

// Top - route
router.get('/top', function(req, res, next) {
    tmdb.getTopRated(function(result) {
        res.json(result);
    });
});

// Find - route
router.post('/find', function(req, res, next) {
    tmdb.findByID(req.body.id, function (result) {
        res.json(result);
    });
});

module.exports = router;
