exports = module.exports = function(service) {
    return {
        message: function(user, options) {
            return '<p>' + 'Welcome to ' + service + ' ' + user.email + '!' + '</p>' +
                '<p>' + 'You registered on our website' + '</p>' +
                '<p>' + 'Please follow ' + '<a href="' + options.verificationRoute + '?token=' + options.token + '">this link</a>' + ' to verify your account: ' + '</p>';
        },
        title: function() {
            return 'You signed up to our service! Please verify your email';
        }
    };
};
