exports = module.exports = function(profile) {
    return function(req, res, next) {

        profile.forgot(req, function (err, user) {
            // Don't freak out, this is only for testing
            if (process.env.NODE_ENV === 'development') {
                process.user = user.dataValues;
            }
            
            if (req.accepts('json')) {
                // treat as an API request
                if (err) {
                    res.status(400).send({ error: err });
                }
                else {
                    res.status(200).send({ token: user.resetPasswordToken });
                }
            }
            else {
                if (err) {
                    req.flash('errorMessage', err.message);
                }
                else {
                    req.flash('forgotMessage', 'Please check your email for further directions.');
                }

                res.redirect('/');
            }
        });
    };
};
