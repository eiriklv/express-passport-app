exports = module.exports = function (services) {
    return {
        resource: require('./resource')(services.resource),
        comments: require('./comments')(services.comments),
        profile: require('./profile')(services.profile)
    };
};