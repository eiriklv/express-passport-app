exports = module.exports = function(profile) {
    return function(req, res, next) {
        profile.forgot(req, function (err, user) {
            if (err) {
                req.flash('errorMessage', err.message);
            }
            else {
                req.flash('forgotMessage', 'Please check your email for further directions.');

                if (process.env.NODE_ENV === 'development') {
                    process.user = user.dataValues;
                }
            }

            res.redirect('/');
        });
    };
};
