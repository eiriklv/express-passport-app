exports = module.exports = function(models, mailer) {
    return {
        signup: require('./signup')(models.User, models.VerificationToken, mailer),
        login: require('./login')(models.User)
    };
};
