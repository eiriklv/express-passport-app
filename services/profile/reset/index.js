exports = module.exports = function(User, mailer) {
    return function(req, done) {
        if (!req.body.new_password) return done(new Error("New password required."));
        if (!req.body.new_password_confirm) return done(new Error("New password confirmation required."));

        User.find({
                'where': {
                    'resetPasswordToken': req.body.token
                }
            }).then(function(user) {
                if (!user) throw new Error("User not found.");

                try {
                    updatePassword(user, req.body);
                }
                catch(ex) {
                    console.error(ex);
                    return done(ex, user);
                }

                return user.save().then(function() {
                    sendResetMail();
                    return done(null, user);
                }).catch(function(err) {
                    return done(err, user);
                });
            }).catch(function(err) {
                console.error(err);
                return done(err);
            });

        function sendResetMail() {
            mailer('local', 'reset');
        }

        function updatePassword(user, body) {
            if (!body.new_password) throw new Error('passwords did not match, or was shorter than 6 characters! try again');

            var newPass = body.new_password;
            var confirmPass = body.new_password_confirm;
            var newPassLength = newPass ? newPass.length : 0;
            var passValid = newPassLength > 5 && newPass === confirmPass;

            if (passValid) {
                user.password = User.generateHash(newPass);
            } else {
                throw new Error('passwords did not match, or was shorter than 6 characters! try again');
            }
        }
    };
};
