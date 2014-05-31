exports = module.exports = function () {
	return function (req, res, next) {
         // if user is authenticated in the session but has no verified email, redirect to email verification
        if (req.isAuthenticated() && !req.user.verified) {
            req.flash('notVerified', 'You need to verify your email before you can have full use of the account');
            // return res.redirect('/'); // do redirection here
        }
        return next();
    };
};