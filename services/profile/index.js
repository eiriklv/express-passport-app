exports = module.exports = function (models, helpers) {
    return {
        update: require('./update')(models, helpers.common),
        verify: require('./verify')(models, helpers.common)
    };
};