exports = module.exports = function (Resource, helpers) {
    return {
        get: require('./get')(Resource, helpers),
        remove: require('./remove')(Resource, helpers),
        create: require('./create')(Resource, helpers),
        edit: require('./edit')(Resource, helpers)
    };
};