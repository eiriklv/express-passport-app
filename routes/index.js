exports = module.exports = function (app, express, handlers, config) {
    require('./app')(app, express, handlers.middleware, handlers.app, '/');
    require('./auth')(app, express, handlers.middleware, handlers.auth, '/auth');
    require('./api')(app, express, handlers.middleware, handlers.api, config.get('client.api.path'));
};