var moment = require('moment');

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
                
                var minutesTokenStillValid = moment(user.resetPasswordTokenExpires).diff(moment(), 'minutes');
                console.log(minutesTokenStillValid, 'minutesTokenStillValid');
                if (minutesTokenStillValid > 0) {
                    updatePassword(user, req.body);

                    user.resetPasswordToken = null;
                    user.resetPasswordTokenExpires = null;

                    return user.save().then(function() {
                        sendResetMail();
                        return done(null, user);
                    }).catch(function(err) {
                        return done(err, user);
                    });
                }
                else {
                    throw new Error("Password reset token has expired. Please try again.");
                }
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
