exports = module.exports = function(profile) {
    return function(req, res, next) {
        profile.verify(req, function(err) {
            if (err) {
                req.flash('errorMessage', err.message);
                res.redirect('/');
            } else {
                req.flash('verificationMessage', 'Your e-mail is now verified!');
                res.redirect('/');
            }
        });
    };
};
