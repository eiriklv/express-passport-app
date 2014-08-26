exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();

    router.route(path)
        .all(middleware.isLoggedInAPI)
        .all(middleware.isVerified)
        .get(handlers.profile.get)
        .put(handlers.profile.update);

    return router;
};
