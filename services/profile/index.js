exports = module.exports = function(models, mailer) {
    return {
        forgot: require('./forgot')(models, mailer),
        reset: require('./reset')(models, mailer),
        update: require('./update')(models),
        verify: require('./verify')(models)
    };
};
