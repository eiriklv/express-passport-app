exports = module.exports = function(services) {
    return {
        resource: require('./resource')(services.resource),
        profile: require('./profile')(services.profile)
    };
};
