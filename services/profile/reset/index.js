// MAGIC!!

exports = module.exports = function(User, mailer) {
    return function(req, email, done) {
        User.find({
                'where': {
                    'email': email
                }
            }).then(function(user) {
                // generate reset token
                sendResetMail(user);
            }).catch(function(err) {
                return done(err);
            });

        function sendResetMail(user) {
            mailer(user.dataValues, 'local', 'reset');
        }
    };
};
