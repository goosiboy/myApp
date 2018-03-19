const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const tmdb = require('./../models/tmdb.js');

router.get('/', function(req, res, next) {
    res.send("Invalid endpoint");
});

router.get('/config', function(req, res, next) {
    tmdb.getConfig(function(result) {
        res.json(result);
    });
});

router.get('/popular', function(req, res, next) {
    tmdb.getPopular(function(result) {
        res.json(result);
    });
});

router.get('/top', function(req, res, next) {
    tmdb.getTopRated(function(result) {
        res.json(result);
    });
});

router.post('/find', function(req, res, next) {
    tmdb.findByID(req.body.id, function (result) {
        res.json(result);
    });
});

module.exports = router;
