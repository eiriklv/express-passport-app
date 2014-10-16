exports = module.exports = function(express, middleware, handlers, path) {
    var router = express();
    
    router.use(path, middleware.isLoggedIn);

    router.route(path)
        .get(handlers.link);

    return router;
};
