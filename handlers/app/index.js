exports = module.exports = function(services) {
    return {
        landing: require('./landing')(),
        home: require('./home')(services),
        profile: require('./profile')(services),
        common: require('./common')(services)
    };
};
