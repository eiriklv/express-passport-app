exports = module.exports = function(service) {
    return {
        message: function(user, route, token) {
            return '<p>' + 'Welcome to ' + service + ' ' + user.email + '!' + '</p>' +
                '<p>' + 'You registered on our website' + '</p>' +
                '<p>' + 'Please follow ' + '<a href="' + route + '?token=' + token + '">this link</a>' + ' to verify your account: ' + '</p>';
        },
        title: function() {
            return 'You signed up to our service! Please verify your email';
        }
    };
};
