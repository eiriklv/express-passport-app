exports = module.exports = function(service) {
    return {
        message: function(user, route, token, password) {
            return '<p>' + 'Welcome to ' + service + ' ' + user.fullname + '!' + '</p>' +
                '<p>' + 'You registered through Google+' + '</p>' +
                '<p>' + 'Your username is: ' + user.email + '</p>' +
                '<p>' + 'Your password is: ' + password + '</p>';
        },
        title: function() {
            return 'Signup via Google+';
        }
    };
};
