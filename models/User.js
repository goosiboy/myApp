const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create model
const User = mongoose.model('User', UserSchema);

// Export model User
module.exports = User;

// Find user by mongoose ID
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

// Find user by email address
module.exports.getUserByEmail = function(email, callback) {
    const query = {
        email: email
    };
    User.findOne(query, callback);
};

// Add a new user. Users password is hashed with bcrypt.
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// Compare passwords
module.exports.comparePasswords = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}