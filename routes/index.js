var config = require('config');
var express = require('express');

exports = module.exports = function(app, handlers) {
    require('./auth')(app, express, handlers.middleware, handlers.auth, '/auth');
    require('./api')(app, express, handlers.middleware, handlers.api, config.get('client.api.path'));

    app.get('/', function (req, res) {
        var user = null;
        if (req.user) {
          user = req.user.dataValues;
        }
        res.render('index', {user: user});
    });
};
