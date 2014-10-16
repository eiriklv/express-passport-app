var debug = require('debug')('express-passport-app:mailer');

exports = module.exports = function(config) {
    var templates = require('./templates')(config.get('service.name'));
    var email, sender, title, verificationRoute;

    if (config.get('env') === 'production') {
        email = require('mandrill-send')(config.get('mandrill.api.key'));
        sender = config.get('mandrill.sender');
        verificationRoute = config.get('email.verification.route');

        return function(user, provider, action, token, password) {
            email({
                from: sender,
                to: [user.email],
                subject: templates[provider][action].title(),
                html: templates[provider][action].message(user, verificationRoute, token, password)
            }, function(err) {
                if (err) return debug(err);
                if (token) debug('token: ' + token);
                debug('successfully sent email for action: ' + action + ' for provider: ' + provider + ' to user via email: ' + user.email);
            });
        };
    } else {
        return function(user, provider, action, token, password) {
            debug(templates[provider][action].message(user, verificationRoute, token, password));
        };
    }
};
