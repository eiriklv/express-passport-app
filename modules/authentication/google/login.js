exports = module.exports = function (User, mailer) {
    return function (req, token, refreshToken, profile, done){
        User.findOne({ 'google.id' : profile.id }, function (err, user) {
            if (err) return done(err);

            if (user) {
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = profile.emails[0].value;

                user.save(function (err) {
                    if (err) return done(null, false, req.flash('loginMessage', 'An error occured! - ' + err));
                    return done(null, user, req.flash('loginMessage', 'Welcome, via Google login!'));
                });
            }
            else {
                var newUser = new User();

                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                newUser.email = profile.emails[0].value;
                newUser.verified = true;
                newUser.fullname = newUser.google.name;

                var randomPassword = Math.random().toString(36).slice(-15);
                newUser.password = newUser.generateHash(randomPassword);

                req.flash('localAddedMessage', 'Local user: ' + newUser.email + ' password: ' + randomPassword);

                newUser.save(function (err) {
                    if (err) return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err)); // if error, return it via flash

                    mailer(newUser, 'google', 'signup');

                    return done(null, newUser, req.flash('signupMessage', 'Welcome, you registered through Google!'));
                });
            }
        });
    };
};