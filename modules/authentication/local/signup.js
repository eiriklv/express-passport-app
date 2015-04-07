exports = module.exports = function(User, VerificationToken, mailer) {
    return function(req, email, password, done) {
        User.find({
                'where': {
                    'email': email
                }
            }).then(function(user) {
                if (user) return done(null, false, req.flash('signupMessage', 'This email is already in use.'));
                if (!req.body.fullname) return done(null, false, req.flash('signupMessage', 'Please provide your full name.'));
                if (password.length < 6) return done(null, false, req.flash('signupMessage', 'Password must be at least 6 characters.'));

                var newUser = User.build({
                    email: email,
                    password: User.generateHash(password)
                });

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
                    mailer(user.dataValues, 'local', 'signup', newToken.token);
                })
                .catch(function(err) {
                    console.error('newToken save error', err);
                });
        }
    };
};
