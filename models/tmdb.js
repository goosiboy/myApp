// Imports
const config = require('./../config/config.js');
const fetch = require('node-fetch');

let baseURL = 'https://api.themoviedb.org/3/';

// Object that contains the fetched configuration data
let configData = {
    error: null,
    imageData: null
};

// Gets the config data from the API
module.exports.getConfig = function (callback) {
    let url = "".concat(baseURL, 'configuration?api_key=', config.api_key);
    fetch(url)
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            configData.imageData = data.images;
            callback(configData);
        })
        .catch(function (err) {
            configData.error = err;
            callback(configData);
        });
}

// Gets the 'popular movies' - data from the API
module.exports.getPopular = function (callback) {
    let url = ''.concat(baseURL, 'movie/popular?api_key=', config.api_key, '&language=en-US&page=1');
    fetch(url)
        .then(result => result.json())
        .then((data) => {

            callback(data);

        })
}

// Gets the highest rated movies - data from the API
module.exports.getTopRated = function (callback) {
    let url = ''.concat(baseURL, 'movie/top_rated?api_key=', config.api_key, '&language=en-US&page=1');
    fetch(url)
        .then(result => result.json())
        .then((data) => {

            callback(data);

        })
}

// Implements a basic search functionality for movies by their ID. Looks from two different databases, if one returns nothing.
// TODO: Unoptimized and not tested! Fix before release!
module.exports.findByID = function (external_id, callback) {
    let url1 = ''.concat(baseURL, 'find/', external_id, '?api_key=', config.api_key, '&language=en-US&external_source=tvdb_id');
    let url2 = ''.concat(baseURL, 'find/', external_id, '?api_key=', config.api_key, '&language=en-US&external_source=imdb_id');

    // Fetch from the first URL
    fetch(url1)
        .then(result => result.json())
        .then((data) => {

            // Finds all the data and combines them
            const combined = data.movie_results.concat(
                data.person_results,
                data.tv_results,
                data.tv_episode_results,
                data.tv_season_results
            );

            // If the length is higher than 0, means not empty -> Return the result with callback.
            if(combined.length > 0) {
                callback(data);
            } else { // Else search from the other URL
                fetch(url2)
                    .then(result => result.json())
                    .then((data) => {
                        callback(data);
                    })
            }

        })
}