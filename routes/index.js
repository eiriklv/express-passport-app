var config = require('config');
var express = require('express');

exports = module.exports = function(app, handlers) {
    require('./app')(app, express, handlers.middleware, handlers.app, '/');
    require('./auth')(app, express, handlers.middleware, handlers.auth, '/auth');
    require('./api')(app, express, handlers.middleware, handlers.api, config.get('client.api.path'));
};
