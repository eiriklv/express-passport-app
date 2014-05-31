exports = module.exports = function (express, middleware, handlers, path) {
    var router = express();

    router.route(path)
        .all(middleware.isLoggedIn)
        .all(middleware.isVerified)
        .get(handlers.home);

    return router;
};