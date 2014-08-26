exports = module.exports = function(passport) {
    return function(req, res, next) {
        req.session.redirect = undefined;

        passport.authenticate('google', {
            scope: ['profile', 'email']
        })(req, res, next);
    };
};
