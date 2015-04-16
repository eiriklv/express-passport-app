exports = module.exports = function(User) {
    return function(req, email, password, done) {
        User.find({
            'where': {
                'email': email
            }
        }).then(function(user) {

            if (!user) return done(null, false, req.flash('loginMessage', 'User not found.'));
            if (!User.validPassword(password, user.password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user, req.flash('loginMessage', 'Welcome via local sign-in!'));
        }).catch(function(err) {
            return done(err);
        });
    };
};
