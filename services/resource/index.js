exports = module.exports = function (models) {
    return {
        get: require('./get')(models.Resource),
        remove: require('./remove')(models.Resource),
        create: require('./create')(models.Resource),
        edit: require('./edit')(models.Resource)
    };
};