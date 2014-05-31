exports = module.exports = function (mongoose, validators) {
    return {
        User: require('./user')(mongoose, validators),
        VerificationToken: require('./verification-token')(mongoose, validators),
        Resource: require('./resource')(mongoose, validators)
    };
};
