exports = module.exports = function (app, express, middleware, handlers, config) {
    require('./app')(app, express, middleware, handlers.app, '/');
    require('./auth')(app, express, middleware, handlers.auth, '/auth');
    require('./api')(app, express, middleware, handlers.api, config.get('client.api.path'));
};