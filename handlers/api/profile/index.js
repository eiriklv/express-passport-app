exports = module.exports = function (services) {
    return {
        get: require('./get')(services.profile),
        update: require('./update')(services.profile)
    };
};