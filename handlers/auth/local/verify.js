exports = module.exports = function(profile) {
    return function(req, res, next) {
        profile.verify(req, function(err) {
            if (req.accepts('json')) {
                // treat as an API request
                if (err) {
                    res.status(400).send({ error: err });
                }
                else {
                    res.status(200).send();
                }
            }
            else {
                if (err) {
                    req.flash('errorMessage', err.message);
                    res.redirect('/');
                } else {
                    req.flash('verificationMessage', 'Your e-mail is now verified!');
                    res.redirect('/');
                }
            }
        });
    };
};
