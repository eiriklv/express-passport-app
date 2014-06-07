exports = module.exports = function (mongoose, validators) {
    return {
        User: require('./user')('user', mongoose, validators),
        VerificationToken: require('./verification-token')('verificationtoken', mongoose, validators),
        Resource: require('./resource')('resource', mongoose, validators)
    };
};
