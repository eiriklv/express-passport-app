exports = module.exports = function(app, express, middleware, handlers, path) {
    app.use(path, require('./resource')(express, middleware, handlers, '/resource'));
    app.use(path, require('./profile')(express, middleware, handlers, '/profile'));
};
