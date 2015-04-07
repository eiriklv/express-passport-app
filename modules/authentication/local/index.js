exports = module.exports = function(models, mailer) {
    return {
        signup: require('./signup')(models.User, models.VerificationToken, mailer),
        reset: require('./reset')(models.User, mailer),
        login: require('./login')(models.User)
    };
};
