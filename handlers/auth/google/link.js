exports = module.exports = function(passport) {
    return function(req, res, next) {
        req.session.redirect = req.headers.referer; // set the redirect to where you came from

        passport.authorize('google', {
            scope: ['profile', 'email']
        })(req, res, next);
    };
};
