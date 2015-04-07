exports = module.exports = function(User, mailer) {
    return function(req, done) {
        if (!req.body || !req.body.email) return done(new Error("Email address required."));

        User.find({
                'where': {
                    'email': req.body.email
                }
            }).then(function(user) {
                if (!user) return done(new Error("Could not find user with email: " + req.body.email));

                var now = new Date();
                var minutes = 60;

                user.resetPasswordToken = User.generateResetToken(user.dataValues.email);
                user.resetPasswordTokenExpires = new Date(now.getTime() + (minutes * 60000));
                
                sendForgotMail(user);
                done(null, user);
            }).catch(function(err) {
                return done(err);
            });

        function sendForgotMail(user) {
            if (!user.dataValues.resetPasswordToken) throw new Error("Missing required attribute: resetPasswordToken");

            mailer('local', 'forgot', user.dataValues);
        }
    };
};
