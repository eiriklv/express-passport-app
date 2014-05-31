exports = module.exports = function (services) {
    return {
        get: require('./get')(services.resource),
        remove: require('./remove')(services.resource),
        edit: require('./edit')(services.resource),
        create: require('./create')(services.resource)
    };
};