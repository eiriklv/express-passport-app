exports = module.exports = function(services) {
    return {
        common: require('./common')(services)
    };
};
