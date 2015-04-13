var debug = require('debug')('express-passport-app:mailer');
var Templates = require('./templates');
var mandrillEmail = require('mandrill-send');

var sendgrid = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_API_KEY);

exports = module.exports = function (options) {
    var templates = Templates(options.serviceName);

    var sender;

    if (options.env === 'production') {
        sender = options.senderAddress;

        return function(provider, action, user, mailerOptions) {
            mailerOptions = mailerOptions || {};
            mailerOptions.verificationRoute = options.verificationRoute;
            mailerOptions.resetRoute = options.resetRoute;

            var email = new sendgrid.Email({
                from: sender,
                to: [user.email],
                subject: templates[provider][action].title(),
                html: templates[provider][action].message(user, mailerOptions)
            });

            sendgrid.send(email, function (err, res) {
                if (err) return debug(err);

                debug('successfully sent email for action: ' + action + ' for provider: ' + provider + ' to user via email: ' + user.email);
            });
        };
    } else {
        return function(provider, action, user, mailerOptions) {
            mailerOptions = mailerOptions || {};
            mailerOptions.verificationRoute = options.verificationRoute;
            mailerOptions.resetRoute = options.resetRoute;

            debug(templates[provider][action].message(user, mailerOptions));
        };
    }
};