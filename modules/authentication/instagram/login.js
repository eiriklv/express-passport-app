exports = module.exports = function(User, mailer) {
    return function(req, token, refreshToken, profile, done) {
        User.findOne({
            'instagram.id': profile.id
        }, function(err, user) {
            if (err) return done(err);

            if (user) {
                user.instagram.token = token;
                user.instagram.name = profile.displayName;
                user.instagram.profile_picture = profile._json.data.profile_picture;

                user.save(function(err) {
                    if (err) return done(null, false, req.flash('loginMessage', 'An error occured! - ' + err));
                    return done(null, user, req.flash('loginMessage', 'Welcome, via Instagram login!'));
                });
            } else {
                return done(null, false, req.flash('signupMessage', 'Your Instagram Account can only be linked when already registered')); // if error, return it via flash
            }
        });
    };
};
