exports = module.exports = function(models, mailer) {
    return {
        forgot: require('./forgot')(models.User, mailer),
        reset: require('./reset')(models.User, mailer),
        update: require('./update')(models),
        changePassword: require('./change-password')(models),
        unlink: require('./unlink')(models),
        verify: require('./verify')(models)
    };
};
