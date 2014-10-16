exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();

    router.use(path, middleware.isLoggedIn);
    router.use(path, middleware.isVerified);

    router.route(path)
        .get(handlers.profile);

    return router;
};
