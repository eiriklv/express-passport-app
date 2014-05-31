exports = module.exports = function (models, helpers) {
    return {
        profile: require('./profile')(models, helpers),
        resource: require('./resource')(models, helpers)
    };
};