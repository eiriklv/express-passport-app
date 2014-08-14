exports = module.exports = function (services, helpers) {
    return {
        landing: require('./landing')(),
        home: require('./home')(services, helpers),
        profile: require('./profile')(services),
        common: require('./common')(services)
    };
};