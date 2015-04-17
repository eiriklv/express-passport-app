exports = module.exports = function(services, passport) {
    return {
        reset: require('./reset')(),
        resetSubmit: require('./reset-submit')(services.profile),

        forgot: require('./forgot')(),
        forgotSubmit: require('./forgot-submit')(services.profile),

        signup: require('./signup')(),
        signupSubmit: require('./signup-submit')(passport),

        login: require('./login')(),
        loginSubmit: require('./login-submit')(passport),

        logout: require('./logout')(),
        
        unlink: require('./unlink')(services.profile),
        
        verify: require('./verify')(services.profile)
    };
};
