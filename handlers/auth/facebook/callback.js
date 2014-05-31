exports = module.exports = function (passport) {
	return function (req, res, next) {
        passport.authenticate('facebook', {
            successRedirect: req.session.redirect || '/home',
            failureRedirect: req.session.redirect || '/',
            failureFlash: true // allow flash message
        })(req, res, next);
    };
};