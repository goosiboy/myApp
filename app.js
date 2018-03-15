const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const movies = require('./routes/movies');
const config = require('./config/database');
const passportConfig = require('./config/passport');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', function() {
    console.log('Connected to database ', config.database);
});

// On error
mongoose.connection.on('error', function(err) {
    console.log('Database error: ', err);
});

// Initialize Express
const app = express();

// Set a port, which will be used by Express.js
const port = 3000;

// Allow cross-origin resource sharing
app.use(cors());

// Apply body-parser middleware
app.use(bodyParser.json());

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

// Routes config
app.use('/users', users);
app.use('/movies', movies);

// Index Route
app.get('/', function(req, res) {
    res.send('Invalid Endpoint');
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Server started
app.listen(port, function () {
    console.log("Server started on " + port);
});