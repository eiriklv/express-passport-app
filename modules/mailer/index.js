var debug = require('debug')('express-passport-app:mailer');
var Templates = require('./templates');
var mandrillEmail = require('mandrill-send');
console.log(process.env.SENDGRID_API_KEY, process.env.SENDGRID_USER);
var sendgrid = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_API_KEY);

exports = module.exports = function (options) {
    var templates = Templates(options.serviceName);

    var sender;

    if (options.env === 'production') {
        sender = options.senderAddress;

        return function(user, provider, action, token, password) {
            var email = new sendgrid.Email({
                from: sender,
                to: [user.email],
                subject: templates[provider][action].title(),
                html: templates[provider][action].message(user, options.verificationRoute, token, password)
            });

            sendgrid.send(email, function (err, res) {
                if (err) return debug(err);
                if (token) debug('token: ' + token);
                debug('successfully sent email for action: ' + action + ' for provider: ' + provider + ' to user via email: ' + user.email);
            });
        };
    } else {
        return function(user, provider, action, token, password) {
            debug(templates[provider][action].message(user, options.verificationRoute, token, password));
        };
    }
};