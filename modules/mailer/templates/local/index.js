exports = module.exports = function(service) {
    return {
        signup: require('./signup')(service),
        reset: require('./reset')(service),
        forgot: require('./forgot')(service)
    };
};
