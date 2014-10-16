exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();

    router.use(path, require('./login')(express, middleware, handlers, '/login'));
    router.use(path, require('./signup')(express, middleware, handlers, '/signup'));
    router.use(path, require('./unlink')(express, middleware, handlers, '/unlink'));
    router.use(path, require('./verify')(express, middleware, handlers, '/verify'));

    return router;
};
