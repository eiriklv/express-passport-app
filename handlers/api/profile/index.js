exports = module.exports = function(profile) {
    return {
        get: require('./get')(profile),
        update: require('./update')(profile)
    };
};
