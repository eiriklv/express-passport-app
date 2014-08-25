exports = module.exports = function (services, helpers) {
    return {
        landing: require('./landing')(),
        home: require('./home')(services, helpers),
        profile: require('./profile')(services, helpers),
        common: require('./common')(services)
    };
};