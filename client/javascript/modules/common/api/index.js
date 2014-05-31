var request = require('superagent');

exports = module.exports = function (config) {
    return {
        resource: require('./resource')(request, config.api.url + '/resource'),
        profile: require('./profile')(request, config.api.url + '/profile')
    };
};