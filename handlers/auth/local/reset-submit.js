exports = module.exports = function(profile) {
    return function(req, res, next) {
        profile.reset(req, function (err, user) {
            if (req.accepts('json')) {
                // treat as an API request
                if (err) {
                    res.status(400).send({ error: err });
                }
                else {
                    console.log("JSON 200");
                    res.status(200).send();
                }
            }
            else {
                if (err) {
                    req.flash('errorMessage', err.message);
                    res.redirect('/auth/local/reset');
                }
                else {
                    req.flash('resetMessage', 'Password updated!');
                    res.redirect('/auth/local/login');
                }
            }
        });
    };
};
