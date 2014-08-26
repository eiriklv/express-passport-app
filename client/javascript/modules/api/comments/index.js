exports = module.exports = function(request, path) {
    return {
        get: require('./get')(request, path),
        create: require('./create')(request, path),
        update: require('./update')(request, path),
        remove: require('./remove')(request, path)
    };
};
