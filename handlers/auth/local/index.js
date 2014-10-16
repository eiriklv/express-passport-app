exports = module.exports = function(services, passport) {
    return {
        login: require('./login')(),
        loginSubmit: require('./login-submit')(passport),
        signup: require('./signup')(),
        signupSubmit: require('./signup-submit')(passport),
        unlink: require('./unlink')(),
        verify: require('./verify')(services.profile)
    };
};
