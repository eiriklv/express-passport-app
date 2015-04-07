exports = module.exports = function(service) {
    return {
        message: function(user, route, token) {
            return '<p>' + 'Wanna reset your password, huh?' +
                '<p>' + 'Click on ' + '<a href="' + route + '?token=' + token + '">this link</a>';
        },
        title: function() {
            return 'Password reset time!';
        }
    };
};
