exports = module.exports = function() {
    return {
        isLoggedIn: require('./is-logged-in')(),
        isLoggedInAPI: require('./is-logged-in-api')(),
        isVerified: require('./is-verified')()
    };
};
