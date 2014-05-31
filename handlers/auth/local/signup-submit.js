exports = module.exports = function (passport) {
	return function (req, res, next) {
        passport.authenticate('local-signup', {
            successRedirect: '/home', // redirect to the secure profile section
            failureRedirect: '/auth/local/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })(req, res, next);
    };
};