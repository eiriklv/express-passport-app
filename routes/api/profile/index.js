exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();

    router.use(path, middleware.isLoggedInAPI);
    router.use(path, middleware.isVerified);

    router.route(path)
        .get(handlers.profile.get)
        .post(handlers.profile.update);

    return router;
};
