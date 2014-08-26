exports = module.exports = function(resource) {
    return {
        get: require('./get')(resource),
        remove: require('./remove')(resource),
        edit: require('./edit')(resource),
        create: require('./create')(resource)
    };
};
