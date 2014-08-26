exports = module.exports = function(User, mailer) {
    return function(req, token, refreshToken, profile, done) {
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) return done(err);
            if (user) return done(null, req.user, req.flash('errorMessage', 'This Facebook account is already linked to an account in our system. Please unlink it from the existing to be able to re-link.'));

            user = req.user;

            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;

            user.save(function(err) {
                if (err) return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err)); // if error, return it via flash

                mailer(user, 'facebook', 'link');

                return done(null, user, req.flash('linkMessage', 'Your Facebook account was linked!'));
            });
        });
    };
};
