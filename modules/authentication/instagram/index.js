exports = module.exports = function (models, mailer) {
    var link = require('./link')(models.User, mailer);

    return {
        auth: function (req, token, refreshToken, profile, done) {
            if (!req.user) done(null, false, req.flash('loginMessage', 'You cannot login with Instagram'));

            link(req, token, refreshToken, profile, done);
        }
    };
};
