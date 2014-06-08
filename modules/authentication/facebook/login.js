exports = module.exports = function (User, mailer) {
    return function (req, token, refreshToken, profile, done) {
        User.findOne({ 'facebook.id' : profile.id }, function (err, user) {
            if (err) return done(err);

            if (user) {
                user.facebook.token = token;
                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save(function (err) {
                    if (err) return done(null, false, req.flash('loginMessage', 'An error occured! - ' + err));
                    return done(null, user, req.flash('loginMessage', 'Welcome, via Facebook login!'));
                });
            }
            else {
                var newUser = new User();

                newUser.facebook.id = profile.id;
                newUser.facebook.token = token;
                newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.facebook.email = profile.emails[0].value;
                newUser.email = profile.emails[0].value;
                newUser.verified = true;
                newUser.fullname = newUser.facebook.name;

                var randomPassword = Math.random().toString(36).slice(-15);
                newUser.password = newUser.generateHash(randomPassword);

                newUser.save(function (err) {
                    if (err) return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err));

                    mailer(newUser, 'facebook', 'signup', null, randomPassword);

                    return done(null, newUser, req.flash('signupMessage', 'Welcome, you registered through Facebook!'));
                });
            }
        });
    };
};