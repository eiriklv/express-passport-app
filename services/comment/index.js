exports = module.exports = function(Comment) {
    return {
        get: require('./get')(Comment),
        remove: require('./remove')(Comment),
        create: require('./create')(Comment),
        edit: require('./edit')(Comment)
    };
};
