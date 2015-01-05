var debug = require('debug')('express-passport-app:mailer');
var Templates = require('./templates');
var mandrillEmail = require('mandrill-send');

exports = module.exports = function(options) {
    var templates = Templates(options.serviceName);
    var email, sender, title, verificationRoute;

    if (options.env === 'production') {
        email = mandrillEmail(options.apiKey);
        sender = options.senderAddress;
        verificationRoute = options.verificationRoute;

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
