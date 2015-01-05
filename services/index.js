exports = module.exports = function(models) {
    return {
        profile: require('./profile')(models),
        resource: require('./resource')(models.Resource),
        comments: require('./comment')(models.Comment)
    };
};
