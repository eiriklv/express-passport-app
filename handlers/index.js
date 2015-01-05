exports = module.exports = function(passport, services) {
    return {
        app: require('./app')(services),
        auth: require('./auth')(services, passport),
        api: require('./api')(services),
        middleware: require('./middleware')()
    };
};
