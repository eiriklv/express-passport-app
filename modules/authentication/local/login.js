exports = module.exports = function(User) {
    return function(req, email, password, done) {
        User.findOne({
            'email': email
        }, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, req.flash('loginMessage', 'User not found.'));
            if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, user, req.flash('loginMessage', 'Welcome via local sign-in!'));
        });
    };
};
