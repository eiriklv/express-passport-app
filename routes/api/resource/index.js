exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();

    router.use(path, middleware.isLoggedInAPI);
    router.use(path, middleware.isVerified);

    router.route(path)
        .get(handlers.resource.get)
        .put(handlers.resource.edit)
        .post(handlers.resource.create)
        .delete(handlers.resource.remove);

    return router;
};
