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
