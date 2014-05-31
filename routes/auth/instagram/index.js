exports = module.exports = function (express, middleware, handlers, path) {
    var router = express();

    router.use(path, require('./connect')(express, middleware, handlers, '/connect'));
    router.use(path, require('./callback')(express, middleware, handlers, '/callback'));
    router.use(path, require('./unlink')(express, middleware, handlers, '/unlink'));

    return router;
};