exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();

    router.use(path, middleware.isLoggedInAPI);
    router.use(path, middleware.isVerified);

    router.route(path)
        .get(handlers.comments.get)
        .put(handlers.comments.edit)
        .post(handlers.comments.create)
        .delete(handlers.comments.remove);

    return router;
};
