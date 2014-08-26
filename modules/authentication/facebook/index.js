exports = module.exports = function(models, mailer) {
    var login = require('./login')(models.User, mailer);
    var link = require('./link')(models.User, mailer);

    return {
        auth: function(req, token, refreshToken, profile, done) {
            if (!req.user) {
                login(req, token, refreshToken, profile, done);
            } else {
                link(req, token, refreshToken, profile, done);
            }
        }
    };
};
