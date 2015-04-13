exports = module.exports = function(profile) {
    return function(req, res, next) {

        profile.forgot(req, function (err, user) {
            if (req.accepts('json')) {
                // treat as an API request
                if (err) {
                    res.send(400, { error: err });
                }
                else {
                    res.send(200, { token: user.resetPasswordToken });
                }
            }
            else {
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
            }
        });
    };
};
