exports = module.exports = function(comments) {
    return {
        get: require('./get')(comments),
        remove: require('./remove')(comments),
        edit: require('./edit')(comments),
        create: require('./create')(comments)
    };
};
