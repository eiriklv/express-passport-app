exports = module.exports = function(User, VerificationToken, mailer) {
    return function(req, email, password, done) {
        User.find({
                'where': {
                    'email': email
                }
            }).then(function(user) {
                if (user) return done(null, false, req.flash('signupMessage', 'This email is already in use.'));
                if (!email) return done(null, false, req.flash('signupMessage', 'Email address is required.'));

                newUserData = {
                    email: email
                };

                if (password) newUserData.password = User.generateHash(password);
                if (req.body && req.body.profile) newUserData.profile = req.body.profile;

                var newUser = User.build(newUserData);

                return newUser.save()
                    .then(sendVerificationMail)
                    .then(function() {
                        return done(null, newUser, req.flash('signupMessage', 'You registered through local sign-up!'));
                    })
                    .catch(function(err) {
                        return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err));
                    });
            }).catch(function(err) {
                return done(err);
            });

        function sendVerificationMail(user) {
            var newToken = VerificationToken.build({
                uid: user.dataValues.id,
                token: VerificationToken.generateToken(user.id)
            });

            return newToken.save()
                .then(function() {
                    var mailerOptions = {
                        token: newToken.token,
                        route: mailer.verificationRoute
                    };

                    // Don't freak out, this is only for testing
                    if (process.env.NODE_ENV === 'development') {
                        process.token = newToken.token;
                    }

                    mailer('local', 'signup', user.dataValues, mailerOptions);
                })
                .catch(function(err) {
                    console.error('newToken save error', err);
                });
        }
    };
};
