exports = module.exports = function(profile) {
    return function(req, res, next) {
        profile.reset(req, function (err, user) {
            if (err) {
                req.flash('errorMessage', err.message);
                res.redirect('/auth/local/reset');
            }
            else {
                req.flash('resetMessage', 'Password updated!');
                res.redirect('/auth/local/login');
            }
        });
    };
};