exports = module.exports = function (Comment, helpers) {
    return {
        get: require('./get')(Comment, helpers),
        remove: require('./remove')(Comment, helpers),
        create: require('./create')(Comment, helpers),
        edit: require('./edit')(Comment, helpers)
    };
};