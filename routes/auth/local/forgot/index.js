exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();

    router.route(path)
        .get(handlers.forgot)
        .post(handlers.forgotSubmit);

    return router;
};
