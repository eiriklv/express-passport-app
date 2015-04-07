exports = module.exports = function(User, mailer) {
    return function(req, done) {
        User.find({
                'where': {
                    'passwordResetToken': req.body.token
                }
            }).then(function(user) {
                
                sendResetMail();
                done(null, user);
            }).catch(function(err) {
                return done(err);
            });

        function sendResetMail() {
            mailer('local', 'reset');
        }
    };
};
