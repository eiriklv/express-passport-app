exports = module.exports = function(User, mailer) {
    return function(req, token, refreshToken, profile, done) {
        User.findOne({
            'google.id': profile.id
        }, function(err, user) {
            if (err) return done(err);
            if (user) return done(null, req.user, req.flash('errorMessage', 'This Google account is already linked to an account in our system. Please unlink it from the existing to be able to re-link.'));

            user = req.user;

            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value;

            user.save(function(err) {
                if (err) return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err));

                mailer(user, 'google', 'link');

                return done(null, user, req.flash('linkMessage', 'Your Google account was linked!'));
            });
        });
    };
};
