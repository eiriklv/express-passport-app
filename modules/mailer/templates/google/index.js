exports = module.exports = function (service) {
    return {
        signup: require('./signup')(service),
        link: require('./link')(service)
    };
};