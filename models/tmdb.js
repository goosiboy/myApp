const config = require('./../config/config.js');
const fetch = require('node-fetch');

let baseURL = 'https://api.themoviedb.org/3/';
let configData = {
    error: null,
    imageData: null
};

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

module.exports.getPopular = function (callback) {
    let url = ''.concat(baseURL, 'movie/popular?api_key=', config.api_key, '&language=en-US&page=1');
    fetch(url)
        .then(result => result.json())
        .then((data) => {

            callback(data);

        })
}

module.exports.getTopRated = function (callback) {
    let url = ''.concat(baseURL, 'movie/top_rated?api_key=', config.api_key, '&language=en-US&page=1');
    fetch(url)
        .then(result => result.json())
        .then((data) => {

            callback(data);

        })
}

module.exports.findByID = function (external_id, callback) {
    let url1 = ''.concat(baseURL, 'find/', external_id, '?api_key=', config.api_key, '&language=en-US&external_source=tvdb_id');
    let url2 = ''.concat(baseURL, 'find/', external_id, '?api_key=', config.api_key, '&language=en-US&external_source=imdb_id');
    fetch(url1)
        .then(result => result.json())
        .then((data) => {

            const combined = data.movie_results.concat(
                data.person_results,
                data.tv_results,
                data.tv_episode_results,
                data.tv_season_results
            );

            if(combined.length > 0) {
                callback(data);
            } else {
                fetch(url2)
                    .then(result => result.json())
                    .then((data) => {
                        callback(data);
                    })
            }

        })
}