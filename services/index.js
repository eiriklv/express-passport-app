exports = module.exports = function(models, mailer) {
    return {
        profile: require('./profile')(models, mailer),
        resource: require('./resource')(models.Resource)
    };
};
