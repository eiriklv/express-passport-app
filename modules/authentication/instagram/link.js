exports = module.exports = function (User, mailer) {
    return function (req, token, refreshToken, profile, done) {
        User.findOne({ 'instagram.id' : profile.id }, function (err, user) {
            if (err) return done(err);
            if (user) return done(null, req.user, req.flash('errorMessage', 'This Instagram account is already linked to an account in our system. Please unlink it from the existing to be able to re-link.'));

            user = req.user;

            console.log(profile);

            user.instagram.id = profile.id;
            user.instagram.username = profile.username;
            user.instagram.token = token;
            user.instagram.name = profile.displayName;
            user.instagram.profile_picture = profile._json.data.profile_picture;

            user.save(function (err) {
                if (err) return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err));

                mailer(user, 'instagram', 'link');

                return done(null, user, req.flash('linkMessage', 'Your Instagram account was linked!'));
            });
        });
    };
};