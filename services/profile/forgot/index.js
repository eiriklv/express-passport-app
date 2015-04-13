var moment = require('moment');

exports = module.exports = function(User, mailer) {
    return function(req, done) {
        if (!req.body || !req.body.email) return done(new Error("Email address required."));

        User.find({
                'where': {
                    'email': req.body.email
                }
            }).then(function(user) {
                if (!user) return done(new Error("Could not find user with email: " + req.body.email));

                var now = moment();

                user.resetPasswordToken = User.generateResetToken();
                user.resetPasswordTokenExpires = now.add(60, 'minutes');

                return user.save().then(function() {
                    sendForgotMail(user);
                    return done(null, user);
                }).catch(function(err) {
                    return done(err, user);
                });
            }).catch(function(err) {
                return done(err);
            });

        function sendForgotMail(user) {
            if (!user.dataValues.resetPasswordToken) throw new Error("Missing required attribute: resetPasswordToken");

            mailer('local', 'forgot', user.dataValues);
        }
    };
};
