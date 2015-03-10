exports = module.exports = function(sequelize) {
    return {
        User: require('./user')('user', sequelize),
        VerificationToken: require('./verification-token')('verificationtoken', sequelize),
        Resource: require('./resource')('resource', sequelize)
    };
};
