exports = module.exports = function (app, express, middleware, handlers) {
    require('./app')(app, express, middleware, handlers.app, '/');
    require('./auth')(app, express, middleware, handlers.auth, '/auth');
    require('./api')(app, express, middleware, handlers.api, '/api');
};