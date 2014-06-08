exports = module.exports = function (service) {
    return {
        link: require('./link')(service)
    };
};