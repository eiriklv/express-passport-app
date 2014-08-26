exports = module.exports = function(models, helpers) {
    return {
        profile: require('./profile')(models, helpers),
        resource: require('./resource')(models.Resource, helpers),
        comments: require('./comment')(models.Comment, helpers)
    };
};
