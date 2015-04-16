exports = module.exports = function() {
    return {
        isAuthenticatedServer: require('./is-authenticated-server')(),
        isLoggedIn: require('./is-logged-in')(),
        isLoggedInAPI: require('./is-logged-in-api')(),
        isVerified: require('./is-verified')()
    };
};
