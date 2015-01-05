exports = module.exports = function(Resource) {
    return {
        get: require('./get')(Resource),
        remove: require('./remove')(Resource),
        create: require('./create')(Resource),
        edit: require('./edit')(Resource)
    };
};
