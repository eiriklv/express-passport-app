exports = module.exports = function (passport, services, helpers) {
    return {
        app: require('./app')(services, helpers),
        auth: require('./auth')(services, passport),
        api: require('./api')(services),
        middleware: require('./middleware')()
    };
};