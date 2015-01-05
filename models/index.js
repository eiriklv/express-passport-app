exports = module.exports = function(mongoose) {
    return {
        User: require('./user')('user', mongoose),
        VerificationToken: require('./verification-token')('verificationtoken', mongoose),
        Resource: require('./resource')('resource', mongoose),
        Comment: require('./comment')('comment', mongoose)
    };
};
